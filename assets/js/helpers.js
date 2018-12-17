/**
 * @desc Get node value
 * @param node name
 */

function value(name) {
  return document.querySelector(name).value;
}

/**
 * @desc Get localstorage data
 * @param name
 */

function getData(name) {

return localStorage.getItem(name);
}

/**
 * @desc Set localstorage data
 * @param name , data
 */

function setData(name, data) {
  tasks = JSON.stringify(data);
  localStorage.setItem(name, tasks);
}

/**
 * @desc Remove localstorage data
 * @param data
 */

function removeData(name) {
  localStorage.removeItem(name);
}

/**
 * @desc String first character uppercase
 * @param string
 */

function fUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * @desc Total Data
 * @param node , data name
 */

function total(name,el) {
    let elmnt = document.querySelector(el);
  
    total = JSON.parse(getData(name));
  
    if (total) {
        elmnt.innerHTML = total.length;
    }else{
        elmnt.innerHTML = 0;

    }
  }
  