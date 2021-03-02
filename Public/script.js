

function getAllTodos() {
  // get data from API
  axios.get('/api/todos')
    .then(response => {      
      // use data to render todos on page
      const todosContainer = document.querySelector('#todosContainer')
      // ;oop over each todo in the response and make an array of HTML strings
      const todosHtml = response.data.map(todo => {
        return `<li class="${todo.completed ? 'complete' : 'incomplete'}">
        ${todo.description}
        <button onclick="setCompleteStatus('${todo.id}', '${!todo.completed}')">
        ${ todo.completed ? '❎' : '✅'}
        </button>        
        <button onclick="editTodo('${todo.id}')">✏️Edit</button>
        <button onclick="deleteTodo('${todo.id}')"> ❌ Delete </button></li>`
      }).join('') // join the array with an empty string to make it one big string
      // set the innerHTML of the todosContainer to the HTML we just created
      todosContainer.innerHTML = todosHtml
  })
}

function setCompleteStatus(id, status) {
  axios.patch(`/api/todos/${id}`, {
    completed: status
  })
  .then(() => {
    getAllTodos();
  })
}

function addNewTodos(description) {
  return axios.post('/api/todos', {
    description: description
  })
}

function editTodo(id) {  
  const description = prompt("Edit this item: ");  
  return axios.patch(`/api/todos/${id}`, {
    description: description
  })
    .then(() => {
      getAllTodos()
  })
}  


function deleteTodo(id) {
  axios.delete(`/api/todos/${id}`)
  .then(() => {
    getAllTodos();
  })
}

// fetch all todos on load
getAllTodos();

const todosForm = document.querySelector('#todosForm')
todosForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = todosForm.elements.description.value
  addNewTodos(description)
  .then(() => {
    // todosForm.elements.description.value = ''
    todosForm.reset();
    getAllTodos()
  })
}) 

// update with new button
// take new value as a patch
// send to the api for each todo at a time
