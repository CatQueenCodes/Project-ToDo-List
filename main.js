/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allProjects": () => /* binding */ allProjects
/* harmony export */ });
/* harmony import */ var _modules_taskHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/taskHelpers */ "./src/modules/taskHelpers.js");
/* harmony import */ var _modules_projectHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/projectHelpers */ "./src/modules/projectHelpers.js");




//holds app projects
const allProjects = []; 

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
/* harmony export */   "renderProject": () => /* binding */ renderProject,
/* harmony export */   "specificProject": () => /* binding */ specificProject
/* harmony export */ });
/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../src/index.js */ "./src/index.js");


//for use in /addTaskToProject, tells it which project to add task to, set when project is clicked
let specificProject = ''; 

//render task in DOM + complete & delete functionality
function renderTask(item){
    
    const taskHolder = document.getElementById('tasksHolder');

    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task';

    const completeButton = document.createElement('button');
    completeButton.className = 'taskCompleteBtn';
    completeButton.textContent = '✓';
    let status = item.completedStatus; 
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
    item.id = specificProject.tasks.indexOf(item);
    let index = item.id; console.log(index);
    deleteButton.addEventListener('click', deleteTask)
    taskWrapper.appendChild(deleteButton)

    taskHolder.append(taskWrapper)

    function deleteTask() {
       specificProject.tasks.splice(index,1); 
       taskHolder.innerHTML ='';
       specificProject.tasks.forEach(task => {renderTask(task)}); 
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
    const taskHolder = document.getElementById('tasksHolder');

    const projectWrapper = document.createElement('div');
    projectWrapper.className = 'project';
    projectWrapper.addEventListener('click', displayProject); //renders current projects tasks

    const deleteButton = document.createElement('button');
    deleteButton.className = 'projectDeleteBtn';
    deleteButton.textContent = 'X';
    item.id = _src_index_js__WEBPACK_IMPORTED_MODULE_0__.allProjects.indexOf(item);
    let index = item.id;
    deleteButton.addEventListener('click', deleteProject); 
    projectWrapper.appendChild(deleteButton);

    const projectName = document.createElement('div');
    projectName.className = 'projectName';
    projectName.textContent = item.name;
    projectWrapper.appendChild(projectName);
    projectHolder.appendChild(projectWrapper);

    function deleteProject() {
        _src_index_js__WEBPACK_IMPORTED_MODULE_0__.allProjects.splice(index, 1);
        projectHolder.innerHTML = '';
        _src_index_js__WEBPACK_IMPORTED_MODULE_0__.allProjects.forEach(item => renderProject(item)); console.table(_src_index_js__WEBPACK_IMPORTED_MODULE_0__.allProjects)
    }

    function displayProject(){
        specificProject = _src_index_js__WEBPACK_IMPORTED_MODULE_0__.allProjects[index]; //console.log(specificProject.tasks);
        name.textContent = item.name;
        description.textContent = item.description;
        taskHolder.innerHTML = '';
    }
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
/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../src/index.js */ "./src/index.js");





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
    hideProjectForm();
    _src_index_js__WEBPACK_IMPORTED_MODULE_2__.allProjects.push(project);
    projectForm.reset();
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.renderProject)(project);
    console.log('AllProject:', _src_index_js__WEBPACK_IMPORTED_MODULE_2__.allProjects)
}


/***/ }),

/***/ "./src/modules/taskFactory.js":
/*!************************************!*\
  !*** ./src/modules/taskFactory.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "taskFactory": () => /* binding */ taskFactory
/* harmony export */ });

//complete, name, priority, date, always want complete to be set to false automatically, id = project.length
const taskFactory = (taskName, priority, date) => {
    let completedStatus = false;
    let id = ' '
    return{completedStatus, taskName, priority, date, id} //id 
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
    let project = _DOM__WEBPACK_IMPORTED_MODULE_1__.specificProject.tasks;
    project.push(task);
    taskForm.reset();
    taskForm.style.display = 'none';
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.renderTask)(task);
    console.log('This Projects Task', _DOM__WEBPACK_IMPORTED_MODULE_1__.specificProject.tasks)
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.js");
/******/ })()
;
//# sourceMappingURL=main.js.map