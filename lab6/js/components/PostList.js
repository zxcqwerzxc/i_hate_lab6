function PostListComponent(userId) {
  const allPosts = [...storage.getPosts(), ...(window.cachedPosts || [])];
  const posts = allPosts.filter(p => p.userId === userId);
  const filtered = posts.filter(p =>
    !window.searchQuery ||
    p.title.toLowerCase().includes(window.searchQuery) ||
    p.body.toLowerCase().includes(window.searchQuery)
  );

  return createElement('div', { className: 'post-list' },
    createElement('h2', {}, 'Посты'),
    createElement('button', { className: 'btn-add', onclick: () => showAddPostForm(userId) }, 'Добавить пост'),
    ...filtered.map(post => createElement('div', { className: 'post-card' },
      createElement('h3', {}, post.title),
      createElement('p', {}, post.body),
      createElement('button', {
        className: 'btn-comment',
        onclick: () => navigate('#users#posts#comments', post.id)
      }, 'Комментарии')
    ))
  );
}

function showAddPostForm(userId) {
  const modal = createElement('div', { className: 'modal' },
    createElement('div', { className: 'modal-content' },
      createElement('h3', {}, 'Новый пост'),
      createElement('input', { id: 'new-post-title', placeholder: 'Заголовок', type: 'text' }),
      createElement('textarea', { id: 'new-post-body', placeholder: 'Содержание поста' }),
      createElement('div', { style: 'margin-top:15px;' },
        createElement('button', {
          onclick: () => {
            const title = document.getElementById('new-post-title').value.trim();
            const body = document.getElementById('new-post-body').value.trim();
            if (title && body) {
              storage.addPost({ userId, title, body });
              modal.remove();
              window.renderApp();
            } else {
              alert('Заполните заголовок и текст поста!');
            }
          }
        }, 'Сохранить'),
        createElement('button', { onclick: () => modal.remove() }, 'Отмена')
      )
    )
  );
  document.body.appendChild(modal);
  setTimeout(() => document.getElementById('new-post-title').focus(), 100);
}