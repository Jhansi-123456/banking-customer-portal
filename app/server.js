const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root API
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Banking Customer Portal is running"
    });
});

let customers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210"
    }
];

// Health Check API
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        application: "Banking Customer Portal"
    });
});

// Get all customers
app.get("/customers", (req, res) => {
    res.status(200).json(customers);
});

// Get customer by ID
app.get("/customers/:id", (req, res) => {
    const customerId = parseInt(req.params.id);

    const customer = customers.find(
        customer => customer.id === customerId
    );

    if (!customer) {
        return res.status(404).json({
            message: "Customer not found"
        });
    }

    res.status(200).json(customer);
});

// Register a new customer
app.post("/customers", (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({
            message: "Name, email and phone are required"
        });
    }

    const newCustomer = {
        id: customers.length + 1,
        name: name,
        email: email,
        phone: phone
    };

    customers.push(newCustomer);

    res.status(201).json({
        message: "Customer registered successfully",
        customer: newCustomer
    });
});

// Start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Banking Customer Portal running on port ${PORT}`);
    });
}

// Export application for testing
module.exports = app;