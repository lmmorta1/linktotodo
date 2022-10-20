(function () {
  let array = [];

  let listName = null;
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }
  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");
    let wrapperForButton = document.createElement("div");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";

    input.addEventListener("input", function () {
      if (input.value) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });

    buttonWrapper.append(wrapperForButton);
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }
  function createTodoItem(obj) {
    let item = document.createElement("li");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-centre"
    );
    item.textContent = obj.name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    item.id = obj.id;

    if (obj.done) item.classList.toggle("list-group-item-success");

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    doneButton.addEventListener("click", function () {
      for (const item of array) {
        if (item.id == obj.id) {
          item.done = !item.done;
          break;
        }
      }
      saveList(array);
      item.classList.toggle("list-group-item-success");
    });
    deleteButton.addEventListener("click", function () {
      if (confirm("вы уверены?")) {
        for (let i = 0; i < array.length; i++)
          if (item.id == obj.id) {
            array.splice(i, 1);
            break;
          }
        saveList(array);
        item.remove();
      }
    });
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function getNewId(arr) {
    let max = 0;
    for (const item of arr) {
      if (item.id > max) {
        max = item.id;
      }
    }
    return max + 1;
  }

  function createTodoApp(container, title = "Список дел", namel, def = []) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    if (def.length > 0) {
      array = def;
      saveList(array);
    }
    listName = namel;

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    let localData = localStorage.getItem(listName);

    if (localData !== "" && localData !== null) {
      array = JSON.parse(localData);
    }

    if (array.length > 0) {
      for (const oneObj of array) {
        let todoItem = createTodoItem(oneObj);
        todoList.append(todoItem.item);
      }
    }
    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      }

      let obj = {
        id: getNewId(array),
        name: todoItemForm.input.value,
        done: false,
      };

      array.push(obj);

      console.log(array);

      let todoItem = createTodoItem(obj);

      todoList.append(todoItem.item);
      todoItemForm.input.value = "";
      todoItemForm.button.disabled = true;
      saveList(array);
    });
  }

  function saveList(arr) {
    localStorage.setItem(listName, JSON.stringify(arr));
  }

  window.createTodoApp = createTodoApp;
})();
