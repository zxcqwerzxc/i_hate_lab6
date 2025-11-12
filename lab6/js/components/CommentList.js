function showAddCommentForm(postId) {
    const modal = createElement('div', { className: 'modal' },
        createElement('div', { className: 'modal-content' },
            createElement('h3', {}, 'Новый комментарий'),
            createElement('input', { id: 'new-comment-name', placeholder: 'Ваше имя', type: 'text' }),
            createElement('input', { id: 'new-comment-email', placeholder: 'Ваш Email', type: 'email' }),
            createElement('textarea', { id: 'new-comment-body', placeholder: 'Текст комментария' }),
            createElement('div', { style: 'margin-top:15px;' },
                createElement('button', {
                    onclick: () => {
                        const name = document.getElementById('new-comment-name').value.trim();
                        const email = document.getElementById('new-comment-email').value.trim();
                        const body = document.getElementById('new-comment-body').value.trim();
                        if (name && body && email && email.includes('@')) {
                            storage.addComment({ postId, name, email, body }); 
                            modal.remove();
                            window.renderApp();
                        } else {
                            alert('Заполните корректно все поля!');
                        }
                    }
                }, 'Сохранить'),
                createElement('button', { onclick: () => modal.remove() }, 'Отмена')
            )
        )
    );
    document.body.appendChild(modal);
    setTimeout(() => document.getElementById('new-comment-name').focus(), 100);
}

function CommentListComponent(postId) {
    // Объединяем кэшированные (API) и пользовательские комментарии
    const allComments = [...storage.getComments(), ...(window.cachedComments || [])];
    const comments = allComments.filter(c => c.postId === postId);

    const filtered = comments.filter(c =>
        !window.searchQuery ||
        c.name.toLowerCase().includes(window.searchQuery) ||
        c.body.toLowerCase().includes(window.searchQuery)
    );

    return createElement('div', { className: 'comment-list' },
        createElement('h2', {}, 'Комментарии'),
        // Кнопка добавления комментария
        createElement('button', { className: 'btn-add', onclick: () => showAddCommentForm(postId) }, 'Добавить комментарий'),

        ...filtered.map(comment => createElement('div', { className: 'comment-card' },
            createElement('h4', {}, comment.name),
            createElement('p', {}, comment.body),
            createElement('small', {style: 'display: block;'}, `От: ${comment.email || 'Пользовательский комментарий'}`), 
            
            // Кнопка удаления: только для пользовательских комментариев (id > 500)
            comment.id > 500 && createElement('button', {
                className: 'btn-nav btn-delete',
                style: 'margin-left: 0; margin-top: 10px;', 
                onclick: () => {
                    if (confirm('Удалить этот комментарий?')) {
                        storage.deleteComment(comment.id);
                        window.renderApp();
                    }
                }
            }, 'Удалить')
        ))
    );
}