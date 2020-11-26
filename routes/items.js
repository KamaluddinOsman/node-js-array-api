const Joi       = require('Joi');
const express = require('express');
const router = express.Router();

const items = [
    { id: 1, name: "element 1"},
    { id: 2, name: "element 2"},
    { id: 3, name: "element 3"},
];

// Get all [Items]
router.get('/', (request, response) => {
   response.status(200).send(items); 
});

// Get specific [item]
router.get('/:id', (request, response) => {
    // Check if [item] exist
    const item = items.find(c => c.id === parseInt(request.params.id));
    if (!item) return response.status(404).send('[Item] not found');

    response.status(200).send(item)
});

// update [item]
router.put('/:id', (request, response) => {
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
router.post('/', (request, response) => {
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
router.delete('/:id', (request, response) => {
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

module.exports = router;