import {
  getAllMethod,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} from "./utils/index.js";

const todoList = document.querySelector(".todo-list");
console.log(todoList);

const getData = async (id) => {
  const data = await getMethod(id);
  return data;
};

const getAll = async () => {
  const dataAll = await getAllMethod();
  return dataAll;
};

const postData = async (data) => {
  const dataTodo = await postMethod(data);
  return dataTodo;
};

const todoInput = document.querySelector(".todo-input");
const todoAddBtn = document.querySelector(".add-btn");
todoAddBtn.addEventListener("click", () => {
  if (todoInput.value) {
    let obj = {};
    obj.title = todoInput.value;
    obj.completed = true;
    console.log("Added todo: " + obj);
    // run post
    const runPost = async () => {
      try {
        const dataRunPost = await postData(obj);
        await main();

        return dataRunPost;
      } catch (error) {
        console.log(error);
      }
    };

    runPost();

    // renderUI();
    todoInput.value = "";
  }
});
console.log(todoInput);

const main = async () => {
  const resultAll = await getAll();
  console.log(resultAll);

  //   clear screen
  todoList.innerHTML = "";

  //   create function handle todo edit

  const handleEditModal = (todo) => {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const editInput = document.querySelector(".todo-edit-input");
    const todoCancel = document.querySelector(".todo-cancel");
    const todoSave = document.querySelector(".todo-save");

    // Show modal
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    editInput.value = todo.title;

    // Remove existing event listeners để tránh duplicate
    const newTodoCancel = todoCancel.cloneNode(true);
    todoCancel.parentNode.replaceChild(newTodoCancel, todoCancel);

    const newTodoSave = todoSave.cloneNode(true);
    todoSave.parentNode.replaceChild(newTodoSave, todoSave);

    // Cancel button
    newTodoCancel.addEventListener("click", () => {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    });

    // Save button
    newTodoSave.addEventListener("click", async () => {
      if (editInput.value.trim()) {
        try {
          await putMethod(todo.id, {
            title: editInput.value.trim(),
            completed: todo.completed,
          });
          await main();
        } catch (error) {
          console.log(error);
        }
      }
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    });

    // Close modal when click overlay
    overlay.addEventListener("click", () => {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    });
  };

  resultAll.forEach((todo) => {
    // create todo item
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    // create checkbox
    const todoCheckbox = document.createElement("input");
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.setAttribute("name", "todoCheckbox");

    // create todo content
    const todoContent = document.createElement("div");
    todoContent.classList.add("todo-content");
    todoContent.innerText = todo.title;
    // create btn edit & del
    const todoEditBtn = document.createElement("button");
    todoEditBtn.classList.add("edit-btn", "fa-solid", "fa-pen-to-square");
    todoEditBtn.setAttribute("type", "button");
    todoEditBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      handleEditModal(todo);
    });

    const todoDeleteBtn = document.createElement("button");
    todoDeleteBtn.classList.add("del-btn", "fa-solid", "fa-trash");
    todoDeleteBtn.setAttribute("type", "button");

    todoDeleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const runDelete = async () => {
        const resultDelete = await deleteMethod(todo.id);
        await main();
      };
      runDelete();
    });

    // check checkbox is true or false to render and post to api

    todoCheckbox.addEventListener("change", (e) => {
      e.stopPropagation();
      if (todoCheckbox.checked) {
        {
          todoCheckbox.checked = false;
          todoContent.classList.remove("completed");

          const runPut = async () => {
            const resultPut = await putMethod(todo.id, {
              title: `${todo.title}`,
              completed: false,
            });
          };
          runPut();
        }
      } else {
        todoCheckbox.checked = true;
        todoContent.classList.add("completed");
        const runPut = async () => {
          const resultPut = await putMethod(todo.id, {
            title: `${todo.title}`,
            completed: true,
          });
        };
        runPut();
      }
    });

    // click to content of item that change completed
    todoItem.addEventListener("click", () => {
      if (!todoCheckbox.checked) {
        {
          todoContent.classList.add("completed");
          todoCheckbox.checked = true;
          const runPut = async () => {
            const resultPut = await putMethod(todo.id, {
              title: `${todo.title}`,
              completed: true,
            });
          };
          runPut();
        }
      } else {
        todoContent.classList.remove("completed");
        todoCheckbox.checked = false;
        const runPut = async () => {
          const resultPut = await putMethod(todo.id, {
            title: `${todo.title}`,
            completed: false,
          });
        };
        runPut();
      }
    });

    // check from api to render
    if (todo.completed) {
      todoCheckbox.checked = true;
      todoContent.classList.add("completed");
    } else {
      todoCheckbox.checked = false;
      todoContent.classList.remove("completed");
    }
    // add to todoItem
    todoItem.append(todoCheckbox, todoContent, todoEditBtn, todoDeleteBtn);
    todoList.append(todoItem);
  });

  //   add a todo
};

main();
