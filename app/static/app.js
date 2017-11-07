/**
 * Iwami Ginzan AR Guide, AR tour guide through the world heritage site Iwami Ginzan
 * Copyright (C) 2017  Michael Vogt
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by

 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

class App {
  constructor () {
  }
}

(_ => new App())();

if ('serviceWorker' in navigator) {
  // navigator.serviceWorker.register('/service-worker.js', {scope: '/'});
}

function goOffline() {
  document.body.classList.add('offline');
  Array.from(document.querySelectorAll('nav a')).forEach(link => {
    const linkUrl = new URL(link.href);
    linkUrl.searchParams.set('partial', '');
    caches.match(linkUrl.toString())
      .then(resp => link.classList.toggle('cached', !!resp));
  });
}

window.addEventListener('offline', _ => goOffline());
window.addEventListener('online', _ => document.body.classList.remove('offline'));
navigator.onLine || goOffline();
