function UserListComponent() {
  const allUsers = [...storage.getUsers(), ...(window.cachedUsers || [])];
  const filtered = allUsers.filter(u =>
    !window.searchQuery ||
    u.name.toLowerCase().includes(window.searchQuery) ||
    u.email.toLowerCase().includes(window.searchQuery)
  );

  return createElement('div', { className: 'user-list' },
    createElement('h2', {}, 'Пользователи'),
    createElement('button', { className: 'btn-add', onclick: showAddUserForm }, 'Добавить пользователя'),
    ...filtered.map(user => createElement('div', { className: 'user-card' },
      createElement('p', {}, user.name),
      createElement('p', {}, user.email),
      createElement('button', { className: 'btn-nav', onclick: () => navigate('#users#todos', user.id) }, 'Тудушки'),
      createElement('button', { className: 'btn-nav', onclick: () => navigate('#users#posts', user.id) }, 'Посты'),
      user.id > 10 && createElement('button', {
        className: 'btn-nav btn-delete',
        onclick: () => {
          if (confirm('Удалить пользователя и все его тудушки?')) {
            storage.deleteUser(user.id);
            window.renderApp();
          }
        }
      }, 'Удалить')
    ))
  );
}

function showAddUserForm() {
  const modal = createElement('div', { className: 'modal' },
    createElement('div', { className: 'modal-content' },
      createElement('h3', {}, 'Новый пользователь'),
      createElement('input', { id: 'new-name', placeholder: 'Имя', type: 'text' }),
      createElement('input', { id: 'new-email', placeholder: 'Email', type: 'email' }),
      createElement('div', { style: 'margin-top:15px;' },
        createElement('button', {
          onclick: () => {
            const name = document.getElementById('new-name').value.trim();
            const email = document.getElementById('new-email').value.trim();
            if (name && email && email.includes('@')) {
              storage.addUser({ name, email });
              modal.remove();
              window.renderApp();
            } else {
              alert('Заполните корректно имя и email!');
            }
          }
        }, 'Сохранить'),
        createElement('button', { onclick: () => modal.remove() }, 'Отмена')
      )
    )
  );
  document.body.appendChild(modal);
  setTimeout(() => document.getElementById('new-name').focus(), 100);
}