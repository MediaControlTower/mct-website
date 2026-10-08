const menu = document.querySelector('.site-menu');
const trigger = menu.querySelector('summary');
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    trigger.focus();
  }
});
document.addEventListener('click', (event) => {
  if (menu.open && !menu.contains(event.target)) menu.open = false;
});

const features = {
  movies: ['Movies & TV', 'Your movies. Your shows. Pick up where you left off—with subtitles in sync.'],
  live: ['Live TV', 'Browse your IPTV channels, save favourites and see what’s on next.'],
  music: ['Jukebox', 'Spin an album, tune into radio, make a Mix Tape or settle into an audiobook.'],
  photos: ['Photos', 'Planned: turn an old tablet into a frame for your favourite memories.'],
  library: ['Media Library', 'Your collection, beautifully organised—with posters, cast and episode details.'],
  search: ['Search', 'Less searching. More watching. Find your next pick across your libraries.'],
  devices: ['Devices', 'One dashboard for your Firesticks. Check connections, versions and updates.'],
  profiles: ['Personal Libraries', 'Shared favourites, personal collections. Make room for everyone’s tastes.'],
};
const buttons = [...document.querySelectorAll('.attraction')];
const card = document.querySelector('#feature-card');
let activeButton = null;
let pinned = false;
let closeTimer;
let restoringFocus = false;
function hideFeature(restoreFocus = false) {
  clearTimeout(closeTimer);
  const previous = activeButton;
  buttons.forEach(button => button.setAttribute('aria-expanded', 'false'));
  card.hidden = true;
  document.dispatchEvent(new CustomEvent('mct:feature-hide'));
  activeButton = null;
  pinned = false;
  if (restoreFocus && previous) {
    restoringFocus = true;
    previous.focus({ preventScroll: true });
    restoringFocus = false;
  }
}
function showFeature(button) {
  if (activeButton !== button) pinned = false;
  clearTimeout(closeTimer);
  activeButton = button;
  const [title, description] = features[button.dataset.feature];
  document.querySelector('#feature-title').textContent = title;
  document.querySelector('#feature-description').textContent = description;
  document.querySelector('#feature-status').textContent = button.dataset.feature === 'photos' ? 'Future feature' : 'Explore MCT';
  buttons.forEach(item => item.setAttribute('aria-expanded', String(item === button)));
  card.hidden = false;
  document.dispatchEvent(new CustomEvent('mct:feature-show', { detail: { button } }));
}
function scheduleClose() {
  clearTimeout(closeTimer);
  if (!pinned) closeTimer = setTimeout(() => {
    if (!card.contains(document.activeElement) && document.activeElement !== activeButton) hideFeature();
  }, 1000);
}
buttons.forEach(button => {
  button.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') { pinned = false; showFeature(button); }
  });
  button.addEventListener('pointerleave', scheduleClose);
  button.addEventListener('focus', () => {
    if (!restoringFocus && button.matches(':focus-visible')) showFeature(button);
  });
  button.addEventListener('blur', scheduleClose);
  button.addEventListener('click', () => {
    if (activeButton === button && pinned) hideFeature();
    else { menu.open = false; showFeature(button); pinned = true; }
  });
});
card.addEventListener('pointerenter', () => clearTimeout(closeTimer));
card.addEventListener('pointerleave', scheduleClose);
card.addEventListener('focusout', scheduleClose);
card.querySelector('.feature-close').addEventListener('click', () => hideFeature(true));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && activeButton) { hideFeature(true); event.preventDefault(); }
});
document.addEventListener('click', event => {
  if (!card.contains(event.target) && !event.target.closest('.attraction')) hideFeature();
});
menu.addEventListener('toggle', () => { if (menu.open) hideFeature(); });
