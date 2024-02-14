// Some code snippets have been provided to you for ease of coding.
// You can choose to remove or change any of them to suit your needs.

var outstandingtasks=[];
var finishedtasks=[];
var maxtaskid=0;

function bootstrap()
{
    // Code for Q7 starts here. This code restores the values
    // of variables to their previous values (i.e., before browser
    // was closed). 
    // Restore outstanding tasks from local storage
    var outstandingTasksStr = localStorage.getItem('outstandingTasks');
    if (outstandingTasksStr) {
        outstandingtasks = JSON.parse(outstandingTasksStr);
    }

    // Restore finished tasks from local storage
    var finishedTasksStr = localStorage.getItem('finishedTasks');
    if (finishedTasksStr) {
        finishedtasks = JSON.parse(finishedTasksStr);
    }

    displayfunction(); // Update display on page load

    // Hide all sections except home initially
    showSection('home');

    // Code for Q7 ends here.
}

function showSection(sectionId) {
    // List of all section IDs
    const sections = ['home', 'add', 'finish', 'display'];
    
    // Loop through sections, show the selected and hide others
    sections.forEach((id) => {
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
            if (id === sectionId) {
                sectionElement.style.display = 'block'; // Show the selected section
            } else {
                sectionElement.style.display = 'none'; // Hide other sections
            }
        }
    });
}

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', (event) => {
    // Ensure elements are available before attaching listeners
    document.querySelectorAll('nav ul li a').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const sectionId = link.getAttribute('href').substring(1); // Get section ID from href
            showSection(sectionId);
        });
    });
});


function addfunction()
{
    // Code for Q2 starts here. This function uses DOM read
    // to get the values of HTML fields. Subsequently, it
    // adds them to the JS variable called outstandingtasks. 
    // You are also required to save the contents of this variable
    // in a JS cookie (Q7). 
    var taskName = document.getElementById('taskName').value;
    var priority = document.getElementById('priority').value;
    var deadline = document.getElementById('deadline').value;

    if (!taskName || !deadline) {
        alert('Please enter both a task name and a deadline.');
        return; // Exit the function, so the task is not added
    }

    var task = {
        id: ++maxtaskid, // Increment and assign a new ID
        name: taskName,
        priority: priority,
        deadline: deadline,
        status: 'Outstanding'
    };

    outstandingtasks.push(task);

    //notify users have successfully add a task
    alert("You have successfully add a task!");

    // Save updated tasks to local storage
    localStorage.setItem('outstandingTasks', JSON.stringify(outstandingtasks));

    displayfunction(); // Refresh display
    console.log(outstandingtasks);

    // clear the form fields after adding the task
    document.getElementById('taskName').value = '';
    document.getElementById('priority').selectedIndex = 0; // Assuming 'High' is the first option
    document.getElementById('deadline').value = '';


    //Code for Q2 ends here.
    console.log(outstandingtasks);
}

function finishfunction()
{
    // Code for Q3 starts here. This function uses DOM read to
    // get the serial number from the user. Subsequently, it
    // searches/finds the Task matching the serial number and
    // deletes the task from outstandingtasks. Do not forget to
    // add the task to finished tasks before deleting it.
    var taskId = parseInt(document.getElementById('taskID').value);
    var taskIndex = outstandingtasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
        var task = outstandingtasks.splice(taskIndex, 1)[0]; // Remove task from outstanding
        task.status = 'Completed';
        finishedtasks.push(task); // Add to finished

        // Save updates to local storage
        localStorage.setItem('outstandingTasks', JSON.stringify(outstandingtasks));
        localStorage.setItem('finishedTasks', JSON.stringify(finishedtasks));

        displayfunction(); // Refresh display
    } else {
        alert('Task not found.');
    }


    // Code for Q3 ends.
    console.log(outstandingtasks);
}

function displayfunction()
{
    // Code for Q4 starts here. This function identifies the HTML
    // element corresponding to the Tables for outstanding 
    // and finished tasks. You must create the table by adding rows,
    // columns, and finally populate the text in the table. Code
    // for Outstanding tasks and finished tasks is similar. Use
    // the Demo code used in class as a starting point for table
    // creation using JS.
    var displayOutstanding = document.getElementById('displayoutstanding').getElementsByTagName('tbody')[0];
    var displayCompleted = document.getElementById('displaycompleted').getElementsByTagName('tbody')[0];

    // Clear existing rows
    displayOutstanding.innerHTML = '';
    displayCompleted.innerHTML = '';

    // Populate outstanding tasks
    outstandingtasks.forEach(task => {
        var row = displayOutstanding.insertRow();
        Object.values(task).forEach(text => {
            var cell = row.insertCell();
            cell.textContent = text;
        });
    });

    // Populate completed tasks
    finishedtasks.forEach(task => {
        var row = displayCompleted.insertRow();
        Object.values(task).forEach(text => {
            var cell = row.insertCell();
            cell.textContent = text;
        });
    });

    
    // Code for Q4 ends.
}

