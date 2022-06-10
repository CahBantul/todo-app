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
  const uncompletedTodoList = document.querySelector('#todos');
  uncompletedTodoList.innerHTML = '';

  const completedTodoList = document.getElementById('completed-todos');
  completedTodoList.innerHTML = '';

  for (const index in todos) {
    console.log(index);
  }

  for (const todo of todos) {
    console.log(todo);

    const todoElement = makeTodo(todo);
    if (!todo.isComplete) uncompletedTodoList.append(todoElement);
    else completedTodoList.append(todoElement);
  }
});

const makeTodo = (todoObject) => {
  const textTitle = document.createElement('h2');
  textTitle.innerText = todoObject.task;

  const textTimestamp = document.createElement('p');
  textTimestamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', `todo-${todoObject.id}`);

  if (todoObject.isComplete) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');

    undoButton.addEventListener('click', () => {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');

    trashButton.addEventListener('click', () => {
      removeTaskFromCompleted(todoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');

    checkButton.addEventListener('click', () => {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
};

const addTaskToCompleted = (todoId) => {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const findTodo = (todoId) => {
  for (todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }

  return null;
};

const removeTaskFromCompleted = (todoId) => {
  const todoTarget = findTodoIndex(todoId);

  if (todoTarget === -1) return;

  todos.splice(todoTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
};

const undoTaskFromCompleted = (todoId) => {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isComplete = false;

  document.dispatchEvent(new Event(RENDER_EVENT));
};

const findTodoIndex = (todoId) => {
  for (index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }

  return -1;
};
