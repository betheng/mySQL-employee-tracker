const inquirer = require('inquirer');
const db = require('./db/connection');

const employee_tracker = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: [
                'View All Department', 
                'View All Roles', 
                'View All Employees', 
                'Add A Department', 
                'Add A Role', 
                'Add An Employee', 
                'Update An Employee Role', 
                'Log Out'
            ]
        }
    ]).then(handleUserChoice);
};

const handleUserChoice = (answers) => {
    switch (answers.prompt) {
        case 'View All Department':
            viewAll('department');
            break;
        case 'View All Roles':
            viewAll('role');
            break;
        case 'View All Employees':
            viewAll('employee');
            break;
        case 'Add A Department':
            addDepartment();
            break;
        case 'Add A Role':
            addRole();
            break;
        case 'Add An Employee':
            addEmployee();
            break;
        case 'Update An Employee Role':
            updateEmployeeRole();
            break;
        case 'Log Out':
            db.end();
            console.log("Logged out. Have a nice day!");
            break;
    }
};

const viewAll = (table) => {
    db.query(`SELECT * FROM ${table}`, (err, result) => {
        if (err) throw err;
        console.log(`Viewing All ${table}s: `);
        console.table(result);
        employee_tracker();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?',
            validate: departmentInput => departmentInput ? true : 'Please Add A Department!'
        }
    ]).then(answers => {
        db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
            if (err) throw err;
            console.log(`Added ${answers.department} to the database.`);
            employee_tracker();
        });
    });
};

const addRole = () => {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What is the name of the role?',
                validate: roleInput => roleInput ? true : 'Please Add A Role!'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
                validate: salaryInput => salaryInput ? true : 'Please Add A Salary!'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: result.map(row => row.name)
            }
        ]).then(answers => {
            const department = result.find(row => row.name === answers.department);

            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
                [answers.role, answers.salary, department.id], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.role} to the database.`);
                    employee_tracker();
                });
        });
    });
};

// Starts the app
db.connect(err => {
    if (err) throw err;
    console.log('Database connected successfully!');
    employee_tracker();
});
