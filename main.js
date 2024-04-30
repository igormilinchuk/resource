require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const { User } = require('./models'); 

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await User.findAll();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const contact = await User.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/contacts', async (req, res) => {
    try {
        const { lastname, firstname, email  } = req.body;
        const newContact = await User.create({ lastname, firstname, email });
        res.status(201).json(newContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const contact = await User.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        await contact.destroy();
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const contact = await User.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        await contact.update(req.body);
        res.json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, async () => {
    console.log(`Server is running: http://localhost:${PORT}`);
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (err) {
        console.error('Database synchronization failed:', err);
    }
}); 
