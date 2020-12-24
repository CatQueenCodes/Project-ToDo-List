/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_taskHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/taskHelpers */ "./src/modules/taskHelpers.js");
/* harmony import */ var _modules_projectHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/projectHelpers */ "./src/modules/projectHelpers.js");





//display form when '+ Project' clicked
const addProjectButton = document.getElementById('addProject');
addProjectButton.addEventListener('click', _modules_projectHelpers__WEBPACK_IMPORTED_MODULE_1__.displayProjectForm)

//submit project button 
const submitProjectButton = document.getElementById('projectSubmit');
submitProjectButton.addEventListener('click', _modules_projectHelpers__WEBPACK_IMPORTED_MODULE_1__.addProject)
//displays tasks when '+ Task' is clicked
const addTaskButton = document.getElementById('addTask');
addTaskButton.addEventListener('click', _modules_taskHelpers__WEBPACK_IMPORTED_MODULE_0__.displayTaskForm) 

//submit task button
const submitTaskButton = document.getElementById('taskSubmit');
submitTaskButton.addEventListener('click', _modules_taskHelpers__WEBPACK_IMPORTED_MODULE_0__.addTaskToProject);


//keeps form to submit tasks and projects hidden until '+ Task' is clicked
(0,_modules_taskHelpers__WEBPACK_IMPORTED_MODULE_0__.hideTaskForm)();
(0,_modules_projectHelpers__WEBPACK_IMPORTED_MODULE_1__.hideProjectForm)();



/***/ }),

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderTask": () => /* binding */ renderTask,
/* harmony export */   "renderProject": () => /* binding */ renderProject
/* harmony export */ });
/* harmony import */ var _taskFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskFactory */ "./src/modules/taskFactory.js");


//render task in DOM + complete & delete functionality
function renderTask(item){
    const taskHolder = document.getElementById('tasksHolder');

    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task';

    const completeButton = document.createElement('button');
    completeButton.className = 'taskCompleteBtn';
    completeButton.textContent = '✓';
    let status = item.completedStatus; console.log(status);
    completeButton.addEventListener('click', changeStatus)
    taskWrapper.appendChild(completeButton);
    
    const taskName = document.createElement('div');
    taskName.className = 'taskNameDiv';
    taskName.textContent =  item.taskName 
    taskWrapper.appendChild(taskName);

    const taskPriority = document.createElement('div');
    taskPriority.className = 'taskPriorityDiv';
    taskPriority.textContent =  item.priority 
    taskWrapper.appendChild(taskPriority);

    const taskDate = document.createElement('div');
    taskDate.className = 'taskDateDiv';
    taskDate.textContent =  item.date 
    taskWrapper.appendChild(taskDate);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'taskDeleteBtn';
    deleteButton.textContent = 'X';
    item.id = _taskFactory__WEBPACK_IMPORTED_MODULE_0__.project.indexOf(item);
    let index = item.id; 
    deleteButton.addEventListener('click', deleteTask)
    taskWrapper.appendChild(deleteButton)

    taskHolder.append(taskWrapper)

    //delete task from project array
    function deleteTask() {
       _taskFactory__WEBPACK_IMPORTED_MODULE_0__.project.splice(index,1); 
       taskHolder.innerHTML =' ';
       _taskFactory__WEBPACK_IMPORTED_MODULE_0__.project.forEach(item => {renderTask(item)}); console.table(_taskFactory__WEBPACK_IMPORTED_MODULE_0__.project)
    }

    //change color of completed task
    function changeStatus(){   
        status = !status; console.log(status);
        (status === false) ? this.style.backgroundColor = 'transparent' : this.style.backgroundColor = 'rgb(115, 155, 96)';
    }
}

//going to need to render tasks in here too when it is clicked

// render PROJECT and give project functionality
function renderProject(item){
    const projectHolder = document.getElementById('projectsHolder');
    const name = document.getElementById('Name')
    const description = document.getElementById('Description')

    const projectWrapper = document.createElement('div');
    projectWrapper.className = 'project';

    const projectName = document.createElement('div');
    projectName.className = 'projectName';
    projectName.textContent = item.name;
    projectWrapper.appendChild(projectName);

    name.textContent = item.name;
    description.textContent = item.description;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'projectDeleteBtn';
    deleteButton.textContent = 'X';
    //add event listener
    projectWrapper.appendChild(deleteButton);

    projectHolder.appendChild(projectWrapper);
}



/***/ }),

/***/ "./src/modules/projectFactory.js":
/*!***************************************!*\
  !*** ./src/modules/projectFactory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectFactory": () => /* binding */ projectFactory
/* harmony export */ });
const projectFactory = (name, description) => {
    let tasks = [];
    let id = '';

    return{name, description, tasks, id}
}



/***/ }),

/***/ "./src/modules/projectHelpers.js":
/*!***************************************!*\
  !*** ./src/modules/projectHelpers.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hideProjectForm": () => /* binding */ hideProjectForm,
/* harmony export */   "displayProjectForm": () => /* binding */ displayProjectForm,
/* harmony export */   "addProject": () => /* binding */ addProject
/* harmony export */ });
/* harmony import */ var _projectFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectFactory */ "./src/modules/projectFactory.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/modules/DOM.js");




function hideProjectForm() {
    const projectForm = document.getElementById('projectForm');
    projectForm.style.display = 'none';
}

function displayProjectForm() {
    projectForm.style.display = 'block';
}

function addProject() {
    event.preventDefault();
    let project = (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.projectFactory)(projectName.value, projectDescription.value)
    console.log(project);
    hideProjectForm();
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.renderProject)(project);
}


/***/ }),

/***/ "./src/modules/taskFactory.js":
/*!************************************!*\
  !*** ./src/modules/taskFactory.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "taskFactory": () => /* binding */ taskFactory,
/* harmony export */   "project": () => /* binding */ project
/* harmony export */ });
const project = [];

//complete, name, priority, date, always want complete to be set to false automatically, id = project.length
const taskFactory = (taskName, priority, date) => {
    let completedStatus = false;
    let id = ' '
    return{completedStatus, taskName, priority, date, id} 
}




/***/ }),

/***/ "./src/modules/taskHelpers.js":
/*!************************************!*\
  !*** ./src/modules/taskHelpers.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTaskToProject": () => /* binding */ addTaskToProject,
/* harmony export */   "hideTaskForm": () => /* binding */ hideTaskForm,
/* harmony export */   "displayTaskForm": () => /* binding */ displayTaskForm
/* harmony export */ });
/* harmony import */ var _taskFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskFactory */ "./src/modules/taskFactory.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/modules/DOM.js");





//when you click add button it adds the task to the Project Array and uses the values in the task Factory.
function addTaskToProject() {
    event.preventDefault();
    let task = (0,_taskFactory__WEBPACK_IMPORTED_MODULE_0__.taskFactory)(taskName.value, priority.value, date.value)
    _taskFactory__WEBPACK_IMPORTED_MODULE_0__.project.push(task);
    taskForm.reset();
    taskForm.style.display = 'none';
    console.log(_taskFactory__WEBPACK_IMPORTED_MODULE_0__.project)
    ;(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.renderTask)(task);
}

//set so form is hidden till clicked 
function hideTaskForm(){
    const taskForm = document.getElementById('taskForm');
    taskForm.style.display = 'none';
}

//display task form
function displayTaskForm() {
    taskForm.style.display = 'block';
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.js.map