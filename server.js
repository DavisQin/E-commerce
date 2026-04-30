'use strict'
const express = require('express')
const app = express()
app.use(express.json());

const PORT = process.env.PORT || 3000

//In-memory state
/**products*/
const products = [
    { productID: 1, name: "Blazer", brand: "Michael Kors", size: "S", color: "Black" },
    { productID: 2, name: "Hoodie", brand: "Polo Ralph Lauren", size: "M", color: "Blue" },
    { productID: 3, name: "pants", brand: "Tommy Hilfiger", size: "L", color: "Grey" }
]

function normalizeBrand(input) {

}

function normalizeProduct(name) {
    return String(name || '').toLowerCase().trim();
}

function findIndeByProductID(productID) {
    const n = productID
    return products.findIndex(c => c.productID === n);
}

app.get('/', (req, res) => {
    res.status(200).json(products);
})

app.head('/', (req, res) => {
    res.set('Total Products', String(products.length));
    res.sendStatus(200);
})

app.get('/:name', (req, res) => {
    const idx = findIndexByName(req.params.name);
    if (idx === -1) {
        return res.status(404).json({ error: 'not found' });
    }
    res.status(200).json(products[idx]);
})

app.get('/add', (req, res) => {
    const { name, hex } = req.body || {};
    const nName = normalizeName(name);

    if (!nName) {
        return res.status(400).json({ error: 'name is required' });
    }

    if (findIndexByName(nName) !== -1) {
        return res.status(409).json({ error: 'product already exist' })
    }

    const nProduct = normalizeProduct()
})

app.listen(PORT, () => {
    console.log(`E-commerce API listening on http://localhost:${PORT}`)
})