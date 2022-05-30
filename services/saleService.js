const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

const errorHandles = (status, message) => ({ status, message });

const getAll = async () => {
  const result = await saleModel.getAll();

  return result;
};

const getById = async (id) => {
  const result = await saleModel.getById(id);

  if (result.length === 0) throw errorHandles(404, 'Sale not found'); 

  return result;
};

const addNewSale = async (arrayOfParams) => {
  const saleId = await saleModel.addNewSale(arrayOfParams);
  const result = await 
    productModel.updateProductById(arrayOfParams[0].productId, arrayOfParams[0].quantity, '-');
  if (result === 'fail') throw errorHandles(422, 'Such amount is not permitted to sell'); 
  return saleId;
};

const updateSale = async (productId, quantity, id) => {
  const result = await saleModel.updateSale(productId, quantity, id);

  return result;
};

const deleteSale = async (id) => {
  const affectedRow = await saleModel.deleteSale(id);
  if (!affectedRow) throw errorHandles(404, 'Sale not found');
};

module.exports = {
  getAll,
  getById,
  addNewSale,
  updateSale,
  deleteSale,
};