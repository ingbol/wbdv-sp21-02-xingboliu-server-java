var $tableRows
var $createBtn
var $updateBtn

var $usernameFld
var $passwordFld
var $firstNameFld
var $lastNameFld
var $roleFld

var adminUserService = new AdminUserServiceClient()

var users = [
    {username: "alice1", password: "123456", firstName: "Alice", lastName: "Wang", role: "STUDENT"},
    {username: "alice2", password: "123456", firstName: "Alice", lastName: "Wang", role: "STUDENT"},
    {username: "alice3", password: "123456", firstName: "Alice", lastName: "Wang", role: "STUDENT"},
    {username: "alice4", password: "123456", firstName: "Alice", lastName: "Wang", role: "STUDENT"},
    {username: "alice5", password: "123456", firstName: "Alice", lastName: "Wang", role: "STUDENT"},
]

function renderUsers(users) {
    $tableRows.empty()
    for(var i = 0; i < users.length; i++) {
        var user = users[i]
        $tableRows.prepend(`
            <tr class="wbdv-template wbdv-user wbdv-hidden">
                <td class="wbdv-username">${user.username}</td>
                <td class="wbdv-password">${user.password}</td>
                <td class="wbdv-first-name">${user.firstName}</td>
                <td class="wbdv-last-name">${user.lastName}</td>
                <td class="wbdv-role">${user.role}</td>
                <td class="wbdv-actions">
                    <span class="pull-right">
                      <i id="${i}" class="fa-2x fa fa-times wbdv-remove"></i>
                      <i id="${user._id}" class="fa-2x fa fa-pencil wbdv-edit"></i>
                    </span>
                </td>
            </tr>
        `)
    }
    $(".wbdv-remove").click(deleteUser)
    $(".wbdv-edit").click(selectUser)
}

function createUser() {
    var newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFld.val()
    }

    adminUserService.createUser(newUser)
        .then(actualUser => {
            users.push(actualUser)
            renderUsers(users)
        })
}

function deleteUser(event) {
    var button = $(event.target)
    var index = button.attr("id")
    var id = users[index]._id
    adminUserService.deleteUser(id)
        .then(status => {
            users.splice(index, 1)
            renderUsers(users)
        })
}

var selectedUser = null
function selectUser(event) {
    var id = $(event.target).attr("id")
    selectedUser = users.find(user => user._id === id)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstName)
    $lastNameFld.val(selectedUser.lastName)
    $roleFld.val(selectedUser.role)

}

function updateUser() {
    selectedUser.username = $usernameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstName = $firstNameFld.val()
    selectedUser.lastName = $lastNameFld.val()
    selectedUser.role = $roleFld.val()

    adminUserService.updateUser(selectedUser._id, selectedUser)
        .then(status => {
            var index = users.findIndex(user => user._id === selectedUser._id)
            users[index] = selectedUser
            renderUsers(users)
        })

}

function main() {
    $tableRows = $(".wbdv-tbody")
    $createBtn = $(".wbdv-create")
    $updateBtn = $(".wbdv-update")

    $usernameFld = $(".wbdv-username-fld")
    $passwordFld = $(".wbdv-password-fld")
    $firstNameFld = $(".wbdv-firstName-fld")
    $lastNameFld = $(".wbdv-lastName-fld")
    $roleFld = $(".wbdv-role-fld")

    $createBtn.click(createUser)
    $updateBtn.click(updateUser)

    adminUserService.findAllUsers().then(actualUsers => {
        users = actualUsers
        renderUsers(users)
    })
}

$(main)