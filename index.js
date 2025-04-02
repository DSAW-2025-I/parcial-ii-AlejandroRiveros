const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Lista de productos en memoria
let products = [
  { id: 1, name: 'Portatil', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Monitor', price: 300 },
];

// GET /products → devuelve todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// GET /products/:id → devuelve producto por ID o error 404
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});

// POST /products → agrega un nuevo producto
app.post('/products', (req, res) => {
  const { id, name, price } = req.body;

  if (!id || !name || !price) {
    return res.status(400).json({ error: 'Faltan datos del producto' });
  }

  if (products.some(p => p.id === id)) {
    return res.status(400).json({ error: 'ID ya existe' });
  }

  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
