function PostListComponent(userId) {
  const posts = window.cachedPosts?.filter(p => p.userId === userId) || [];
  const filtered = posts.filter(p =>
    !window.searchQuery ||
    p.title.toLowerCase().includes(window.searchQuery) ||
    p.body.toLowerCase().includes(window.searchQuery)
  );

  return createElement('div', { className: 'post-list' },
    createElement('h2', {}, 'Посты'),
    ...filtered.map(post => createElement('div', { className: 'post-card' },
      createElement('h3', {}, post.title),
      createElement('p', {}, post.body),
      createElement('button', {
        onclick: () => navigate('#users#posts#comments', post.id)
      }, 'Комментарии')
    ))
  );
}
