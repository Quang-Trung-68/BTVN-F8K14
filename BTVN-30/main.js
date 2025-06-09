import {
  getAllMethod,
  postMethod,
  putMethod,
  deleteMethod,
} from "./utils/index.js";

const todoList = document.querySelector(".todo-list");
console.log(todoList);

const getAll = async () => {
  const dataAll = await getAllMethod();
  return dataAll;
};

const postData = async (data) => {
  const dataTodo = await postMethod(data);
  return dataTodo;
};

// validate input
function validateTodoInput(input) {
  const trimmed = input.trim();

  // 1. Check if empty input
  if (trimmed === "") {
    return { valid: false, error: "Todo không được để trống." };
  }

  // 2. Maximum length and min
  if (trimmed.length < 3) {
    return { valid: false, error: "Todo quá ngắn (tối thiểu 3 ký tự)." };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: "Todo quá dài (tối đa 100 ký tự)." };
  }

  return { valid: true };
}

const todoInput = document.querySelector(".todo-input");
const todoAddBtn = document.querySelector(".add-btn");
todoAddBtn.addEventListener("click", () => {
  if (validateTodoInput(todoInput.value).valid) {
    let obj = {};
    obj.title = todoInput.value.trim();
    obj.completed = false;
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
    todoInput.value = "";
  } else {
    alert(validateTodoInput(todoInput.value).error);
    todoInput.value = "";
  }
});

const main = async () => {
  const resultAll = await getAll();
  console.log(resultAll);

  // Clear screen
  todoList.innerHTML = "";

  // Create function handle todo edit
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

    // Remove existing event listeners to avoid duplicate
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
      if (validateTodoInput(editInput.value).valid) {
        try {
          await putMethod(todo.id, {
            title: editInput.value.trim(),
            completed: todo.completed,
          });
          await main();
        } catch (error) {
          console.log(error);
        }
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
      } else {
        alert(validateTodoInput(editInput.value).error);
        editInput.value = todo.title;
      }
    });

    // Close modal when click overlay
    overlay.addEventListener("click", () => {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    });
  };

  resultAll.forEach((todo) => {
    // Create todo item
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    
    // Create checkbox
    const todoCheckbox = document.createElement("input");
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.setAttribute("name", "todoCheckbox");

    // Create todo content
    const todoContent = document.createElement("div");
    todoContent.classList.add("todo-content");
    todoContent.innerText = todo.title;
    
    // Create btn edit & del
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

    // Checkbox change logic
    todoCheckbox.addEventListener("change", async (e) => {
      e.stopPropagation();
      
      const isChecked = todoCheckbox.checked;
      
      if (isChecked) {
        // User checked the box - mark as completed
        todoContent.classList.add("completed");
      } else {
        // User unchecked the box - mark as not completed
        todoContent.classList.remove("completed");
      }
      
      try {
        await putMethod(todo.id, {
          title: todo.title,
          completed: isChecked
        });
      } catch (error) {
        console.log("Error updating todo:", error);
        // Revert UI change if API call fails
        todoCheckbox.checked = !isChecked;
        if (isChecked) {
          todoContent.classList.remove("completed");
        } else {
          todoContent.classList.add("completed");
        }
      }
    });

    // Click to toggle completion
    todoItem.addEventListener("click", async (e) => {
      // Don't trigger if clicking on checkbox, edit, or delete buttons
      if (e.target === todoCheckbox || e.target === todoEditBtn || e.target === todoDeleteBtn) {
        return;
      }
      
      const newCompletedState = !todoCheckbox.checked;
      todoCheckbox.checked = newCompletedState;
      
      if (newCompletedState) {
        todoContent.classList.add("completed");
      } else {
        todoContent.classList.remove("completed");
      }
      
      try {
        await putMethod(todo.id, {
          title: todo.title,
          completed: newCompletedState
        });
      } catch (error) {
        console.log("Error updating todo:", error);
        // Revert UI change if API call fails
        todoCheckbox.checked = !newCompletedState;
        if (newCompletedState) {
          todoContent.classList.remove("completed");
        } else {
          todoContent.classList.add("completed");
        }
      }
    });

    // Set initial state from API
    if (todo.completed) {
      todoCheckbox.checked = true;
      todoContent.classList.add("completed");
    } else {
      todoCheckbox.checked = false;
      todoContent.classList.remove("completed");
    }
    
    // Add to todoItem
    todoItem.append(todoCheckbox, todoContent, todoEditBtn, todoDeleteBtn);
    todoList.append(todoItem);
  });
};

main();