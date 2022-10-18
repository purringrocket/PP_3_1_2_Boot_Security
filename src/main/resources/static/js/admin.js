let url = "/rest/admin/users/"

document.getElementById("addNewUserButton").addEventListener("click", addNewUser)
document.getElementById("users-tab-button").addEventListener("click", makeUsersTable)

makeUsersTable().then(r => console.log(r))

async function makeUsersTable() {
    console.log('makeUsersTable')
    let response = await fetch(url)
    if (response.ok) {
        document.getElementById('usersInfoTable').innerHTML = ''
        let usersTableHtml = ''
        response.json()
            .then(usersJson => {
                usersJson.forEach(user => {
                    //console.log(user)
                    let roles = ''
                    user.roles.forEach(role => roles += role.name.substring(5) + " ")
                    usersTableHtml = `
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${roles}</td>
                        <td>                            
                            <button class="btn btn-info" type="button" id='editButton${user.id}' data-bs-toggle="modal" data-bs-target="#modalTemplate">Edit</button>
                        </td>
                        <td>                            
                            <button class="btn btn-danger" type="button" id='deleteButton${user.id}' data-bs-toggle="modal" data-bs-target="#modalTemplate">Delete</button>
                        </td>`
                    // document.getElementById('editButton' + user.id).addEventListener('click', )
                    let trNode = document.createElement("tr")
                    trNode.innerHTML = usersTableHtml
                    document.getElementById('usersInfoTable').append(trNode)
                    document.getElementById('deleteButton' + user.id).addEventListener('click', function () {
                        makeModalForUserDeletion(user.id)
                    })
                    document.getElementById('editButton' + user.id).addEventListener('click', function () {
                        makeModalForUserEdit(user.id)
                    })
                })
            })
    } else {
        alert("Response status: " + response.status)
    }
}

const dbRoles = [
    {id: 1, name: "ROLE_USER"},
    {id: 2, name: "ROLE_ADMIN"}
]

function addNewUser() {
    console.log('addNewUser 1')
    let username = document.getElementById("newUserUsername").value
    let password = document.getElementById("newUserPassword").value
    let firstName = document.getElementById("newUserFirstName").value
    let lastName = document.getElementById("newUserLastName").value
    let age = document.getElementById("newUserAge").value
    let email = document.getElementById("newUserEmail").value
    let roles = []
    Array.from(document.getElementById("newUserRolesSelect").selectedOptions).forEach(opt => {
        dbRoles.forEach(role => {
            if (role.name === opt.text) {
                roles.push(role)
            }
        })
    })

    let newUser = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        roles: roles
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
    }).then(r => alert('User created. Response: ' + r))
}


// Modals generation
const modalHeadTitle = document.getElementById('modalHeadTitle')
const modalInputs = document.getElementById('modalInputs')
const modalBottomButtons = document.getElementById('modalBottomButtons')

async function makeModalForUserDeletion(userId) {
    let response = await fetch(url + userId)
    if (response.ok) {
        response.json().then(userJson => {
            modalHeadTitle.innerText = 'Delete user: ID = ' + userJson.id
            modalInputs.innerHTML = `
                <div class="form-group">
                    <label class="form-label fw-bold" for="userIdInputDel">ID</label>
                    <input class="form-control" id="userIdInputDel" type="text" value="${userJson.id}" disabled>
                </div>

                <label class="form-label fw-bold pt-3" for="firstNameInputDel">First name</label>
                <input class="form-control" id="firstNameInputDel" type="text" value="${userJson.firstName}" disabled>

                <label class="form-label fw-bold pt-3" for="lastNameInputDel">Last name</label>
                <input class="form-control" id="lastNameInputDel" type="text" value="${userJson.lastName}" disabled>

                <label class="form-label fw-bold pt-3" for="ageInputDel">Age</label>
                <input class="form-control" id="ageInputDel" type="text" value="${userJson.age}" disabled>

                <label class="form-label fw-bold pt-3" for="emailInputDel">Email</label>
                <input class="form-control" id="emailInputDel" type="text" value="${userJson.email}" disabled>

                <label class="form-label fw-bold pt-3" for="passwordInputDel">Password</label>
                <input class="form-control" id="passwordInputDel" type="text" value="${userJson.password}" disabled>

                <label class="form-label fw-bold pt-3" for="rolesSelectDel">Roles</label>
                <select class="form-select form-select-sm" id="rolesSelectDel" multiple disabled>
                    <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>>
                    <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>>                
                </select>`

            modalBottomButtons.innerHTML = `
                <a class="btn btn-light" data-bs-dismiss="modal" role="button">Close</a>
                <a class="btn btn-danger" id="modalDeleteButton" data-bs-dismiss="modal" role="button">Delete</a>`
            document.getElementById('modalDeleteButton').addEventListener('click', function () {
                deleteUserById(userJson.id)
            })

        })
    } else {
        alert("Response status: " + response.status)
    }
}

async function deleteUserById(userId) {
    await fetch(url + userId,{
        method: 'DELETE'
    })
        .then(r => alert('User with id:' + userId + ' deleted' + r))
    await makeUsersTable().then()
}

async function makeModalForUserEdit(userId) {
    let response = await fetch(url + userId)
    if (response.ok) {
        response.json().then(userJson => {
            modalHeadTitle.innerText = 'Editing user: ID = ' + userJson.id
            modalInputs.innerHTML = `
                <div class="form-group">
                    <label class="form-label fw-bold" for="userIdInput">ID</label>
                    <input class="form-control" id="userIdInput" type="text" value="${userJson.id}" disabled>
                </div>

                <label class="form-label fw-bold pt-3" for="firstNameInput">First name</label>
                <input class="form-control" id="firstNameInput" type="text" value="${userJson.firstName}">

                <label class="form-label fw-bold pt-3" for="lastNameInput">Last name</label>
                <input class="form-control" id="lastNameInput" type="text" value="${userJson.lastName}">

                <label class="form-label fw-bold pt-3" for="ageInput">Age</label>
                <input class="form-control" id="ageInput" type="text" value="${userJson.age}">

                <label class="form-label fw-bold pt-3" for="emailInput">Email</label>
                <input class="form-control" id="emailInput" type="text" value="${userJson.email}">

                <label class="form-label fw-bold pt-3" for="passwordInput">Password</label>
                <input class="form-control" id="passwordInput" type="text" value="${userJson.password}">

                <label class="form-label fw-bold pt-3" for="rolesSelect">Roles</label>
                <select class="form-select form-select-sm" id="rolesSelect" multiple>
                    <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>>
                    <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>>                
                </select>`

            Array.from(document.getElementById("rolesSelect").options).forEach(opt => {
                userJson.roles.forEach(role => {
                    if (role.name === opt.text) {
                        opt.selected = true
                    }
                })
            })

            modalBottomButtons.innerHTML = `             
                <a class="btn btn-light" data-bs-dismiss="modal" role="button">Close</a>   
                <a class="btn btn-danger" id="modalEditButton" data-bs-dismiss="modal" role="button">Edit</a>`

            document.getElementById('modalEditButton').addEventListener('click', function () {
                userJson.firstName = document.getElementById('firstNameInput').value
                userJson.lastName = document.getElementById('lastNameInput').value
                userJson.age = document.getElementById('ageInput').value
                userJson.email = document.getElementById('emailInput').value
                userJson.password = document.getElementById('passwordInput').value
                let roles = []
                Array.from(document.getElementById("rolesSelect").selectedOptions).forEach(opt => {
                    dbRoles.forEach(role => {
                        if (role.name === opt.text) {
                            roles.push(role)
                        }
                    })
                })
                userJson.roles = roles
                patchUser(userJson)
            })

        })
    } else {
        alert("Response status: " + response.status)
    }
}

async function patchUser(userJson) {
    await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(userJson)
    }).then(r => console.log('User with id:' + userJson.id + ' updated' + r.status))
    await makeUsersTable().then()
}