function TodoListComponent(userId) {
  const allTodos = [...storage.getTodos(), ...(window.cachedTodos || [])];
  const todos = allTodos.filter(t => t.userId === userId);
  const filtered = todos.filter(t =>
    !window.searchQuery || t.title.toLowerCase().includes(window.searchQuery)
  );

  return createElement('div', { className: 'todo-list' },
    createElement('h2', {}, 'Тудушки'),
    createElement('button', { className: 'btn-add', onclick: () => showAddTodoForm(userId) }, 'Добавить тудушку'),
    ...filtered.map(todo => createElement('div', { className: 'todo-card' },
      createElement('p', {}, todo.title),
      createElement('div', { className: 'todo-status' },
        createElement('input', {
          type: 'checkbox',
          checked: todo.completed,
          onchange: () => {
            todo.completed = !todo.completed;
            if (todo.id > 1000) {
              storage.updateTodo(todo);
            }
            window.renderApp();
          }
        }),
        createElement('span', { style: `color:${todo.completed ? 'green' : 'red'}` },
          todo.completed ? 'Выполнено' : 'Не выполнено'
        )
      )
    ))
  );
}

function showAddTodoForm(userId) {
  const modal = createElement('div', { className: 'modal' },
    createElement('div', { className: 'modal-content' },
      createElement('h3', {}, 'Новая тудушка'),
      createElement('input', { id: 'new-todo-title', placeholder: 'Что нужно сделать?', type: 'text' }),
      createElement('div', { style: 'margin-top:15px;' },
        createElement('button', {
          onclick: () => {
            const title = document.getElementById('new-todo-title').value.trim();
            if (title) {
              storage.addTodo({ userId, title, completed: false });
              modal.remove();
              window.renderApp();
            } else {
              alert('Введите название тудушки!');
            }
          }
        }, 'Сохранить'),
        createElement('button', { onclick: () => modal.remove() }, 'Отмена')
      )
    )
  );
  document.body.appendChild(modal);
  setTimeout(() => document.getElementById('new-todo-title').focus(), 100);
}