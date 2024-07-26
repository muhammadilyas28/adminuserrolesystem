// Activity Log

// 1. Initialization and Setup
// Open IndexedDB database named 'YourDatabaseName' with version 1
const indexedDBRequest = window.indexedDB.open('YourDatabaseName', 1);

// Event handler for database version upgrade or creation
indexedDBRequest.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Create object store for roles
    const roleStore = db.createObjectStore('roles', { keyPath: 'id', autoIncrement: true });
    roleStore.createIndex('role', 'role', { unique: false });
    roleStore.createIndex('department', 'department', { unique: false });

    // Create object store for users
    const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    userStore.createIndex('username', 'username', { unique: true });
    userStore.createIndex('role', 'role', { unique: false });
    userStore.createIndex('department', 'department', { unique: false });
};

// Success handler for opening IndexedDB
indexedDBRequest.onsuccess = function(event) {
    db = event.target.result;
    initializeApp(); // Initialize the app after successfully opening the DB
};

// Error handler for opening IndexedDB
indexedDBRequest.onerror = function(event) {
    console.error('Error opening IndexedDB:', event.target.error);
};

// 2. UI Elements Creation
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

// 3. Role and Department Management
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
        populateSelectOptions(); // Update select options after transaction completion
    };

    transaction.onerror = function(event) {
        console.error('Error adding role and department:', event.target.error);
    };

    // Clear inputs
    newRoleInput.value = '';
    newDepartmentInput.value = '';

    // Show success message
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

    console.log('Role and department list updated.');
}

// 4. User Registration
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

    // Check for duplicate username (optional)
    const existingUser = registeredUsers.find(user => user.username === username && user.role === role && user.department === department);
    if (existingUser) {
        alert(`User "${username}" with Role "${role}" in Department "${department}" is already registered.`);
        return;
    }

    // Register the user
    registeredUsers.push({ username, role, department });

    // Register the user and add to IndexedDB
    const transaction = db.transaction(['users'], 'readwrite');
    const userStore = transaction.objectStore('users');
    userStore.add({ username, role, department });

    transaction.oncomplete = function() {
        console.log('User registered and added to IndexedDB.');
        updateRoleAndDepartmentList(); // Update the display after transaction completion
    };

    transaction.onerror = function(event) {
        console.error('Error registering user:', event.target.error);
    };

    // Clear inputs
    usernameInput.value = '';
    roleSelect.selectedIndex = 0;
    departmentSelect.selectedIndex = 0;

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
    const usernameDiv = createElement('div', { classList: ['mb-4'] });
    usernameDiv.appendChild(createElement('label', {
        classList: ['block', 'text-gray-700'],
        text: 'Username:'
    }));
    usernameDiv.appendChild(createElement('input', {
        type: 'text',
        id: 'username',
        classList: ['mt-1', 'p-2', 'w-full', 'border', 'rounded'],
        placeholder: 'Enter username'
    }));
    form.appendChild(usernameDiv);

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

// 5. Data Population and UI Updates
// Function to populate select options for roles and departments
function populateSelectOptions() {
    const roleSelect = document.getElementById('roleSelect');
    const departmentSelect = document.getElementById('departmentSelect');

    roleSelect.innerHTML = ''; // Clear previous options
    departmentSelect.innerHTML = ''; // Clear previous options

    roles.forEach(role => {
        const option = createElement('option', {
            value: role.role,
            text: role.role
        });
        roleSelect.appendChild(option);
    });

    const departments = [...new Set(roles.map(role => role.department))]; // Get unique departments
    departments.forEach(department => {
        const option = createElement('option', {
            value: department,
            text: department
        });
        departmentSelect.appendChild(option);
    });
}

// Function to initialize the application
function initializeApp() {
    // Load roles and users from IndexedDB
    const transaction = db.transaction(['roles', 'users'], 'readonly');
    const roleStore = transaction.objectStore('roles');
    const userStore = transaction.objectStore('users');

    roleStore.getAll().onsuccess = function(event) {
        roles = event.target.result || [];
        populateSelectOptions(); // Populate select options after loading roles
    };

    userStore.getAll().onsuccess = function(event) {
        registeredUsers = event.target.result || [];
        updateRoleAndDepartmentList(); // Update role and department list after loading users
    };
}

// Main function to initialize the app
function main() {
    const mainDiv = createMainDiv();
    document.body.appendChild(mainDiv);

    const addRoleForm = createAddRoleForm();
    mainDiv.appendChild(addRoleForm);

    const registerUserForm = createRegisterUserForm();
    mainDiv.appendChild(registerUserForm);

    const roleListContainer = createElement('div', {
        classList: ['bg-white', 'p-4', 'shadow', 'rounded', 'mb-6']
    });
    roleListContainer.appendChild(createElement('h2', {
        classList: ['text-xl', 'font-bold', 'mb-4'],
        text: 'Registered Users'
    }));
    const roleList = createElement('ul', { id: 'roles' });
    roleListContainer.appendChild(roleList);
    mainDiv.appendChild(roleListContainer);
}

main(); // Call the main function
