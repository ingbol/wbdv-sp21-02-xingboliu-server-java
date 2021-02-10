function AdminUserServiceClient() {
    this.createUser = createUser;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.findAllUsers = findAllUsers;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/ingbol/users';

    var self = this;
    function createUser(user) {
        return fetch(self.url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            return response.json()
        })
    }

    function findAllUsers(){
        return fetch(self.url).then(response => {
            return response.json()
        })
    }

    function deleteUser(userId) {
        return fetch(`${self.url}/${userId}`, {method: 'DELETE'})
            .then(response => {
                return response.json()
            })
    }
    function updateUser(userId, user) {
        return fetch(`${self.url}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }
}