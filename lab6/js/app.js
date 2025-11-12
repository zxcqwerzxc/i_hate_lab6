window.searchQuery = '';

// ПОИСК
function renderSearch() {
  const input = createElement('input', {
    type: 'text',
    placeholder: 'Поиск...',
    className: 'search-input',
    value: window.searchQuery,
    oninput: debounce(handleSearch, 300) 
  });
  input.addEventListener('search', () => {
    if (!input.value) { 
      window.searchQuery = '';
      window.renderApp();
    }
  });
  return createElement('div', { className: 'search-container' }, input);
}

function handleSearch(e) {
  window.searchQuery = e.target.value.trim().toLowerCase();
  window.renderApp();
}

// НАВИГАЦИЯ
function getIdFromHash(hash, level) {
  const parts = hash.replace(/^#/, '').split('#');
  return parts[level + 1] ? parseInt(parts[level + 1], 10) : null;
}

function navigate(baseHash, id) {
  let hash = baseHash;
  if (id !== undefined) {
    hash = `${baseHash}#${id}`;
  }
  // ИСПРАВЛЕНИЕ: Гарантируем # в начале хэша
  window.location.hash = hash.startsWith('#') ? hash : `#${hash}`;
}

// РЕНДЕР
function renderApp() {
  // ИСПРАВЛЕНИЕ: Нормализация хэша
  const hash = (window.location.hash || '#users').replace(/^#+/, '#'); 
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '';

  app.appendChild(Breadcrumbs(hash));
  app.appendChild(renderSearch());

  try {
    if (hash.includes('#comments')) {
      const postId = getIdFromHash(hash, 2);
      if (postId) app.appendChild(CommentListComponent(postId));
    } else if (hash.includes('#posts')) {
      const userId = getIdFromHash(hash, 1);
      if (userId) app.appendChild(PostListComponent(userId));
    } else if (hash.includes('#todos')) {
      const userId = getIdFromHash(hash, 1);
      if (userId) app.appendChild(TodoListComponent(userId));
    } else if (hash === '#users') {
      app.appendChild(UserListComponent());
    }
  } catch (e) {
    console.error('Render error:', e);
  }
}

// ГЛОБАЛЬНЫЕ ФУНКЦИИ
window.renderApp = renderApp;
window.navigate = navigate;