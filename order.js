const orders = []; // Temporary order database

exports.saveOrder = (req, res) => {
    const order = req.body;
    orders.push(order);
    res.status(201).json({ message: 'Order received', orderId: orders.length });
};
