const connection = require('./connection');
const productModel = require('./productModel');
const utils = require('../utils');

// Converte o nome dos campos de snake_case para camelCase
const serialize = (authorData) => authorData.map((item) => ({
  saleId: item.sale_id,
  date: item.date,
  productId: item.product_id,
  quantity: item.quantity,
  }));

const getAll = async () => {
  const query = `
  SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales AS sa
  INNER JOIN StoreManager.sales_products AS sp
  ON sa.id = sp.sale_id
  ORDER BY sp.sale_id, sp.product_id`;

  const [result] = await connection.execute(query);
  return serialize(result);
};

const getById = async (id) => {
  const query = `
  SELECT sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales AS sa
  INNER JOIN StoreManager.sales_products AS sp
  ON sa.id = sp.sale_id
  WHERE sp.sale_id = ?
  ORDER BY sp.sale_id, sp.product_id`;
  const [result] = await connection.execute(query, [id]);
  return serialize(result);
};

const addNewSale = async (arrayOfParams) => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
  const query2 = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;

  const date = utils.getCurrentDate();

  const [response] = await connection.execute(query, [date]);
  
  arrayOfParams.forEach(async (element) => {
    await connection.execute(query2, [response.insertId, element.productId, element.quantity]);
  });
  return response.insertId;
};

const updateSale = async (productId, quantity, id) => {
  const query = `UPDATE StoreManager.sales_products 
  SET product_id = ?, quantity = ? WHERE sale_id = ? AND product_id = ?`;

  await connection.execute(query, [productId, quantity, id, productId]);

  return id;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const query2 = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  const test = await getById(id);
  test.forEach(async (element) => {
    await productModel.updateProductById(element.productId, element.quantity, '+');
  });
  const [result] = await connection.execute(query, [id]);
  await connection.execute(query2, [id]);

  return result.affectedRows;
};

module.exports = {
  getAll,
  getById,
  addNewSale,
  updateSale,
  deleteSale,
};