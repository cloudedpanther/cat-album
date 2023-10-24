import Node from './Node.js';

class Nodes {
  constructor({ $target, nodes }) {
    const $nodes = document.createElement('div');
    $nodes.className = 'Nodes';
    $target.appendChild($nodes);

    nodes.map((node) => new Node({ $target: $nodes, node }));
  }
}

export default Nodes;
