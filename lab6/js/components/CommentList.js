function CommentListComponent(postId) {
  const comments = window.cachedComments?.filter(c => c.postId === postId) || [];
  const filtered = comments.filter(c =>
    !window.searchQuery ||
    c.name.toLowerCase().includes(window.searchQuery) ||
    c.body.toLowerCase().includes(window.searchQuery)
  );

  return createElement('div', { className: 'comment-list' },
    createElement('h2', {}, 'Комментарии'),
    ...filtered.map(comment => createElement('div', { className: 'comment-card' },
      createElement('h4', {}, comment.name),
      createElement('p', {}, comment.body),
      createElement('small', {}, comment.email)
    ))
  );
}
