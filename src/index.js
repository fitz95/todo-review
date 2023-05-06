import './style.css';
import TodoList from './modules/todoclass.js';

const clear = document.getElementById('clear');
const form = document.getElementById('addForm');
const todoDesc = document.getElementById('todoactivityinput');
const booked = new TodoList();

window.onload = () => {
  booked.displayBooks();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  booked.addBook(todoDesc.value);
  form.reset();
  booked.displayBooks();
});

clear.addEventListener('click', (e) => {
  e.preventDefault();
  const storage = booked.todostorage;
  const clearFunc = (todo) => todo.complete === false;
  const clearedTodos = storage.filter(clearFunc);
  booked.todostorage = clearedTodos;
  booked.RearrangeArray();
  localStorage.setItem('todoList', JSON.stringify(clearedTodos));
  booked.displayBooks();
});
//
