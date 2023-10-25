import ImageViewer from './ImageViewer.js';

class Node {
  $imageViewer = null;

  constructor({ $target, $app, node, onClick }) {
    const $node = document.createElement('div');
    $node.className = 'Node';
    $node.onclick = () => {
      if (node.type === 'FILE') {
        if (!this.$imageViewer) {
          this.$imageViewer = new ImageViewer({
            $target: $app,
            imgSrc: node.filePath,
          });
          return;
        }

        this.$imageViewer.open();
        return;
      }

      onClick(node.id);
    };
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
