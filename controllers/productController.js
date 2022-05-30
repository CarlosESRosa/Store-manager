const productService = require('../services/productService');

const getAll = async (req, res, next) => {
  try {
      const products = await productService.getAll();
      
      res.status(200).json(products);
  } catch (error) {
    console.log('Get products:', error.message);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.getById(id);

    res.status(200).json(product);
  } catch (error) {
    console.log('Get product By id:', error.message);
    next(error);
  }
};

const addNewProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = await productService.addNewProduct(name, quantity);

    res.status(201).json(product);
  } catch (error) {
    console.log('Add new product:', error.message);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await productService.updateProduct(name, quantity, id);
  console.log(result);
  res.status(200).json(result);
  } catch (error) {
    console.log('Update product:', error.message);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await productService.deleteProduct(id);
    res.status(204).json();
  } catch (error) {
    console.log('Delete product:', error.message);
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};