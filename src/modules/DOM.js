import {allProjects} from '/src/index.js';
import {displayAddTaskButton} from './taskHelpers';

//for use in /addTaskToProject() deleteTask(), tells it which project to add task to, set when project is clicked
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
        projectHolder.innerHTML = '';
        allProjects.forEach(project => renderProject(project)); console.table(allProjects)
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

export {renderTask, renderProject, specificProject}