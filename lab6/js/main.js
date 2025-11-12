window.cachedUsers = [];
window.cachedTodos = [];
window.cachedPosts = [];
window.cachedComments = [];

async function loadInitialData() {

  try {
    window.cachedUsers = await api.getUsers();
    window.cachedTodos = await api.getTodos();
    window.cachedPosts = await api.getPosts();
    window.cachedComments = await api.getComments();
  } catch (e) {
    console.error('API load error:', e);
  } finally {
    window.renderApp();
  }
}

// КРИТИЧНО: Привязываем обработчики событий
window.addEventListener('hashchange', () => window.renderApp());
window.addEventListener('load', loadInitialData);