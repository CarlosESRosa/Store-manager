const productModel = require('../models/productModel');

const errorHandler = (status, message) => ({ status, message });

const getAll = async () => {
  const result = await productModel.getAll();

  return result;
};

const getById = async (id) => {
  const [result] = await productModel.getById(id);

  if (!result) throw errorHandler(404, 'Product not found'); 

  return result;
};

const addNewProduct = async (name, quantity) => {
  const verifyProduct = await productModel.getByName(name);
  if (verifyProduct.length > 0) throw errorHandler(409, 'Product already exists');

  const newProduct = await productModel.addNewProduct(name, quantity);

  return newProduct;
};

const updateProduct = async (name, quantity, id) => {
  const verifyProduct = await productModel.getById(id);

  if (verifyProduct.length === 0) throw errorHandler(404, 'Product not found');

  const result = await productModel.updateProduct(name, quantity, id);

  return result;
};

const deleteProduct = async (id) => {
  const result = await productModel.deleteProduct(id);
  if (result.affectedRows === 0) throw errorHandler(404, 'Product not found');
  return result;
};

module.exports = {
  getAll,
  getById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};