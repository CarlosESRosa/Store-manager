const errorMiddleware = require('./errorMiddleware');
const validateProduct = require('./validateProduct');
const validateSale = require('./validateSales');

module.exports = {
  errorMiddleware,
  validateProduct,
  validateSale,
};