const storage = {
  getUsers() {
    const data = localStorage.getItem('customUsers');
    return data ? JSON.parse(data) : [];
  },
  saveUsers(users) {
    localStorage.setItem('customUsers', JSON.stringify(users));
  },
  addUser(user) {
    const users = this.getUsers();
    user.id = Date.now();
    users.push(user);
    this.saveUsers(users);
    return user;
  },
  deleteUser(id) {
    const users = this.getUsers().filter(u => u.id !== id);
    this.saveUsers(users);
  }
};