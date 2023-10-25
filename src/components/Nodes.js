import Node from './Node.js';

class Nodes {
  constructor({ $target, prevNode, nodes, onClick }) {
    const $nodes = document.createElement('div');
    $nodes.className = 'Nodes';
    $target.appendChild($nodes);

    (prevNode ? [prevNode, ...nodes] : nodes).map(
      (node) => new Node({ $target: $nodes, $app: $target, node, onClick }),
    );
  }
}

export default Nodes;
