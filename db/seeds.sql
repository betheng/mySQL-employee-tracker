-- places initial department names into db
INSERT INTO department
    (name)
VALUES
    ('Development'),
    ('Quality Assurance'),
    ('Design'),
    ('Project Management'),
    ('Data and Analytics');

-- places initial employer roles into db
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Software Engineer L1', 85000, 1),
    ('Software Engineer L2', 100000, 1),
    ('Software Engineer L3', 125000, 1),
    ('QA Engineer', 95000, 2),
    ('Automation Tester', 120000, 2),
    ('Quality Analyst L1', 75000, 2),
    ('UX/UI Designer', 75000, 3),
    ('Interaction Graphic Designer', 85000, 3),
    ('Scrum Master', 95000, 4),
    ('Product Owner', 120000, 4),
    ('Data Scientist', 195000, 5),
    ('Data Analyst', 95000, 5);

-- places initial employee names into db
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Beth', 'Eng', 1, 3),
    ('John', 'Robertson', 1, 1),
    ('Noah', 'Johnson', 3, 2),
    ('Madame', 'Currycat', 4, 1),
    ('Dottie', 'Kittenschtein', 5, 1);