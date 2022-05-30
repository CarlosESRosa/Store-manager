const saleService = require('../services/saleService');

const getAll = async (req, res, next) => {
  try {
      const products = await saleService.getAll();
      
      res.status(200).json(products);
  } catch (error) {
    console.log('Get sale:', error.message);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await saleService.getById(id);

    res.status(200).json(product);
  } catch (error) {
    console.log('Get sale By id:', error.message);
    next(error);
  }
};

const addNewSale = async (req, res, next) => {
  try {
    const arrayOfParams = req.body;
    
    const saleId = await saleService.addNewSale(arrayOfParams);
    
    const responseFormat = {
      id: saleId,
      itemsSold: req.body,
    };

    res.status(201).json(responseFormat);
  } catch (error) {
    console.log('Add new sale:', error.message);
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body[0];

    const saleId = await saleService.updateSale(productId, quantity, id);

    const responseFormat = {
      saleId,
      itemUpdated: req.body,
    };

    res.status(200).json(responseFormat);
  } catch (error) {
    console.log('Update saleById:', error.message);
    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    await saleService.deleteSale(id);

    res.status(204).json();
  } catch (error) {
    console.log('Delete sale by id:', error.message);
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addNewSale,
  updateSale,
  deleteSale,
};