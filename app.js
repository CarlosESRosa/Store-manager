const express = require('express');

const app = express();
app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const middlewares = require('./middlewares');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.post('/products', middlewares.validateProduct, productController.addNewProduct);
app.put('/products/:id', middlewares.validateProduct, productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.get('/sales', saleController.getAll);
app.get('/sales/:id', saleController.getById);
app.post('/sales', middlewares.validateSale, saleController.addNewSale);
app.put('/sales/:id', middlewares.validateSale, saleController.updateSale);
app.delete('/sales/:id', saleController.deleteSale);

app.use(middlewares.errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
