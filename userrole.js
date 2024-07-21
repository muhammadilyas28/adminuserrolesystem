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
    userStore.createIndex('username', 'username', { unique: true });
    userStore.createIndex('role', 'role', { unique: false });
    userStore.createIndex('department', 'department', { unique: false });
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

    // Check for duplicate username (optional)
    const existingUser = registeredUsers.find(user => user.username === username);
    if (existingUser) {
        alert(`Username "${username}" is already registered.`);
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
    userStore.add({ username, role, department });

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

    // Create register button
    const button = createElement('button', {
        type: 'button',
        classList: ['bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded'],
        text: 'Register'
    });
    button.onclick = registerUser;
    form.appendChild(button);

    return form;
}

// Function to create the login form
function createLoginForm() {
    const form = createElement('form', {
        id: 'loginForm',
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
        id: 'loginUsername',
        classList: ['mt-1', 'p-2', 'w-full', 'border', 'rounded'],
        placeholder: 'Enter username'
    }));

    // Create role select
    const roleDiv = createElement('div', { classList: ['mb-4'] });
    roleDiv.appendChild(createElement('label', {
        classList: ['block', 'text-gray-700'],
        text: 'Select Role:'
    }));
    const loginRoleSelect = createElement('select', {
        id: 'loginRoleSelect',
        classList: ['mt-1', 'p-2', 'w-full', 'border', 'rounded']
    });
    roleDiv.appendChild(loginRoleSelect);
    form.appendChild(roleDiv);

    // Create department select
    const departmentDiv = createElement('div', { classList: ['mb-4'] });
    departmentDiv.appendChild(createElement('label', {
        classList: ['block', 'text-gray-700'],
        text: 'Select Department:'
    }));
    const loginDepartmentSelect = createElement('select', {
        id: 'loginDepartmentSelect',
        classList: ['mt-1', 'p-2', 'w-full', 'border', 'rounded']
    });
    departmentDiv.appendChild(loginDepartmentSelect);
    form.appendChild(departmentDiv);

    // Create login button
    const button = createElement('button', {
        type: 'button',
        classList: ['bg-purple-500', 'text-white', 'px-4', 'py-2', 'rounded'],
        text: 'Login'
    });
    button.addEventListener('click', loginUser); // Attach click event handler
    form.appendChild(button);

    return form;
}

// Function to create the role and department list
function createRoleAndDepartmentList() {
    const roleListDiv = createElement('div', {
        id: 'roleList',
        classList: ['bg-white', 'p-4', 'shadow', 'rounded']
    });

    // Create h2 element
    roleListDiv.appendChild(createElement('h2', {
        classList: ['text-xl', 'font-bold', 'mb-2'],
        text: 'Available Roles and Departments'
    }));

    // Create ul element
    const ul = createElement('ul', {
        id: 'roles',
        classList: ['list-disc', 'pl-5', 'bg-blue-200', 'w-36', 'flex', 'flex-col', 'gap-3', 'p-4', 'rounded-xl', 'border-2', 'border-purple-600']
    });
    roleListDiv.appendChild(ul);

    return roleListDiv;
}

// Function to simulate login process
function loginUser() {
    const username = document.getElementById('loginUsername').value.trim();
    const role = document.getElementById('loginRoleSelect').value;
    const department = document.getElementById('loginDepartmentSelect').value;

    // Validate inputs
    if (!username || !role || !department) {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate a basic login check (replace with actual authentication logic)
    // For demonstration, we'll just show an alert with the login details.
    alert(`Login successful!\nUsername: ${username}\nRole: ${role}\nDepartment: ${department}`);

    // Clear inputs (optional)
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginRoleSelect').selectedIndex = 0; // Reset role select to default
    document.getElementById('loginDepartmentSelect').selectedIndex = 0; // Reset department select to default
}

// Function to populate role and department select options
function populateSelectOptions() {
    const roleSelect = document.getElementById('roleSelect');
    const departmentSelect = document.getElementById('departmentSelect');
    const loginRoleSelect = document.getElementById('loginRoleSelect');
    const loginDepartmentSelect = document.getElementById('loginDepartmentSelect');

    // // Clear existing options
    // roleSelect.innerHTML = '';
    // departmentSelect.innerHTML = '';
    // loginRoleSelect.innerHTML = '';
    // loginDepartmentSelect.innerHTML = '';

    // Populate role options
    roles.forEach(role => {
        const option = document.createElement('option');
        option.text = `${role.role} (${role.department})`;
        option.value = role.role; // You can set the value to the role name or ID
        roleSelect.add(option.cloneNode(true));

        const loginOption = document.createElement('option');
        loginOption.text = `${role.role} (${role.department})`;
        loginOption.value = role.role; // You can set the value to the role name or ID
        loginRoleSelect.add(loginOption.cloneNode(true));
    });

    // Populate department options
    const departments = [...new Set(roles.map(role => role.department))]; // Get unique departments
    departments.forEach(department => {
        const option = document.createElement('option');
        option.text = department;
        option.value = department; // You can set the value to the department name or ID
        departmentSelect.add(option.cloneNode(true));

        const loginOption = document.createElement('option');
        loginOption.text = department;
        loginOption.value = department; // You can set the value to the department name or ID
        loginDepartmentSelect.add(loginOption.cloneNode(true));
    });
}

// Function to initialize the app
export function initializeapp() {
    const mainDiv = createMainDiv();
    const addRoleForm = createAddRoleForm();
    const registerUserForm = createRegisterUserForm();
    const loginForm = createLoginForm(); // Adjusted to include event handling for login
    const roleListDiv = createRoleAndDepartmentList();

    const bodyDiv=document.createElement('div')
    // Append elements to body (or container element)
    bodyDiv.appendChild(mainDiv);
    bodyDiv.appendChild(addRoleForm);
    bodyDiv.appendChild(registerUserForm);
    bodyDiv.appendChild(loginForm);
    bodyDiv.appendChild(roleListDiv);

    // Populate roles with data
    populateSelectOptions();
    return bodyDiv
}

// Call initializeApp to start the application
initializeapp();
