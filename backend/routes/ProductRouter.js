const express = require('express');
const ensureAuthentication = require('../middlewares/auth');

const router = express.Router();

// Example GET route
router.get('/', ensureAuthentication, (req, res) => {
    try {
        res.status(200).json([
            {
                name: 'Mobile',
                price: 10000,
                description: 'A high-quality mobile phone with excellent features and performance.'
            },
            {
                name: 'Laptop',
                price: 20000,
                description: 'A powerful laptop suitable for both work and gaming, featuring a high-resolution display.'
            },
            {
                name: 'Tablet',
                price: 15000,
                description: 'A versatile tablet with a large screen, perfect for media consumption and productivity.'
            },
            {
                name: 'Smartwatch',
                price: 5000,
                description: 'A smart and stylish watch that keeps track of your fitness and notifications.'
            },
            {
                name: 'Headphones',
                price: 2000,
                description: 'Comfortable headphones with high-quality sound and noise-cancellation features.'
            },
            {
                name: 'Keyboard',
                price: 1200,
                description: 'A mechanical keyboard with customizable keys and backlighting for an enhanced typing experience.'
            },
            {
                name: 'Mouse',
                price: 800,
                description: 'An ergonomic mouse with precise tracking and programmable buttons for productivity.'
            },
            {
                name: 'Monitor',
                price: 8000,
                description: 'A high-resolution monitor with vibrant colors and a wide viewing angle for an immersive experience.'
            },
            {
                name: 'Printer',
                price: 6000,
                description: 'A reliable printer with fast printing speeds and high-quality output for both documents and photos.'
            },
            {
                name: 'External Hard Drive',
                price: 3500,
                description: 'A portable external hard drive with ample storage capacity for backing up and transferring files.'
            }
        ]);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
