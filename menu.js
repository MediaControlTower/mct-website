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
  movies: 'Browse your movies, shows and kids’ collections. Resume where you left off or leave a family review.',
  live: 'Bring your own IPTV playlist and programme guide (EPG). Save favourite channels and see what’s on.',
  music: 'Play your albums, tune into internet radio, make a Mix Tape or settle into an audiobook.',
  gallery: 'Browse your household photos or turn a spare tablet into a digital photo frame.',
  library: 'Organise your collections, edit details and search across your media from one place.',
  statistics: 'See your watching time and favourites, raise companions, and explore the Stable and Treasure Chest.',
  devices: 'Use MCT on Android devices and Firesticks. Check your Firesticks from the server dashboard.',
  profiles: 'Give each person their own viewing progress and access to the collections they use.',
};
const buttons = [...document.querySelectorAll('.attraction')];
const card = document.querySelector('#feature-card');
const featureLink = document.querySelector('#feature-link');
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
  const title = button.textContent;
  const feature = button.dataset.feature;
  document.querySelector('#feature-title').textContent = title;
  document.querySelector('#feature-description').textContent = features[feature];
  featureLink.href = `features.html#${feature}`;
  featureLink.textContent = `Explore ${title}`;
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
  button.addEventListener('keydown', event => {
    if (event.key === 'Tab' && !event.shiftKey && activeButton === button && !card.hidden) {
      event.preventDefault();
      featureLink.focus();
    }
  });
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
