window.cachedUsers = [];
window.cachedTodos = [];
window.cachedPosts = [];
window.cachedComments = [];
window.customTodos = [];

async function loadInitialData() {
  window.cachedUsers = await api.getUsers();
  window.cachedTodos = await api.getTodos();
  window.cachedPosts = await api.getPosts();
  window.cachedComments = await api.getComments();
  renderApp();
}

window.addEventListener('hashchange', renderApp);
window.addEventListener('load', loadInitialData);
