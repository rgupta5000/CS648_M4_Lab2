// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
let storedEmployees = localStorage.getItem('employees');
let employees = storedEmployees ? JSON.parse(storedEmployees) : [
    { id: 12345678, name: 'Didier Drogba', extension: 1234, email: 'didier.drogba@example.com', department: 'Engineering' },
    { id: 87654321, name: 'Fernando Torres', extension: 4321, email: 'fernando.torres@example.com', department: 'Marketing' },
    { id: 23456789, name: 'Michael Ballack', extension: 2345, email: 'michael.ballack@example.com', department: 'Sales' },
    { id: 98765432, name: 'Eden Hazard', extension: 5432, email: 'eden.hazard@example.com', department: 'Administrative' },
    { id: 34567890, name: 'Gianfranco Zola', extension: 3456, email: 'gianfranco.zola@example.com', department: 'QA' }
];


// GET DOM ELEMENTS
form = document.querySelector('#addForm');
empTable = document.querySelector('#empTable');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
document.addEventListener('DOMContentLoaded', buildGrid);


// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let id = document.querySelector('#id').value;
    let name = document.querySelector('#name').value;
    let extension = document.querySelector('#extension').value;
    let email = document.querySelector('#email').value;
    let department = document.querySelector('#department').value;


    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmployee = {
        id: id,
        name: name,
        extension: extension,
        email: email,
        department: department
    };

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    document.querySelector('#id').focus();

});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-employee') && empTable) {
        let rowIndex = e.target.parentNode.parentNode.rowIndex - 1;
        let employeeName = employees[rowIndex].name;
        if (confirm(`Are you sure you want to delete ${employeeName}?`)) {
            // Remove the employee from the array
            employees.splice(rowIndex - 1, 1);
            // Rebuild the grid
            buildGrid();
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    let tbody = document.querySelector('#empTable tbody');
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    tbody.innerHTML = '';

    // REBUILD THE TBODY FROM SCRATCH
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    for (let employee of employees) {
        let row =   `<tr>
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.extension}</td>
                        <td>${employee.email}</td>
                        <td>${employee.department}</td>
                        <td>
                            <button class="delete-employee" style="background-color: red; color: white; 
                                                            border-radius:5px; border: none; padding: 
                                                            3px 13px;">
                                <style>
                                    .delete-employee:hover {
                                        transform: scale(1.1);
                                        transition: transform 0.3s ease-in-out;
                                    }
                                </style>
                                <i class="fas fa-trash-alt"></i> x
                            </button>
                        </td>
                    </tr>`;

        tbody.innerHTML += row;
    }

    // UPDATE EMPLOYEE COUNT
    document.querySelector('#empCount').textContent = ` ( ${employees.length} )`;

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(employees));

};