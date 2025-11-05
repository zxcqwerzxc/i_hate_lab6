function TodoListComponent(userId) {
  const allTodos = [...(window.customTodos || []), ...window.cachedTodos || []];
  const todos = allTodos.filter(t => t.userId === userId);
  const filtered = todos.filter(t =>
    !window.searchQuery || t.title.toLowerCase().includes(window.searchQuery)
  );

  return createElement('div', { className: 'todo-list' },
    createElement('h2', {}, 'Тудушки'),
    createElement('button', { onclick: () => showAddTodoForm(userId) }, 'Добавить тудушку'),
    ...filtered.map(todo => createElement('div', { className: 'todo-card' },
      createElement('p', {}, todo.title),
      createElement('p', {}, todo.completed ? 'Выполнено' : 'Не выполнено')
    ))
  );
}

function showAddTodoForm(userId) {
  const modal = createElement('div', { className: 'modal' },
    createElement('input', { id: 'new-todo-title', placeholder: 'Название тудушки' }),
    createElement('button', { onclick: () => {
      const title = document.getElementById('new-todo-title').value.trim();
      if (title) {
        const newTodo = { userId, title, completed: false, id: Date.now() };
        window.customTodos = window.customTodos || [];
        window.customTodos.push(newTodo);
        modal.remove();
        renderApp();
      }
    }}, 'Сохранить'),
    createElement('button', { onclick: () => modal.remove() }, 'Отмена')
  );
  document.body.appendChild(modal);
}
