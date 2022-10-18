let url = '/rest/user'


makeUserView().then(() => console.log('getUser'))

const navbarUserInfo = document.getElementById('navbarUserInfo')
const userInfo = document.getElementById('userInfo')
const sidebarAdminButton = document.getElementById('sidebarAdminButton')

async function makeUserView() {
    let response = await fetch(url)
    if (response.ok) {
        await response.json()
            .then(userJson => {
                let roles = ''
                userJson.roles.forEach(role => roles += role.name.substring(5) + " ")

                navbarUserInfo.innerHTML = `
                    <span class="fw-bold">${userJson.username}</span>
                    &nbsp with roles: &nbsp
                    <span>${roles}</span>
                    <span class="me-auto"></span>
                    <form action="/logout" method="POST">
                        <a onclick="this.closest('form').submit();return false;" class="nav-link" role="button">Logout</a>
                        <input type="submit" hidden/>
                    </form>`

                if (roles.includes('ADMIN')) {
                    sidebarAdminButton.innerHTML = `
                    <a class="nav-link" href="/admin">Admin</a>`
                }

                userInfo.innerHTML = `
                    <tr>
                        <td>${userJson.id}</td>
                        <td>${userJson.firstName}</td>
                        <td>${userJson.lastName}</td>
                        <td>${userJson.age}</td>
                        <td>${userJson.email}</td>
                        <td>${roles}</td>
                    </tr>
                    `
            })

    } else {
        alert("Response status: " + response.status)
    }
}
