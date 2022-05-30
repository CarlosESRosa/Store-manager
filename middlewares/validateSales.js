const validateSale = (req, res, next) => {
  req.body.forEach((element) => {
    const { productId, quantity } = element;
    if (!productId) next({ status: 400, message: '"productId" is required' });
    if (!quantity) next({ status: 400, message: '"quantity" is required' });
    if (!Number.isInteger(quantity)) next({ status: 422, message: '"quantity" must be integer' });
    if (quantity < 1) {
      next({ status: 422, message: '"quantity" must be greater than or equal to 1' });
    }
  });
  return next();
};

module.exports = validateSale;