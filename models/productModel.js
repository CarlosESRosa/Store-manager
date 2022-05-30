const connection = require('./connection');
const utils = require('../utils/index');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';

  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [result] = await connection.execute(query, [id]);
  return result;
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';

  const [result] = await connection.execute(query, [name]);

  return result;
};

const addNewProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';

  const [registeredId] = await connection.execute(query, [name, quantity]);

  const product = {
    id: registeredId.insertId,
    name,
    quantity,
  }; 
  return product;
};

const updateProduct = async (name, quantity, id) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';

  await connection.execute(query, [name, quantity, id]);

  const result = {
    id,
    name,
    quantity,
  };
  return result;
};  

const updateProductById = async (productId, quantity, operator) => {
  const getQuantity = 'SELECT quantity FROM StoreManager.products WHERE id = ?';
  const query = 'UPDATE StoreManager.products SET quantity = ? WHERE id = ?';
  
  const [[actualQuantity]] = await connection.execute(getQuantity, [productId]);
  const newQuantity = utils.Calculadora(actualQuantity.quantity, quantity, operator);
  if (newQuantity <= 0) return 'fail';
  await connection.execute(query, [newQuantity, productId]);
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';

  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
  addNewProduct,
  getByName,
  updateProduct,
  deleteProduct,
  updateProductById,
};