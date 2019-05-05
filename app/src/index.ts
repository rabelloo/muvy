import { render } from 'lit-html';
import { App } from './app';
import './index.scss';

render(App(), document.body);

// install service worker
if ('serviceWorker' in navigator) {
  window.addEventListener(
    'load',
    () => navigator.serviceWorker.register('/service-worker.js'),
    { once: true }
  );
}
