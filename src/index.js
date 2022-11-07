const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];


function checksExistsUserAccount(request, response, next) {
    const { username } = request.headers;

    const user = users.find(user => user.username === username);

    if(user) {
      return response.status(400).json({error: "User not found!"})
    }

    request.user = user;

    return next()
}


app.post('/users', (request, response) => {
  
  const { name, username } = request.body;
  const userAlreadyExists = users.some(
    (user) => user.username === username
  );

  if (userAlreadyExists) {
    return response.status(400).json({
      error: "User already exists !"
    })
  }

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: []
  });

  return response.status(201).send({
    message: "User create with sucess !"
  })

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { username } = request.headers;
  const { name } = request.body;

  return response.json({name : name, username: username})
  
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { title, deadline} = request.body;
  // const { username } = request.headers;
  const { user } = request;

  const username = undefined;

  const todoOperation = {
    id: uuidv4(),
    title,
    done: false,
    deadline,
    create_at: new Date()
  }
  
  // console.debug(user.todos)

  // console.debug(users)

  // // user.todos.push(todoOperation)

  // // return response.status(201).send({
  // //   message: "Create a taks with sucess"
  // // })
  
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  users.splice(user, 1);

  return response.status(200).json(users)

});

module.exports = app;