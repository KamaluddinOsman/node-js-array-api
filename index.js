const Joi       = require('Joi');
const express = require('express')

const app = express();
app.use(express.json());

const items = [
    { id: 1, name: "element 1"},
    { id: 2, name: "element 2"},
    { id: 3, name: "element 3"},
    { id: 4, name: "element 4"},
    { id: 5, name: "element 5"},
];

//route for the main index
app.get('/' , (req, res) => {
    res.send('Main index');
});

//Get all Items
app.get('/api/items', (req, res) => {
   res.send(items); 
});

//Get specific it with it's id
app.get('/api/items/:id', (req, res) => {
    const item = items.find(c => c.id === parseInt(req.params.id));
    res.send(item)
});

//update item
app.put('/api/items/:id', (req, res) => {
    const item  = items.find(c => c.id === parseInt(req.params.id));
    item.name   = req.body.name;
    res.send(item);
});

//Add new item
app.post('/api/items', (req, res) => {
    const item = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(item);
    res.send(item);
});

//Delet item
app.delete('/api/items/:id', (req, res) => {
    const item  = items.find(c => c.id === parseInt(req.params.id));
    const index = items.indexOf(item);

    items.splice(index, 1);
    res.send(item);
});

const port = process.env.PORT | 3000;
app.listen(3000, () => console.log(`listening to port ${port}`));