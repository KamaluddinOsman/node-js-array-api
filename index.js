const Joi       = require('Joi');
const express   = require('express');
const morgan    = require('morgan');
const customMiddleware = require('./customMiddleware');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(customMiddleware);
app.use(express.static('public'));

// Set morgan to works only in development environment
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log(`NODE_ENV: ${app.get('env')}, and Morgan is enabled`);
}
const items = [
    { id: 1, name: "element 1"},
    { id: 2, name: "element 2"},
    { id: 3, name: "element 3"},
];

// route for the main index
// will no longer works after adding express.static()
app.get('/' , (request, response) => {
    response.send('Main index');
});

// Get all [Items]
app.get('/api/items', (request, response) => {
   response.status(200).send(items); 
});

// Get specific [item]
app.get('/api/items/:id', (request, response) => {
    // Check if [item] exist
    const item = items.find(c => c.id === parseInt(request.params.id));
    if (!item) return response.status(404).send('[Item] not found');

    response.status(200).send(item)
});

// update [item]
app.put('/api/items/:id', (request, response) => {
    // Check if [item] exist
    const item  = items.find(c => c.id === parseInt(request.params.id));
    if (!item) return response.status(404).send('[Item] not found');
    // Validate request
    const { error } = validateItem(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    
    item.name   = request.body.name;// Update [item] date

    response.send(item);
});

// Add new [item]
app.post('/api/items', (request, response) => {
    // Validate request
    const { error } = validateItem(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    // Create new object [item]
    const item = {
        id: items.length + 1,
        name: request.body.name
    };
    items.push(item);// Add to array

    response.send(item);
});

//Delet item
app.delete('/api/items/:id', (request, response) => {
    // Check if [item] exist
    const item  = items.find(c => c.id === parseInt(request.params.id));
    if (!item) return response.status(404).send('[Item] not found');
    // Get [item] index and remove [itme]
    const index = items.indexOf(item);
    items.splice(index, 1);

    response.send(item);
});

//Validate the request
function validateItem(item) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });

    return schema.validate({
        name: item.name,
    });
}
const port = process.env.PORT | 3000;
app.listen(3000, () => console.log(`listening to port ${port}`));