const storage = {
    // === Users ===
    getUsers() { return JSON.parse(localStorage.getItem('customUsers') || '[]'); },
    saveUsers(users) { localStorage.setItem('customUsers', JSON.stringify(users)); },
    addUser(user) {
        const users = this.getUsers();
        user.id = Date.now();
        users.push(user);
        this.saveUsers(users);
        return user;
    },
    deleteUser(id) {
        this.saveUsers(this.getUsers().filter(u => u.id !== id));
        this.saveTodos(this.getTodos().filter(t => t.userId !== id));
        this.savePosts(this.getPosts().filter(p => p.userId !== id));
        // Удаление комментариев, связанных с постами пользователя (упрощенно)
        const postsToDelete = this.getPosts().filter(p => p.userId === id).map(p => p.id);
        this.saveComments(this.getComments().filter(c => !postsToDelete.includes(c.postId)));
    },

    // === Todos ===
    getTodos() { return JSON.parse(localStorage.getItem('customTodos') || '[]'); },
    saveTodos(todos) { localStorage.setItem('customTodos', JSON.stringify(todos)); },
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

    // === Posts ===
    getPosts() { return JSON.parse(localStorage.getItem('customPosts') || '[]'); },
    savePosts(posts) { localStorage.setItem('customPosts', JSON.stringify(posts)); },
    addPost(post) {
        const posts = this.getPosts();
        post.id = Date.now();
        posts.push(post);
        this.savePosts(posts);
        return post;
    },
    
    // === Comments (NEW LOGIC) ===
    getComments() { return JSON.parse(localStorage.getItem('customComments') || '[]'); },
    saveComments(comments) { localStorage.setItem('customComments', JSON.stringify(comments)); },
    addComment(comment) {
        const comments = this.getComments();
        comment.id = Date.now(); 
        comments.push(comment);
        this.saveComments(comments);
        return comment;
    },
    deleteComment(id) {
        this.saveComments(this.getComments().filter(c => c.id !== id));
    }
};