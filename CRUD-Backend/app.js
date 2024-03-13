const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const cors = require('cors');
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Enable CORS
app.use(cors());
//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Ritik')
})

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// add a product
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// update a product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        console.log("find error")
        // we cannot find any product in database
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete a product

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        console.log(product)
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb+srv://ritikkumar:Ritik%407767@ritik.pwvbb0o.mongodb.net/?retryWrites=true&w=majority&appName=ritik')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(8000, () => {
            console.log(`Node API app is running on port 8000`)
        });
    }).catch((error) => {
        console.log(error)
    })
