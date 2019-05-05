import { Plugin as Responses } from 'workbox-cacheable-response';
import { setCacheNameDetails } from 'workbox-core';
import { Plugin as Expiration } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

setCacheNameDetails({
  prefix: 'muvy',
  suffix: 'v1',
});

precacheAndRoute([]);

registerRoute(
  /\/|index\.html|\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: 'static-assets',
  })
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new Expiration({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 7,
      }),
    ],
  })
);

registerRoute(
  /.*fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-css',
  })
);

registerRoute(
  /.*fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new Responses({
        statuses: [0, 200],
      }),
      new Expiration({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);
