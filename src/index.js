const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];


function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

app.post('/users', (request, response) => {
  
  const { name, username } = request.body;
  const userAlreadyExists = users.some(
    (user) => user.username === username
  );

  if (userAlreadyExists) {
    return response.status(400).json({
      error: "User already exist !"
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
  const { username } = request;

  return response.json(username)


});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {title} = request.body;
  const {user} = request;

  const todoOperation = {
    id: uuidv4(),
    title,
    done: false,
    deadline,
    create_at: new Date()
  }
// { 
// 	id: 'uuid', // precisa ser um uuid
// 	title: 'Nome da tarefa',
// 	done: false, 
// 	deadline: '2021-02-27T00:00:00.000Z', 
// 	created_at: '2021-02-22T00:00:00.000Z'
// }
// ```



});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;