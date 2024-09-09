const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

let cart = [];

app.get('/api/products', (req, res) => {
    fs.readFile(path.join(__dirname, 'products.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading products file.' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/add-to-cart/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, 'products.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading products file.' });
        }
        const products = JSON.parse(data);
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            res.json({ message: 'Product added to cart.', items: cart });
        } else {
            res.status(404).json({ message: 'Product not found.' });
        }
    });
});

app.get('/api/cart', (req, res) => {
    res.json({ items: cart });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
