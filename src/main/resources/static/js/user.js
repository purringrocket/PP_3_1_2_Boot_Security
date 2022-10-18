let url = '/rest/user'
getUser().then(() => console.log('getUser'))

const userInfo = document.getElementById('userInfo')

async function getUser() {
    let response = await fetch(url)
    if (response.ok) {
        let html = ''
        await response.json()
            .then(userJson => {
                let roles = ''
                userJson.roles.forEach(role => roles += role.name.substring(5) + " ")
                html += `
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
        userInfo.innerHTML = html;
        console.log("user fetched")
    } else {
        alert("Response status: " + response.status)
    }
}
