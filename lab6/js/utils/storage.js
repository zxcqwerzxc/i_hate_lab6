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
    const todos = this.getTodos().filter(t => t.userId !== id);
    this.saveTodos(todos);
    const posts = this.getPosts().filter(p => p.userId !== id);
    this.savePosts(posts);
  },
  getTodos() {
    const data = localStorage.getItem('customTodos');
    return data ? JSON.parse(data) : [];
  },
  saveTodos(todos) {
    localStorage.setItem('customTodos', JSON.stringify(todos));
  },
  addTodo(todo) {
    const todos = this.getTodos();
    todo.id = Date.now();
    todos.push(todo);
    this.saveTodos(todos);
    return todo;
  },
  updateTodo(todo) {
    const todos = this.getTodos();
    const index = todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      todos[index] = todo;
      this.saveTodos(todos);
    }
  },
  getPosts() {
    const data = localStorage.getItem('customPosts');
    return data ? JSON.parse(data) : [];
  },
  savePosts(posts) {
    localStorage.setItem('customPosts', JSON.stringify(posts));
  },
  addPost(post) {
    const posts = this.getPosts();
    post.id = Date.now();
    posts.push(post);
    this.savePosts(posts);
    return post;
  }
};