const wide = matchMedia('(min-width: 860px)');

for (const room of document.querySelectorAll('.room-layout')) {
  const signs = room.querySelector('.room-signs');
  const topics = [...room.querySelectorAll('.room-topics details')];

  const defaultTopic = topics.find(topic => topic.open) ?? topics[0];
  if (!wide.matches) defaultTopic.open = false;

  const buttons = topics.map(topic => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = topic.querySelector('summary').textContent;
    button.setAttribute('aria-controls', topic.querySelector('.room-panel').id);
    button.addEventListener('click', () => { topic.open = true; });
    signs.append(button);
    return button;
  });

  function updateSigns() {
    topics.forEach((topic, index) => buttons[index].setAttribute('aria-pressed', String(topic.open)));
  }

  wide.addEventListener('change', () => {
    if (wide.matches && !topics.some(topic => topic.open)) defaultTopic.open = true;
  });
  topics.forEach(topic => topic.addEventListener('toggle', updateSigns));
  updateSigns();
  room.classList.add('room-ready');
}
