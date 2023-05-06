import NewTask from './newtodo.js';

const checkboxes = document.getElementsByClassName('checkbox');
const todoActivityDiv = document.getElementById('activity-div');
const removebtn = document.getElementsByClassName('removebtn');
const desc = document.getElementsByClassName('desc');

class TodoList {
  constructor() {
    this.todostorage = JSON.parse(localStorage.getItem('todoList')) || [];
  }

  addBook = (description) => {
    const booked = new NewTask(description, false, this.todostorage.length);
    this.todostorage.push(booked);
    localStorage.setItem('todoList', JSON.stringify(this.todostorage));
    return this.todostorage;
  };

  descChange = (todoId) => {
    document.getElementById(`${todoId}-${todoId}`).onclick = () => {
      document.getElementById(`${todoId}-${todoId}`).style.display = 'none';
      document.getElementById(`${todoId}`).setAttribute('readonly', true);
      this.todostorage[todoId].description = document.getElementById(
        `${todoId}`,
      ).value;
      localStorage.setItem('todoList', JSON.stringify(this.todostorage));
    };
  };

  checkbox = (todoId) => {
    this.todostorage[todoId].complete = !this.todostorage[todoId].complete;
    localStorage.setItem('todoList', JSON.stringify(this.todostorage));
  };

  remove = (todoId) => {
    const filterFunction = (todo) => todo.index !== parseInt(todoId, 10);
    const filteredTodos = this.todostorage.filter(filterFunction);
    this.displayBooks();
    this.todostorage = filteredTodos;
    this.RearrangeArray();
    localStorage.setItem('todoList', JSON.stringify(filteredTodos));
    return this.todostorage;
  };

  RearrangeArray = () => {
    for (let i = 0; i < this.todostorage.length; i += 1) {
      this.todostorage[i].index = i;
    }
  };

  displayBooks = () => {
    todoActivityDiv.innerHTML = '';
    this.todostorage.forEach((todo) => {
      const { description, index } = todo;
      todoActivityDiv.innerHTML += `
      <div class="div-flex">
      <form>
      <div class="activity-flex" >
          <input class='checkbox' name='${index}'  type="checkbox"/>
          <input class ='desc' id='${index}' name= 'username'  type="text" placeholder='${description}' readonly="readonly"/>
          <button id='${index}-${index}' type='submit' class= 'activitySubmit'> <i class="fa fa-check" aria-hidden="true"></i></button>
      </div>
      </form>
      <button class= 'removebtn delbtn' id='${index}-${index}-${index}' ><i class="  fa fa-ellipsis-v" aria-hidden="true"></i></button>
     </div>
          `;
    });
    for (let i = 0; i < this.todostorage.length; i += 1) {
      if (this.todostorage[i].complete === true) {
        checkboxes[i].checked = true;
      }
    }
    Array.from(removebtn).forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.remove(e.target.id);
        this.displayBooks();
      });
    });
    Array.from(desc).forEach((input) => {
      input.addEventListener('click', (e) => {
        e.preventDefault();
        input.removeAttribute('readonly');
        document.getElementById(`${e.target.id}-${e.target.id}`).style.display = 'flex';
        this.descChange(e.target.id);
      });
    });
    Array.from(checkboxes).forEach((input) => {
      input.addEventListener('change', (e) => {
        e.preventDefault();
        this.checkbox(e.target.name);
      });
    });
  };
}

export default TodoList;
