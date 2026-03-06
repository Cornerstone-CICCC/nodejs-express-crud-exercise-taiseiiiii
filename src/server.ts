import express, { Request, Response } from 'express';

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
}

const app = express();
app.use(express.json());

const products: Product[] = [];
let nextId = 1;

// GET all products
app.get('/products', (req: Request, res: Response) => {
  res.json(products);
});

// POST a new product
app.post('/products', (req: Request, res: Response) => {
  const { product_name, product_description, product_price } = req.body;
  const newProduct: Product = {
    id: nextId++,
    product_name,
    product_description,
    product_price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// GET one product by id
app.get('/products/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json(product);
});

// PUT update one product by id
app.put('/products/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  const { product_name, product_description, product_price } = req.body;
  products[index] = {
    ...products[index],
    product_name,
    product_description,
    product_price
  };
  res.json(products[index]);
});

// DELETE one product by id
app.delete('/products/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
