const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Portatil', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Monitor', price: 300 },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: '404 Not Found' });
  }

  res.json(product);
});

app.post('/products', (req, res) => {
  const { id, name, price } = req.body;

  if (!id || !name || !price) {
    return res.status(400).json({ error: '400 Bad Request' });
  }

  if (products.some(p => p.id === id)) {
    return res.status(400).json({ error: 'ID ya existe' });
  }

  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
