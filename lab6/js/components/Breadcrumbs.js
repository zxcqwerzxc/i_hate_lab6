function Breadcrumbs(currentHash) {
    const parts = currentHash.replace(/^#/, '').split('#').filter(p => p);

    const items = parts.map((part, i) => {
        const hash = '#' + parts.slice(0, i + 1).join('#');
        let name = part;

        const route = ROUTES.find(r => r.hash === hash);
        if (route) {
            name = route.name;
        } 

        else if (i === 1) { 
            const allUsers = [...storage.getUsers(), ...(window.cachedUsers || [])];
            const user = allUsers.find(u => u.id === parseInt(part));
            if (user) {
                name = user.name;
            } else {
                name = `Пользователь #${part}`;
            }
        } 
        else if (i === 3) { 
            name = `Пост #${part}`;
        }

        return { name: name, hash };
    });

    const backButton = items.length > 1 ? createElement('button', {
        className: 'btn-nav',
        onclick: () => {
            // Вычисляем родительский хэш, исключая последний элемент
            const parentParts = parts.slice(0, parts.length - 1);
            const parentHash = '#' + parentParts.join('#') || '#users';
            navigate(parentHash);
        }
    }, 'Назад') : null;

    return createElement('nav', { className: 'breadcrumbs' },
        createElement('div', {},
            backButton,
            ...items.map((item, i) =>
                createElement('span', {},
                    i > 0 ? ' > ' : '',
                    createElement('a', {
                        href: item.hash,
                        onclick: e => { e.preventDefault(); navigate(item.hash); }
                    }, item.name)
                )
            )
        )
    );
}