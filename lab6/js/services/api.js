const API_BASE = 'https://jsonplaceholder.typicode.com';

async function fetchData(endpoint) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return [];
  }
}

const api = {
  getUsers: () => fetchData('users'),
  getTodos: () => fetchData('todos'),
  getPosts: () => fetchData('posts'),
  getComments: () => fetchData('comments')
};
