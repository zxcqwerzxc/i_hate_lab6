function Breadcrumbs(currentHash) {
  const parts = currentHash.replace(/^#/, '').split('#');
  const items = parts.map((part, i) => {
    const hash = '#' + parts.slice(0, i + 1).join('#');
    const route = ROUTES.find(r => r.hash === hash);
    return { name: route?.name || part, hash };
  });

  return createElement('nav', { className: 'breadcrumbs' },
    ...items.map((item, i) =>
      createElement('span', {},
        i > 0 ? ' > ' : '',
        createElement('a', { href: item.hash, onclick: (e) => {
          e.preventDefault();
          navigate(item.hash);
        }}, item.name)
      )
    )
  );
}