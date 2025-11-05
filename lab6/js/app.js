let currentUserId = null;
let currentPostId = null;
window.searchQuery = '';

function renderSearch() {
  const searchInput = createElement('input', {
    type: 'text',
    placeholder: 'Поиск...',
    className: 'search-input',
    oninput: debounce(handleSearch, 400)
  });
  return createElement('div', { className: 'search-container' }, searchInput);
}

function handleSearch(e) {
  window.searchQuery = e.target.value.toLowerCase();
  renderApp();
}

function renderApp() {
  const hash = window.location.hash || '#users';
  const app = document.getElementById('app');
  app.innerHTML = '';

  const breadcrumbs = Breadcrumbs(hash);
  const search = renderSearch();
  app.appendChild(breadcrumbs);
  app.appendChild(search);

  if (hash.startsWith('#users#posts#comments')) {
    const postId = getIdFromHash(hash, 2);
    app.appendChild(CommentListComponent(postId));
  } else if (hash.startsWith('#users#posts')) {
    const userId = getIdFromHash(hash, 1);
    app.appendChild(PostListComponent(userId));
  } else if (hash.startsWith('#users#todos')) {
    const userId = getIdFromHash(hash, 1);
    app.appendChild(TodoListComponent(userId));
  } else if (hash === '#users') {
    app.appendChild(UserListComponent());
  }
}

function getIdFromHash(hash, level) {
  const parts = hash.split('#');
  return parts[level + 1] ? parseInt(parts[level + 1]) : null;
}

function navigate(hash, id) {
  if (id) {
    const parts = hash.split('#');
    parts.push(id);
    window.location.hash = parts.join('#');
  } else {
    window.location.hash = hash;
  }
}
