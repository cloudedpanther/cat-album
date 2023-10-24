class Node {
  constructor({ $target, node }) {
    const $node = document.createElement('div');
    $node.className = 'Node';
    $target.appendChild($node);

    let imgSrc = '';

    switch (node.type) {
      case 'DIRECTORY':
        imgSrc = './assets/directory.png';
        break;
      case 'PREV':
        imgSrc = './assets/prev.png';
        break;
      default:
        imgSrc = './assets/file.png';
    }

    $node.innerHTML = `
        <img src="${imgSrc}" />
        <div>${node.name}</div>
    `;
  }
}

export default Node;
