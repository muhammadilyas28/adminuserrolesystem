// Create the main div element
const mainDiv = document.createElement('div');
mainDiv.classList.add('max-w-2xl', 'mx-auto');

// Create and append h1 element
const heading_main = document.createElement('h1');
heading_main.classList.add('text-2xl', 'font-bold', 'mb-4');
heading_main.innerText = 'Role and Department Management';
mainDiv.appendChild(heading_main);

// Append the main div to the body (or another container element)
document.body.appendChild(mainDiv);


// Add Role and Department Form

// Create form element
const form = document.createElement('form');
form.id = 'addRoleForm';
form.classList.add('bg-white', 'p-4', 'shadow', 'rounded', 'mb-6');

// Create div for Role input
const roleDIv1 = document.createElement('div');
roleDIv1.classList.add('mb-4');

// Create and append label for Role
const roleLabel = document.createElement('label');
roleLabel.classList.add('block', 'text-gray-700');
roleLabel.innerText = 'Role:';
roleDIv1.appendChild(roleLabel);

// Create and append input for Role
const roleInput = document.createElement('input');
roleInput.type = 'text';
roleInput.id = 'newRole';
roleInput.classList.add('mt-1', 'p-2', 'w-full', 'border', 'rounded');
roleInput.placeholder = 'Enter role name';
roleDIv1.appendChild(roleInput);

// Append Role div to form
form.appendChild(roleDIv1);

// Create div for Department input
const departmentDiv1 = document.createElement('div');
departmentDiv1.classList.add('mb-4');

// Create and append label for Department
const departmentLabel = document.createElement('label');
departmentLabel.classList.add('block', 'text-gray-700');
departmentLabel.innerText = 'Department:';
departmentDiv1.appendChild(departmentLabel);

// Create and append input for Department
const departmentInput = document.createElement('input');
departmentInput.type = 'text';
departmentInput.id = 'newDepartment';
departmentInput.classList.add('mt-1', 'p-2', 'w-full', 'border', 'rounded');
departmentInput.placeholder = 'Enter department name';
departmentDiv1.appendChild(departmentInput);

// Append Department div to form
form.appendChild(departmentDiv1);

// Create and append button
const button = document.createElement('button');
button.type = 'button';
button.onclick = function() { addRole(); };
button.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded');
button.innerText = 'Add Role and Department';
form.appendChild(button);

// Append form to body (or another container element)
document.body.appendChild(form);

// Sample addRole function
function addRole() {
    const role = document.getElementById('newRole').value;
    const department = document.getElementById('newDepartment').value;
    console.log(`Role: ${role}, Department: ${department}`);
}
// <!-- Register User Form -->

// Create form element
// const form1 = document.createElement('form');
// form1.id = 'registerForm';
// form1.classList.add('bg-white', 'p-4', 'shadow', 'rounded', 'mb-6');

// Create div for Name input
// const nameDiv = document.createElement('div');
// nameDiv.classList.add('mb-4');

// Create and append label for Name
// const nameLabel = document.createElement('label');
// nameLabel.classList.add('block', 'text-gray-700');
// nameLabel.innerText = 'Name:';
// nameDiv.appendChild(nameLabel);

// Create and append input for Name
// const nameInput = document.createElement('input');
// nameInput.type = 'text';
// nameInput.id = 'name';
// nameInput.classList.add('mt-1', 'p-2', 'w-full', 'border', 'rounded');
// nameInput.placeholder = 'Enter name';
// nameDiv.appendChild(nameInput);

// Append Name div to form
// form1.appendChild(nameDiv);

// Create div for Username input
const usernameDiv = document.createElement('div');
usernameDiv.classList.add('mb-4');

// Create and append label for Username
const usernameLabel = document.createElement('label');
usernameLabel.classList.add('block', 'text-gray-700');
usernameLabel.innerText = 'Username:';
usernameDiv.appendChild(usernameLabel);

// Create and append input for Username
const usernameInput = document.createElement('input');
usernameInput.type = 'text';
usernameInput.id = 'username';
usernameInput.classList.add('mt-1', 'p-2', 'w-full', 'border', 'rounded');
usernameInput.placeholder = 'Enter username';
usernameDiv.appendChild(usernameInput);

// Append Username div to form
form.appendChild(usernameDiv);

// Create div for Role select
const roleDiv = document.createElement('div');
roleDiv.classList.add('mb-4');

// Create and append label for Role
const roleLabel1 = document.createElement('label');
roleLabel1.classList.add('block', 'text-gray-700');
roleLabel1.innerText = 'Select Role:';
roleDiv.appendChild(roleLabel1);

// Create and append select for Role
const roleSelect = document.createElement('select');
roleSelect.id = 'roleSelect';
roleSelect.classList.add('mt-1', 'p-2', 'w-full', 'border', 'rounded');
roleDiv.appendChild(roleSelect);

// Append Role div to form
form.appendChild(roleDiv);

// Create div for Department select
const departmentDiv = document.createElement('div');
departmentDiv.classList.add('mb-4');

// Create and append label for Department
const departmentLabel1 = document.createElement('label');
departmentLabel1.classList.add('block', 'text-gray-700');
departmentLabel1.innerText = 'Select Department:';
departmentDiv.appendChild(departmentLabel1);

// Create and append select for Department
const departmentSelect = document.createElement('select');
departmentSelect.id = 'departmentSelect';
departmentSelect.classList.add('mt-1', 'p-2', 'w-full', 'border', 'rounded');
departmentDiv.appendChild(departmentSelect);

// Append Department div to form
form.appendChild(departmentDiv);

// Create and append button
const button1 = document.createElement('button');
button1.type = 'button';
button1.onclick = function() { registerUser(); };
button1.classList.add('bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded');
button1.innerText = 'Register';
form.appendChild(button1);

// Append form to body (or another container element)
// document.body.appendChild(form1);

// Sample function to populate roles and departments
function populateSelectOptions() {
    const roles = ['Admin', 'Editor', 'Viewer'];
    const departments = ['HR', 'IT', 'Finance'];

    const roleSelect = document.getElementById('roleSelect');
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role;
        option.innerText = role;
        roleSelect.appendChild(option);
    });

    const departmentSelect = document.getElementById('departmentSelect');
    departments.forEach(department => {
        const option = document.createElement('option');
        option.value = department;
        option.innerText = department;
        departmentSelect.appendChild(option);
    });
}

// Call the function to populate select options
populateSelectOptions();

// Sample registerUser function
function registerUser() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const role = document.getElementById('roleSelect').value;
    const department = document.getElementById('departmentSelect').value;
    console.log(`Name: ${name}, Username: ${username}, Role: ${role}, Department: ${department}`);
}

// ---------------------------
// --------- <!-- Login Form -->------------------
// Create form element
const form_login = document.createElement('form');
form_login.id = 'loginForm';
form_login.classList.add('bg-white', 'p-4', 'shadow', 'rounded', 'mb-6');

// Create div for Username input
const usernameDiv_1 = document.createElement('div');
usernameDiv_1.classList.add('mb-4');

// Create and append label for Username
const usernameLabel_login = document.createElement('label');
usernameLabel_login.classList.add('block', 'text-gray-700');
usernameLabel_login.innerText = 'Username:';
usernameDiv_1.appendChild(usernameLabel_login);

// Create and append input for Username
const usernameInput_login = document.createElement('input');
usernameInput_login.type = 'text';
usernameInput_login.id = 'loginUsername';
usernameInput_login.classList.add('mt-1', 'p-2', 'w-full', 'border', 'rounded');
usernameInput_login.placeholder = 'Enter username';
usernameDiv_1.appendChild(usernameInput_login);

// Append Username div to form
form_login.appendChild(usernameDiv_1);

// Create div for Role select
const roleDiv_1 = document.createElement('div');
roleDiv_1.classList.add('mb-4');

// Create and append label for Role
const roleLabel_login = document.createElement('label');
roleLabel_login.classList.add('block', 'text-gray-700');
roleLabel_login.innerText = 'Select Role:';
roleDiv_1.appendChild(roleLabel_login);

// Create and append select for Role
const roleSelect_login = document.createElement('select');
roleSelect_login.id = 'loginRoleSelect';
roleSelect_login.classList.add('mt-1', 'p-2', 'w-full', 'border', 'rounded');
roleDiv_1.appendChild(roleSelect_login);

// Append Role div to form
form_login.appendChild(roleDiv_1);

// Create div for Department select
const departmentDiv_1 = document.createElement('div');
departmentDiv_1.classList.add('mb-4');

// Create and append label for Department
const departmentLabel_login = document.createElement('label');
departmentLabel_login.classList.add('block', 'text-gray-700');
departmentLabel_login.innerText = 'Select Department:';
departmentDiv_1.appendChild(departmentLabel_login);

// Create and append select for Department
const departmentSelect_log_loginin = document.createElement('select');
departmentSelect_log_loginin.id = 'loginDepartmentSelect';
departmentSelect_log_loginin.classList.add('mt-1', 'p-2', 'w-full', 'border', 'rounded');
departmentDiv_1.appendChild(departmentSelect_log_loginin);

// Append Department div to form
form_login.appendChild(departmentDiv_1);

// Create and append login button
const button_login = document.createElement('button');
button_login.type = 'button';
button_login.onclick = function() { loginUser(); };
button_login.classList.add('bg-purple-500', 'text-white', 'px-4', 'py-2', 'rounded');
button_login.innerText = 'Login';
form_login.appendChild(button_login);

// Append form to body (or another container element)
document.body.appendChild(form_login);

// Sample loginUser function
function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const role = document.getElementById('loginRoleSelect').value;
    const department = document.getElementById('loginDepartmentSelect').value;
    console.log(`Username: ${username}, Role: ${role}, Department: ${department}`);
}

// Sample code to populate roles and departments (replace with actual data)
const roles_login = ['Admin', 'User', 'Guest'];
const departments = ['HR', 'IT', 'Sales'];

roles_login.forEach(role => {
    const option = document.createElement('option');
    option.value = role;
    option.innerText = role;
    roleSelect.appendChild(option);
});

departments.forEach(department => {
    const option = document.createElement('option');
    option.value = department;
    option.innerText = department;
    departmentSelect.appendChild(option);
});

const roles = [];
const users = [];

function addRole() {
    const role = document.getElementById('newRole').value.trim();
    const department = document.getElementById('newDepartment').value.trim();
    const exists = roles.some(r => r.role === role && r.department === department);

    if (role && department && !exists) {
        roles.push({ role, department });
         roleList.style.display='block'
        document.getElementById('newRole').value = '';
        document.getElementById('newDepartment').value = '';
        updateRoleAndDepartmentSelect();
        displayRoles();
    } else if (exists) {
        alert('This role and department combination already exists');
    } else {
        alert('Please enter both role and department names');
    }
}

function updateRoleAndDepartmentSelect() {
    const roleSelect = document.getElementById('roleSelect');
    const departmentSelect = document.getElementById('departmentSelect');
    roleSelect.innerHTML = '';
    departmentSelect.innerHTML = '';

    roles.forEach((item) => {
        const roleOption = document.createElement('option');
        roleOption.value = item.role;
        roleOption.textContent = item.role;
        roleSelect.appendChild(roleOption);

        const deptOption = document.createElement('option');
        deptOption.value = item.department;
        deptOption.textContent = item.department;
        departmentSelect.appendChild(deptOption);
    });
}

function registerUser() {
    const username = document.getElementById('username').value.trim();
    const role = document.getElementById('roleSelect').value;
    const department = document.getElementById('departmentSelect').value;
    if (username && role && department) {
        users.push({ username, role, department });
        document.getElementById('username').value = '';
        alert('User registered successfully');
    } else {
        alert('Please fill out all fields');
    }
}

function loginUser() {
    const loginUsername = document.getElementById('loginUsername').value.trim();
    const loginRole = document.getElementById('loginRoleSelect').value;
    const loginDepartment = document.getElementById('loginDepartmentSelect').value;
    const user = users.find(u => u.username === loginUsername && u.role === loginRole && u.department === loginDepartment);

    if (user) {
        alert(`Welcome ${user.username} with role ${user.role} in department ${user.department}`);
    } else {
        alert('Invalid username, role, or department');
    }
}

function displayRoles() {
    const roleList = document.getElementById('roles');
    roleList.style.display='hidden'
    roleList.innerHTML = '';
    roles.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className='flex flex-col gap-5 justify-satrt bg-blue-100 border-2 border-purple-300 p-2 rounded-xl'
        listItem.textContent = `${item.role} - ${item.department}`;
        listItem.appendChild(CreateTag("br"))
        listItem.appendChild(createEditButton(index));
        listItem.appendChild(createDeleteButton(index));
        roleList.appendChild(listItem);
    });
}
function CreateTag(tag="div", innerText=null, classList="", clickFun=null) {
    const divElement = document.createElement(tag);
    
    if(innerText!= null)
    {
        divElement.textContent = innerText;
        divElement.className = classList;
    }
    if(clickFun!=null)
    {
        divElement.onclick = () => clickFun;
    }
    return divElement;
}
function createEditButton(index) {
    const editButton = document.createElement('button');
    
    editButton.textContent = 'Edit';
    editButton.className = 'ml-2 bg-white text-blue-500 p-1 rounded-xl';
    editButton.onclick = () => editRole(index);
    return editButton;
}

function createDeleteButton(index) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'ml-2 bg-green-300 text-red-500 p-1 rounded-xl';
    deleteButton.onclick = () => deleteRole(index);
    return deleteButton;
}

function editRole(index) {
    const role = prompt('Edit Role:', roles[index].role);
    const department = prompt('Edit Department:', roles[index].department);
    if (role && department) {
        const exists = roles.some((r, i) => r.role === role && r.department === department && i !== index);
        if (!exists) {
            roles[index] = { role, department };
            updateRoleAndDepartmentSelect();
            displayRoles();
        } else {
            alert('This role and department combination already exists');
        }
    }
}

function deleteRole(index) {
    roles.splice(index, 1);
    updateRoleAndDepartmentSelect();
    displayRoles();
}

function populateLoginOptions() {
    const loginRoleSelect = document.getElementById('loginRoleSelect');
    const loginDepartmentSelect = document.getElementById('loginDepartmentSelect');
    loginRoleSelect.innerHTML = '';
    loginDepartmentSelect.innerHTML = '';
    const loginUsername = document.getElementById('loginUsername').value.trim();
    const userRoles = users.filter(u => u.username === loginUsername);

    userRoles.forEach((user) => {
        const roleOption = document.createElement('option');
        roleOption.value = user.role;
        roleOption.textContent = user.role;
        loginRoleSelect.appendChild(roleOption);

        const deptOption = document.createElement('option');
        deptOption.value = user.department;
        deptOption.textContent = user.department;
        loginDepartmentSelect.appendChild(deptOption);
    });
}

document.getElementById('loginUsername').addEventListener('input', populateLoginOptions);

// <!-- Role and Department List -->

// Create the main div element
const roleListDiv = document.createElement('div');
roleListDiv.id = 'roleList';
roleListDiv.classList.add('bg-white', 'p-4', 'shadow', 'rounded');

// Create and append h2 element
const heading = document.createElement('h2');
heading.classList.add('text-xl', 'font-bold', 'mb-2');
heading.innerText = 'Available Roles and Departments';
roleListDiv.appendChild(heading);

// Create and append ul element
const ul = document.createElement('ul');
ul.id = 'roles';
ul.classList.add('list-disc', 'pl-5', 'bg-blue-200', 'w-36', 'flex', 'flex-col', 'gap-3', 'p-4', 'rounded-xl', 'border-2', 'border-purple-600');
roleListDiv.appendChild(ul);

// Append the main div to the body (or another container element)
document.body.appendChild(roleListDiv);

// Sample code to populate roles and departments (replace with actual data)
const rolesAndDepartments = [
    'Admin - IT',
    'User - Sales',
    'Guest - HR'
];

rolesAndDepartments.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    ul.appendChild(li);
});
