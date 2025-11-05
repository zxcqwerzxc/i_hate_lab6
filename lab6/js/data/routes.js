const ROUTES = [
  { hash: '#users', name: 'Пользователи', component: 'UserList' },
  { hash: '#users#todos', name: 'Тудушки', component: 'TodoList', parent: '#users' },
  { hash: '#users#posts', name: 'Посты', component: 'PostList', parent: '#users' },
  { hash: '#users#posts#comments', name: 'Комментарии', component: 'CommentList', parent: '#users#posts' }
];
