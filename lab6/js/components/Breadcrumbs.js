function Breadcrumbs(currentHash) {
  const parts = currentHash.replace(/^#/, '').split('#');
  const items = parts.map((part, i) => {
    const hash = '#' + parts.slice(0, i + 1).join('#');
    const route = ROUTES.find(r => r.hash === hash);
    return { name: route?.name || part, hash };
  });

  const backButton = items.length > 1 ? createElement('button', {
    className: 'btn-nav',
    onclick: () => {
      const parentHash = items[items.length - 2]?.hash || '#users';
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