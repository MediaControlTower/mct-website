import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files = new Map([
  ['/zeppelin.js', ['zeppelin.js', 'text/javascript; charset=utf-8']],
  ['/assets/zeppelin.png', ['assets/zeppelin.png', 'image/png']],
  ['/menu.js', ['menu.js', 'text/javascript; charset=utf-8']],
  ['/feature-rooms.js', ['feature-rooms.js', 'text/javascript; charset=utf-8']],
  ['/assets/sunflower-logo.png', ['assets/sunflower-logo.png', 'image/png']],
  ['/assets/favicon.png', ['assets/favicon.png', 'image/png']],
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/parents.html', ['parents.html', 'text/html; charset=utf-8']],
  ['/features.html', ['features.html', 'text/html; charset=utf-8']],
  ['/assets/features/movies.webp', ['assets/features/movies.webp', 'image/webp']],
  ['/assets/features/movies-with-review.webp', ['assets/features/movies-with-review.webp', 'image/webp']],
  ['/assets/features/cinema-banner.jpg', ['assets/features/cinema-banner.jpg', 'image/jpeg']],
  ['/assets/features/family-reviews.webp', ['assets/features/family-reviews.webp', 'image/webp']],
  ['/assets/features/resume-playback.webp', ['assets/features/resume-playback.webp', 'image/webp']],
  ['/assets/features/live.webp', ['assets/features/live.webp', 'image/webp']],
  ['/assets/features/tv-guide-banner.jpg', ['assets/features/tv-guide-banner.jpg', 'image/jpeg']],
  ['/assets/features/watch-from-guide.webp', ['assets/features/watch-from-guide.webp', 'image/webp']],
  ['/assets/features/iptv-provider.webp', ['assets/features/iptv-provider.webp', 'image/webp']],
  ['/assets/features/iptv-multi-tv.webp', ['assets/features/iptv-multi-tv.webp', 'image/webp']],
  ['/assets/features/profiles.webp', ['assets/features/profiles.webp', 'image/webp']],
  ['/assets/features/sound-and-stories.webp', ['assets/features/sound-and-stories.webp', 'image/webp']],
  ['/assets/features/listening-room-banner.jpg', ['assets/features/listening-room-banner.jpg', 'image/jpeg']],
  ['/assets/features/my-music.webp', ['assets/features/my-music.webp', 'image/webp']],
  ['/assets/features/mix-tapes.webp', ['assets/features/mix-tapes.webp', 'image/webp']],
  ['/assets/features/audiobooks.webp', ['assets/features/audiobooks.webp', 'image/webp']],
  ['/assets/features/gallery.webp', ['assets/features/gallery.webp', 'image/webp']],
  ['/assets/features/gallery-banner.jpg', ['assets/features/gallery-banner.jpg', 'image/jpeg']],
  ['/assets/features/gallery-digital-frames.webp', ['assets/features/gallery-digital-frames.webp', 'image/webp']],
  ['/assets/features/library-banner.webp', ['assets/features/library-banner.webp', 'image/webp']],
  ['/assets/features/library-folders.webp', ['assets/features/library-folders.webp', 'image/webp']],
  ['/assets/features/library-scans.webp', ['assets/features/library-scans.webp', 'image/webp']],
  ['/assets/features/library-metadata.webp', ['assets/features/library-metadata.webp', 'image/webp']],
  ['/assets/features/statistics-current.webp', ['assets/features/statistics-current.webp', 'image/webp']],
  ['/assets/features/companions-current.webp', ['assets/features/companions-current.webp', 'image/webp']],
  ['/assets/features/stable-current.webp', ['assets/features/stable-current.webp', 'image/webp']],
  ['/assets/features/chest-current.webp', ['assets/features/chest-current.webp', 'image/webp']],
  ['/assets/features/devices-observatory.webp', ['assets/features/devices-observatory.webp', 'image/webp']],
  ['/assets/features/device-dashboard.webp', ['assets/features/device-dashboard.webp', 'image/webp']],
  ['/assets/features/profiles-banner.webp', ['assets/features/profiles-banner.webp', 'image/webp']],
  ['/assets/features/backup-banner.webp', ['assets/features/backup-banner.webp', 'image/webp']],
  ['/assets/features/profile-settings.webp', ['assets/features/profile-settings.webp', 'image/webp']],
  ['/assets/features/profile-access.webp', ['assets/features/profile-access.webp', 'image/webp']],
  ['/assets/features/profile-limits.webp', ['assets/features/profile-limits.webp', 'image/webp']],
  ['/assets/features/backup-transfer.webp', ['assets/features/backup-transfer.webp', 'image/webp']],
  ['/assets/features/feeding-current.mp4', ['assets/features/feeding-current.mp4', 'video/mp4']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/assets/castle-desktop.png', ['assets/castle-desktop.png', 'image/png']],
  ['/assets/castle-mobile.png', ['assets/castle-mobile.png', 'image/png']],
]);
const server = http.createServer(async (req, res) => {
  const entry = files.get(new URL(req.url, 'http://localhost').pathname);
  if (!entry) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const body = await readFile(new URL(entry[0], import.meta.url));
    res.writeHead(200, { 'Content-Type': entry[1] }); res.end(body);
  } catch { res.writeHead(500); res.end('Unable to load file'); }
});
server.listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
