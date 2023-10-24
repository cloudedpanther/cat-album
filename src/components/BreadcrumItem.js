class BreadcrumbItem {
  constructor({ $target, item }) {
    const $item = document.createElement('div');
    $target.appendChild($item);

    $item.innerHTML = `<div>${item.name}</div>`;
  }
}

export default BreadcrumbItem;
