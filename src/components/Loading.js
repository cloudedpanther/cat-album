class Loading {
  $target = null;
  $loading = null;

  constructor({ $target }) {
    this.$target = $target;
    this.$loading = document.createElement('div');
    this.$loading.className = 'Modal Loading';

    const $content = document.createElement('div');
    $content.className = 'content';
    $content.innerHTML = `<img src="${'./assets/nyan-cat.gif'}" />`;

    this.$loading.appendChild($content);
    $target.appendChild(this.$loading);
  }

  start() {
    this.$target.style.pointerEvents = 'none';
    this.$loading.style.display = 'block';
  }

  finish() {
    this.$target.style.pointerEvents = 'all';
    this.$loading.style.display = 'none';
  }
}

export default Loading;
