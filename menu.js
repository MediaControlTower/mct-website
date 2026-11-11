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
  movies: 'Browse films in release order, resume a show in another room, and download subtitles that MCT can sync to your video.',
  live: 'Bring your own authorised IPTV service. See what’s on your favourite channels and tune in straight from the guide.',
  music: 'Save favourite radio stations, play your albums and Mix Tapes, or take an audiobook with you on Android.',
  gallery: 'Put a photo slideshow on the TV when guests come over, or turn a spare Android phone or tablet into a digital frame.',
  library: 'Group folders from different drives into one library, scan each collection separately and add your own artwork.',
  statistics: 'See your watching time and favourites, raise companions, and explore the Stable and Treasure Chest.',
  devices: 'MCT runs lightly on compatible Android devices and Firesticks, including older hardware.',
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
