import BreadcrumbItem from './BreadcrumItem.js';

class Breadcrumb {
  constructor({ $target, path }) {
    const $breadcrumb = document.createElement('nav');
    $breadcrumb.className = 'Breadcrumb';
    $target.appendChild($breadcrumb);

    path.map(
      (node) => new BreadcrumbItem({ $target: $breadcrumb, item: node }),
    );
  }
}

export default Breadcrumb;
