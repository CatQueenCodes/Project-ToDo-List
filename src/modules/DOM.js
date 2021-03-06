import {allProjects, setData} from '/src/index.js';
import {displayAddTaskButton, displayTaskForm, hideAddTaskButton, hideTaskForm} from './taskHelpers';

//for use in /addTaskToProject() deleteTask(), tells it which project to add tasks to, set when project is clicked
let specificProject = ''; 

//for use in /addTaskToProject() when updating for splice so it know which specific task to remove
let specificTask = ''; 


//for use in /addTaskToProject when updating to get status of specific task
let specificComplete = '';

//render task in DOM + complete & delete functionality
function renderTask(item){
    const submitTaskBtn = document.getElementById('taskSubmit');
    const taskHolder = document.getElementById('tasksHolder');

    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task';
    taskWrapper.addEventListener('click', editTask)

    const completeButton = document.createElement('button');
    completeButton.className = 'taskCompleteBtn';
    completeButton.textContent = '✓';
    (item.completedStatus === false) ? completeButton.style.backgroundColor = '#EFEFEF' : completeButton.style.backgroundColor = 'rgb(115, 155, 96)';
    completeButton.addEventListener('click', changeStatus)
    taskWrapper.appendChild(completeButton);
    
    const taskName = document.createElement('div');
    taskName.className = 'taskNameDiv';
    taskName.textContent =  item.nameTask;
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
    let index = item.id;
    deleteButton.addEventListener('click', deleteTask)
    taskWrapper.appendChild(deleteButton)

    taskHolder.append(taskWrapper)

    function deleteTask(){  
        hideTaskForm();
        taskForm.reset()
        submitTaskBtn.textContent = 'Add';
        specificProject.tasks.splice(index,1); 
        taskHolder.innerHTML ='';
        specificProject.tasks.forEach(task => {renderTask(task)}); 
        setData();
    }

    //change color of completed task    //could also just re-render and remove color change on click since it will change the status and re-rendering will render it with new color linked to status
    function changeStatus(){  
        item.completedStatus = !item.completedStatus;  console.log(item);
        taskHolder.innerHTML ='';
        specificProject.tasks.forEach(task => {renderTask(task)}); 
        (item.completedStatus === false) ? this.style.backgroundColor = '#EFEFEF' : this.style.backgroundColor = 'rgb(115, 155, 96)';  //need this line and the one after so color is updated if complete button is clicked during  'update task' is
        specificComplete = item.completedStatus; console.log(specificComplete); 
        setData();
    }

    //display task description and edit when clicked

    function editTask(){
        if(event.target !== deleteButton && event.target !== completeButton){
            submitTaskBtn.textContent = 'Update';
            displayTaskForm();
            nameTask.value = item.nameTask;
            priority.value = item.priority;
            date.value = item.date;
            taskDescription.value = item.taskDescription;
            specificTask = item.id;  console.log(item.id)  
            specificComplete = item.completedStatus; 
            setData();
        }
    }
}

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
    item.id = allProjects.indexOf(item);
    let index = item.id;
    deleteButton.addEventListener('click', deleteProject); 
    projectWrapper.appendChild(deleteButton);

    const projectName = document.createElement('div');
    projectName.className = 'projectName';
    projectName.textContent = item.name;
    projectWrapper.appendChild(projectName);
    projectHolder.appendChild(projectWrapper);

    function deleteProject() {
        allProjects.splice(index, 1);
        projectHolder.innerHTML = ''
        taskHolder.innerHTML = '';
        name.textContent = 'Please Create a Project';
        description.textContent = 'Select a project to add tasks to it!';
        hideAddTaskButton();
        allProjects.forEach(project => renderProject(project)); console.table(allProjects)
        setData();
    }

    function displayProject(){
        console.log(event.target)
        specificProject = allProjects[index]; //console.log(specificProject.tasks);
        if(event.target !== deleteButton) {
            name.textContent = item.name;
            description.textContent = item.description;
            taskHolder.innerHTML = '';
            specificProject.tasks.forEach(task => {renderTask(task)})
            displayAddTaskButton();
        }
    }
}

export {renderTask, renderProject, specificProject, specificTask, specificComplete}