const todos = [];
const RENDER_EVENT = 'render-todo';

// event listener ketika content loaded
document.addEventListener('DOMContentLoaded', () => {
  const submitForm = document.querySelector('#form');
  submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo();
  });
});

// function todo
const addTodo = () => {
  const textTodo = document.querySelector('#title').value;
  const timestamp = document.querySelector('#date').value;

  const generatedId = generateId();
  const todoObject = generateTodoObject(
    generatedId,
    textTodo,
    timestamp,
    false
  );

  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
};

// generateId function
const generateId = () => +new Date();

// Function generateTodoObject
const generateTodoObject = (id, task, timestamp, isComplete) => {
  return {
    id,
    task,
    timestamp,
    isComplete,
  };
};

document.addEventListener(RENDER_EVENT, () => {
  console.log(todos);
});
