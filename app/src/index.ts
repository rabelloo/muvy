import { render } from 'lit-html';
import { App } from './app';
import './index.scss';

render(App(), document.body);

// install service worker only in production
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener(
    'load',
    () => navigator.serviceWorker.register('/service-worker.js'),
    { once: true }
  );
}
