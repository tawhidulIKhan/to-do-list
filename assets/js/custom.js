let addTask = document.querySelector("#addTask");

/**
 * @desc Task Submit
 * @param Event
 */

addTask.addEventListener("submit", taskSubmit);

function taskSubmit(e) {
  let tasks = [];

  tasks["myTask"] = {
    name: value("#taskName"),
    due: value("#taskDue"),
    category: value("#taskCategory"),
    priority: value("#taskPriority")
  };

  insert(tasks["myTask"]);

  e.preventDefault();
}

/**
 * @desc Task insert
 * @param task
 */

function insert(myTasks) {
  let tasks = getData("tasks");

  if (tasks) {
    tasks = JSON.parse(tasks);
    tasks.push({
      id: chance.guid(),
      name: myTasks.name,
      category: myTasks.category,
      due: myTasks.due,
      priority: myTasks.priority,
      status: 0
    });

    tasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasks);
  } else {
    let total = [];

    total.push({
      id: chance.guid(),
      name: myTasks.name,
      category: myTasks.category,
      due: myTasks.due,
      priority: myTasks.priority,
      status: 0
    });

    setData("tasks", total);
  }

  show();

  total("tasks", "#total");
  return true;
}

total("tasks", "#total");

/**
 * @desc Task Show
 * @param empty
 */

function show() {
  let displayTask = document.querySelector("#taskDisplay");
  let tasks = getData("tasks");

  tasks = JSON.parse(tasks);
  displayTask.innerHTML = template(tasks);
}

/**
 * @desc Data template
 * @param data
 */

function template(data) {
  let html = "";

  if (data != null && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      html += `<div class="row bg-white task-content p-2 mb-5">
          <div class="col-12 mt-3">
            <h4>${fUpper(data[i].name)}</h4>
            <div class="meta d-flex">
             <div><i class="fa fa-tag mr-2" aria-hidden="true"></i> ${
               data[i].category
             } </div>
             <span class="mx-3">/</span>
             <div class=""><i class="fa fa-calendar mr-3" aria-hidden="true"></i> ${
               data[i].due
             }</div>
             <span class="mx-3">/</span>

             <div class="">${priority(data[i].priority)}</div>

            </div>
             <div class="d-flex action mt-3 py-3 justify-content-end">
             <div>
            <a href="#" onclick="remove('${
              data[i].id
            }')" class="btn btn-danger btn-sm">
            Del
          </a>
          <a href="#" class="btn btn-success btn-sm" onclick="complete('${
            data[i].id
          }')" class="btn">Done </a>
             </div></div>
                       <div class="status">${status(data[i].status)}</div>      
          </div> 
      </div>`;
    }
  } else {
    html += `<p class="bg-white p-3 text-primary">No Task Found</p>`;
  }

  return html;
}

function status(data) {
  if (data === 0) {
    return `<span class="text-danger"><i class="mr-2 fa fa-close" aria-hidden="true"></i>Incomplete</span>`;
  } else {
    return `<span class="text-success"><i class="mr-2 fa fa-check-circle-o" aria-hidden="true"></i>Complete</span>`;
  }
}

function priority(data) {
  if (data == "low") {
    return `<span class="badge-primary text-white">Low</span>`;
  } else if (data == "medium") {
    return `<span class="badge-info text-white">Medium</span>`;
  } else {
    return `<span class="badge-warning text-white">High</span>`;
  }
}
/**
 * @desc Task Remove
 * @param id
 */

function remove(id) {
  let tasks = getData("tasks");
  tasks = JSON.parse(tasks);
  if (tasks) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks.splice(i, 1);
      }
    }
  }

  setData("tasks", tasks);
  window.location.reload();
}

function complete(id) {
  let tasks = getData("tasks");
  tasks = JSON.parse(tasks);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].status = 1;
    }
  }

  setData("tasks", tasks);
  show();
}

let clearAll = document.querySelector("#clearAll");

clearAll.addEventListener("click", removeAll);

function removeAll(e) {
  let tasks = getData("tasks");
  if (tasks) {
    removeData("tasks");
    show();
  }
}

// Date

window.onload = function() {
  show();
};
