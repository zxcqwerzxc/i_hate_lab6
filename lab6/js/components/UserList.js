function UserListComponent() {
  const users = [...storage.getUsers(), ...window.cachedUsers || []];
  const filtered = users.filter(u =>
    !window.searchQuery ||
    u.name.toLowerCase().includes(window.searchQuery) ||
    u.email.toLowerCase().includes(window.searchQuery)
  );

  return createElement('div', { className: 'user-list' },
    createElement('h2', {}, 'Пользователи'),
    createElement('button', { onclick: showAddUserForm }, 'Добавить пользователя'),
    ...filtered.map(user =>
      createElement('div', { className: 'user-card' },
        createElement('p', {}, user.name),
        createElement('p', {}, user.email),
        createElement('button', { onclick: () => navigate('#users#todos', user.id) }, 'Тудушки'),
        createElement('button', { onclick: () => navigate('#users#posts', user.id) }, 'Посты'),
        user.id > 10 && createElement('button', {
          onclick: () => { storage.deleteUser(user.id); renderApp(); }
        }, 'Удалить')
      )
    )
  );
}

function showAddUserForm() {
  const modal = createElement('div', { className: 'modal' },
    createElement('input', { id: 'new-name', placeholder: 'Имя' }),
    createElement('input', { id: 'new-email', placeholder: 'Email' }),
    createElement('button', { onclick: () => {
      const name = document.getElementById('new-name').value;
      const email = document.getElementById('new-email').value;
      if (name && email) {
        storage.addUser({ name, email });
        modal.remove();
        renderApp();
      }
    }}, 'Сохранить'),
    createElement('button', { onclick: () => modal.remove() }, 'Отмена')
  );
  document.body.appendChild(modal);
}
