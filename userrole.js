// Define a variable to track registered users
const registeredUsers = [];
// After defining roles and departments
const roles = [];

let db;

const indexedDBRequest = window.indexedDB.open('YourDatabaseName', 1);

indexedDBRequest.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Create object store for roles
    const roleStore = db.createObjectStore('roles', { keyPath: 'id', autoIncrement: true });
    roleStore.createIndex('role', 'role', { unique: false });
    roleStore.createIndex('department', 'department', { unique: false });

    // Create object store for users
    const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    userStore.createIndex('username', 'username', { unique: false });
    userStore.createIndex('role', 'role', { unique: false });
    userStore.createIndex('department', 'department', { unique: false });
    userStore.createIndex('uniqueCombination', ['username', 'role', 'department'], { unique: true });
};

indexedDBRequest.onsuccess = function(event) {
    db = event.target.result;
};

indexedDBRequest.onerror = function(event) {
    console.error('Error opening IndexedDB:', event.target.error);
};

// Function to create and append an element with given options
function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    for (const key in options) {
        if (key === 'classList') {
            element.classList.add(...options[key]);
        } else if (key === 'text') {
            element.textContent = options[key];
        } else {
            element[key] = options[key];
        }
    }
    return element;
}

// Function to create the main div element
function createMainDiv() {
    const mainDiv = createElement('div', {
        classList: ['max-w-2xl', 'mx-auto']
    });

    // Create and append h1 element
    const heading_main = createElement('h1', {
        classList: ['text-2xl', 'font-bold', 'mb-4'],
        text: 'Role and Department Management'
    });
    mainDiv.appendChild(heading_main);

    return mainDiv;
}

// Function to handle adding a role and department
function addRoleAndDepartment() {
    const newRoleInput = document.getElementById('newRole');
    const newDepartmentInput = document.getElementById('newDepartment');

    const newRole = newRoleInput.value.trim();
    const newDepartment = newDepartmentInput.value.trim();

    // Validate inputs
    if (!newRole || !newDepartment) {
        alert('Please enter both role and department.');
        return;
    }

    // Check for duplicates
    const existingRole = roles.find(role => role.role === newRole && role.department === newDepartment);
    if (existingRole) {
        alert(`Role "${newRole}" in Department "${newDepartment}" already exists.`);
        return;
    }

    // Add role and department to roles array
    roles.push({ role: newRole, department: newDepartment });
    // Add role and department to IndexedDB
    const transaction = db.transaction(['roles'], 'readwrite');
    const roleStore = transaction.objectStore('roles');
    roleStore.add({ role: newRole, department: newDepartment });

    transaction.oncomplete = function() {
        console.log('Role and department added to IndexedDB.');
    };

    transaction.onerror = function(event) {
        console.error('Error adding role and department:', event.target.error);
    };

    // Update select options
    populateSelectOptions();

    // Clear inputs
    newRoleInput.value = '';
    newDepartmentInput.value = '';

    // Show success message (popup message)
    alert(`Role "${newRole}" in Department "${newDepartment}" added successfully.`);
}

// Function to create the add role form
function createAddRoleForm() {
    const form = createElement('form', {
        id: 'addRoleForm',
        classList: ['bg-white', 'p-4', 'shadow', 'rounded', 'mb-6']
    });

    // Create role input
    const roleDIv1 = createElement('div', { classList: ['mb-4'] });
    roleDIv1.appendChild(createElement('label', {
        classList: ['block', 'text-gray-700'],
        text: 'Role:'
    }));
    roleDIv1.appendChild(createElement('input', {
        type: 'text',
        id: 'newRole',
        classList: ['mt-1', 'p-2', 'w-full', 'border', 'rounded'],
        placeholder: 'Enter role'
    }));
    form.appendChild(roleDIv1);

    // Create department input
    const departmentDiv1 = createElement('div', { classList: ['mb-4'] });
    departmentDiv1.appendChild(createElement('label', {
        classList: ['block', 'text-gray-700'],
        text: 'Department:'
    }));
    departmentDiv1.appendChild(createElement('input', {
        type: 'text',
        id: 'newDepartment',
        classList: ['mt-1', 'p-2', 'w-full', 'border', 'rounded'],
        placeholder: 'Enter department'
    }));
    form.appendChild(departmentDiv1);

    // Create button
    const button = createElement('button', {
        type: 'button',
        classList: ['bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded'],
        text: 'Add Role and Department'
    });
    button.addEventListener('click', addRoleAndDepartment); // Attach click event handler
    form.appendChild(button);

    return form;
}
// Function to update the role and department list
function updateRoleAndDepartmentList() {
    const roleList = document.getElementById('roles');
    roleList.innerHTML = ''; // Clear previous list

    registeredUsers.forEach(user => {
        const li = createElement('li', {
            text: `Username: ${user.username}, Role: ${user.role}, Department: ${user.department}`,
            classList: ['text-sm']
        });
        roleList.appendChild(li);
    });

    // Optionally, show an alert or console log
    console.log('Role and department list updated.');
}

// Function to handle registering a user
function registerUser() {
    const usernameInput = document.getElementById('username');
    const roleSelect = document.getElementById('roleSelect');
    const departmentSelect = document.getElementById('departmentSelect');

    const username = usernameInput.value.trim();
    const role = roleSelect.value;
    const department = departmentSelect.value;

    // Validate inputs
    if (!username || !role || !department) {
        alert('Please fill in all fields.');
        return;
    }

    // Check for duplicate username, role, and department combination
    const existingUser = registeredUsers.find(user => user.username === username && user.role === role && user.department === department);
    if (existingUser) {
        alert(`Username "${username}" with Role "${role}" in Department "${department}" is already registered.`);
        return;
    }

    // Register the user
    registeredUsers.push({ username, role, department });

    // Update the display
    updateRoleAndDepartmentList();

    // Clear inputs
    usernameInput.value = '';
    roleSelect.selectedIndex = 0;
    departmentSelect.selectedIndex = 0;

    // Register the user and add to IndexedDB
    const transaction = db.transaction(['users'], 'readwrite');
    const userStore = transaction.objectStore('users');
    userStore.add({ username, role, department, uniqueCombination: `${username}-${role}-${department}` });

    transaction.oncomplete = function() {
        console.log('User registered and added to IndexedDB.');
    };

    transaction.onerror = function(event) {
        console.error('Error registering user:', event.target.error);
    };

    // Show success message
    alert(`User "${username}" registered successfully with Role "${role}" in Department "${department}".`);
}

// Function to create the register user form
function createRegisterUserForm() {
    const form = createElement('form', {
        id: 'registerUserForm',
        classList: ['bg-white', 'p-4', 'shadow', 'rounded', 'mb-6']
    });

    // Create username input
    form.appendChild(createElement('div', { classList: ['mb-4'] }));
    form.querySelector('div').appendChild(createElement('label', {
        classList: ['block', 'text-gray-700'],
        text: 'Username:'
    }));
    form.querySelector('div').appendChild(createElement('input', {
        type: 'text',
        id: 'username',
        classList: ['mt-1', 'p-2', 'w-full', 'border', 'rounded'],
        placeholder: 'Enter username'
    }));

    // Create role select
    const roleDiv = createElement('div', { classList: ['mb-4'] });
    roleDiv.appendChild(createElement('label', {
        classList: ['block', 'text-gray-700'],
        text: 'Select Role:'
    }));
    const roleSelect = createElement('select', {
        id: 'roleSelect',
        classList: ['mt-1', 'p-2', 'w-full', 'border', 'rounded']
    });
    roleDiv.appendChild(roleSelect);
    form.appendChild(roleDiv);

    // Create department select
    const departmentDiv = createElement('div', { classList: ['mb-4'] });
    departmentDiv.appendChild(createElement('label', {
        classList: ['block', 'text-gray-700'],
        text: 'Select Department:'
    }));
    const departmentSelect = createElement('select', {
        id: 'departmentSelect',
        classList: ['mt-1', 'p-2', 'w-full', 'border', 'rounded']
    });
    departmentDiv.appendChild(departmentSelect);
    form.appendChild(departmentDiv);

    // Create button
    const button = createElement('button', {
        type: 'button',
        classList: ['bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded'],
        text: 'Register User'
    });
    button.addEventListener('click', registerUser); // Attach click event handler
    form.appendChild(button);

    return form;
}

// Function to populate select options
function populateSelectOptions() {
    const roleSelect = document.getElementById('roleSelect');
    const departmentSelect = document.getElementById('departmentSelect');

    // Clear existing options
    roleSelect.innerHTML = '';
    departmentSelect.innerHTML = '';

    // Populate role options
    roles.forEach(role => {
        const option = createElement('option', {
            value: role.role,
            text: role.role
        });
        roleSelect.appendChild(option);
    });

    // Populate department options
    roles.forEach(role => {
        const option = createElement('option', {
            value: role.department,
            text: role.department
        });
        departmentSelect.appendChild(option);
    });
}

// Function to initialize the page
function initializePage() {
    const mainDiv = createMainDiv();
    document.body.appendChild(mainDiv);

    // Append add role form
    mainDiv.appendChild(createAddRoleForm());

    // Create and append the registered users display list
    const registeredUsersDiv = createElement('div', { classList: ['bg-white', 'p-4', 'shadow', 'rounded', 'mb-6'] });
    registeredUsersDiv.appendChild(createElement('h2', {
        classList: ['text-xl', 'font-bold', 'mb-4'],
        text: 'Registered Users'
    }));
    registeredUsersDiv.appendChild(createElement('ul', { id: 'roles', classList: ['list-disc', 'list-inside'] }));
    mainDiv.appendChild(registeredUsersDiv);

    // Append register user form
    mainDiv.appendChild(createRegisterUserForm());

    // Fetch existing roles from IndexedDB and populate options
    const transaction = db.transaction(['roles'], 'readonly');
    const roleStore = transaction.objectStore('roles');
    const request = roleStore.getAll();

    request.onsuccess = function(event) {
        const rolesFromDB = event.target.result;
        roles.push(...rolesFromDB);
        populateSelectOptions();
    };

    request.onerror = function(event) {
        console.error('Error fetching roles from IndexedDB:', event.target.error);
    };
}

// Initialize the page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);
