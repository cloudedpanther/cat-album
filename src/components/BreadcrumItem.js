class BreadcrumbItem {
  constructor({ $target, item }) {
    const $item = document.createElement('div');
    $target.appendChild($item);

    $item.innerHTML = item.name;
  }
}

export default BreadcrumbItem;
