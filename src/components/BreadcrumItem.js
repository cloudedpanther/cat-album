class BreadcrumbItem {
  constructor({ $target, item, onClick }) {
    const $item = document.createElement('div');
    $item.onclick = () => onClick(item.id);
    $target.appendChild($item);

    $item.innerHTML = item.name;
  }
}

export default BreadcrumbItem;
