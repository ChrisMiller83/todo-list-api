const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

const todoList = [
  {
    id: 1,
    description: 'Implement a REST API',
    completed: false,
  },
  {
    id: 2,
    description: 'Build a frontend',
    completed: false,
  },
  {
    id: 3,
    description: '???',
    completed: false,
  },
  {
    id: 4,
    description: 'Profit!',
    completed: false,
  },
];

let nextId = 5;

// GET /api/todos
app.get('/api/todos', (req, res) => {
  res.json(todoList);  /* sends back todoList array as JSON file */
})

// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {
  // get id from route
  const id = Number(req.params.id);
  // const id = parseInt(req.params.id); /* another way to get all info */
  // const id = +req.params.id;  /* another way to get all info */
  // use id to find one todo item
  const todo = todoList.find((currTodo) => {
    if (currTodo.id == id) {
      return true
    } else {
      return false
    }
  });

  if (!todo) {
    res.status(404).json({
      error: `Could not find todo with ID:  ${id}`
    })    
  } else {
  //  send back todo
  res.json(todo)
  }
});

// POST /api/todos
app.post('/api/todos', (req, res) => {
  if (req.body.description) {
  const newTodo = {
    id: nextId++,
    description: req.body.description,
    completed: false
  }
  todoList.push(newTodo);
  res.status(201);
  res.send();
  } else {
    res.status(422)
    res.json({
      error: 'please add a description'
    })
  }
});

// PUT /api/todos/:id
app.patch('/api/todos/:id', (req, res) => {
  // if req.body contains a description
  if (req.body.description || req.body.description === '' || req.body.completed) {
    //get id from route  
  const id = Number(req.params.id);
  // find where the todo exists in the todoList array
  const todoIndex = todoList.findIndex((currTodo) => currTodo.id === id ? true : false)        
  // update the object inside of the the todoList array
  // if there is a description on the request body
  if (req.body.description){
    //set it on the todo item
    todoList[todoIndex].description = req.body.description
  }
  // if the complete status is true or 'true'
  
  if (req.body.completed === 'true' || req.body.completed === true) {
    todoList[todoIndex].completed = true
  } else if (req.body.completed === 'false' || req.body.completed === false) {
    todoList[todoIndex].completed = false
  }

  // send back the updated todo item  
  res.json(todoList[todoIndex])
  } else {
    res.status(422).json({
      error: 'Please provide a description'
    })
  }
});


// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
  // find which oue to delete
  const id = Number(req.params.id);
  // find where the todo exists in the todoList array
  const todoIndex = todoList.findIndex((currTodo) => currTodo.id === id) 
  if(todoIndex !== -1) {  
  // remove it from array
  todoList.splice(todoIndex, 1)
  // respond with appropriate status/response
  res.status(204).json()
  } else {
    res.status(404).json({ error: `Could not find todo with id: ${id}`})
  }
});







app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});
