const IMAGE_API_END_POINT =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public';

class ImageViewer {
  $imageViewer = null;

  constructor({ $target, imgSrc }) {
    this.$imageViewer = document.createElement('div');
    this.$imageViewer.className = 'Modal ImageViewer';
    this.$imageViewer.onclick = (event) => {
      if (event.target.className !== 'Modal ImageViewer') return;
      this.close();
    };

    const $content = document.createElement('div');
    $content.className = 'content';
    $content.innerHTML = `<img src="${IMAGE_API_END_POINT}${imgSrc}" />`;

    this.$imageViewer.appendChild($content);
    $target.appendChild(this.$imageViewer);
  }

  open() {
    this.$imageViewer.style.display = 'block';
  }

  close() {
    this.$imageViewer.style.display = 'none';
  }
}

export default ImageViewer;
