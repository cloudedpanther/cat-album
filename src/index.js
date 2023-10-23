import App from './components/App.js';

async function deferRender() {
  const { worker } = await import('./mocks/browser.js');

  return worker.start();
}

deferRender().then(() => {
  const $app = document.querySelector('.App');
  new App($app);
});
