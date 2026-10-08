const zeppelin = document.querySelector('#zeppelin');
const landing = document.querySelector('.landing');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let destination = null;
let flightTimer;
let turnTimer;
let facing = -1;
const flightDuration = 1181;
let homeTimer;
let placed = false;
const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
function positionAirship(animate = true) {
  const bounds = landing.getBoundingClientRect();
  const width = zeppelin.offsetWidth;
  const height = zeppelin.offsetHeight;
  const current = zeppelin.getBoundingClientRect();
  let x = bounds.width - width - 16;
  let y = 12;
  if (destination && !reduceMotion.matches) {
    const target = destination.getBoundingClientRect();
    x = target.left - bounds.left + target.width / 2 - width / 2;
    y = target.top - bounds.top - height - 12;
  }
  const notice = document.querySelector('.development-notice').getBoundingClientRect();
  const menuRect = document.querySelector('.site-menu summary').getBoundingClientRect();
  const brandRect = document.querySelector('.site-brand').getBoundingClientRect();
  if ((!destination || reduceMotion.matches) && x < brandRect.right - bounds.left + 8) y = brandRect.bottom - bounds.top + 12;
  const maxY = Math.max(8, notice.top - bounds.top - height - 8);
  const fit = (cx, cy) => ({ x: clamp(cx, 8, bounds.width - width - 8), y: clamp(cy, 8, maxY) });
  const overlap = (p, rect) => Math.max(0, Math.min(p.x + width, rect.right - bounds.left) - Math.max(p.x, rect.left - bounds.left)) * Math.max(0, Math.min(p.y + height, rect.bottom - bounds.top) - Math.max(p.y, rect.top - bounds.top));
  const candidates = [fit(x, y), fit(x, brandRect.bottom - bounds.top + 12)];
  if (destination && !reduceMotion.matches) {
    const target = destination.getBoundingClientRect();
    candidates.push(
      fit(target.right - bounds.left + 12, y),
      fit(target.left - bounds.left - width - 12, y),
      fit(x, target.bottom - bounds.top + 12),
      fit(8, 8), fit(bounds.width - width - 8, 8)
    );
  }
  const targets = [...document.querySelectorAll('.attraction')];
  const score = p => (overlap(p, menuRect) + overlap(p, brandRect)) * 1000 + targets.reduce((sum, button) => sum + overlap(p, button.getBoundingClientRect()) * (button === destination ? 1000 : 1), 0);
  const best = candidates.reduce((best, candidate) => score(candidate) < score(best) ? candidate : best);
  x = best.x;
  y = best.y;
  const moving = placed && animate && !reduceMotion.matches && Math.hypot(x - (current.left - bounds.left), y - (current.top - bounds.top)) > 3;
  clearTimeout(flightTimer);
  clearTimeout(turnTimer);
  const dx = x - (current.left - bounds.left);
  const nextFacing = Math.abs(dx) > 3 ? (dx > 0 ? 1 : -1) : facing;
  const turning = moving && nextFacing !== facing;
  facing = nextFacing;
  zeppelin.style.setProperty('--facing', facing === 1 ? '-1' : '1');
  zeppelin.style.setProperty('--bank', facing === -1 ? '-3deg' : '3deg');
  zeppelin.classList.remove('flying');
  zeppelin.classList.add('no-flight');
  // Stop at the current position while turning, even when redirected mid-flight.
  zeppelin.style.transform = `translate3d(${current.left - bounds.left}px, ${current.top - bounds.top}px, 0)`;
  void zeppelin.offsetWidth;
  const depart = () => {
    zeppelin.classList.toggle('no-flight', !moving);
    zeppelin.classList.toggle('flying', moving);
    zeppelin.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (moving) flightTimer = setTimeout(() => zeppelin.classList.remove('flying'), flightDuration);
  };
  if (turning) turnTimer = setTimeout(depart, 180);
  else depart();
  placed = true;
}
document.addEventListener('mct:feature-show', event => {
  clearTimeout(homeTimer);
  destination = event.detail.button;
  zeppelin.classList.add('has-banner');
  positionAirship();
});
document.addEventListener('mct:feature-hide', () => {
  destination = null;
  zeppelin.classList.remove('has-banner');
  clearTimeout(homeTimer);
  homeTimer = setTimeout(() => positionAirship(), 450);
});
new ResizeObserver(() => positionAirship(false)).observe(landing);
reduceMotion.addEventListener('change', () => positionAirship(false));
positionAirship(false);
