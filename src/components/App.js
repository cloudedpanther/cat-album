import { fetchNextNodes } from '../api.js';
import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';

class App {
  $target = null;
  nodeMap = {};
  nextNodeListMap = {};
  path = [];

  constructor($target) {
    this.$target = $target;

    this.init();
  }

  async init() {
    const rootNode = { id: 'root', name: 'root', parent: null };

    this.nodeMap['root'] = rootNode;

    await this.updateNextNodes('root');

    this.path.push(rootNode);

    this.render('root');
  }

  render(nodeId) {
    this.$target.innerHTML = '';

    new Breadcrumb({
      $target: this.$target,
      path: this.path,
      onClick: this.updateState.bind(this),
    });

    const prevNodeId = this.nodeMap[nodeId].parent?.id;
    const prevNode = prevNodeId
      ? { ...this.nodeMap[prevNodeId], name: '', type: 'PREV' }
      : null;

    new Nodes({
      $target: this.$target,
      prevNode,
      nodes: this.nextNodeListMap[nodeId],
      onClick: this.updateState.bind(this),
    });
  }

  async updateState(nodeId) {
    await this.updateNextNodes(nodeId);
    this.updatePath(nodeId);

    this.render(nodeId);
  }

  async updateNextNodes(nodeId) {
    if (!this.nextNodeListMap[nodeId]) {
      this.nextNodeListMap[nodeId] = await fetchNextNodes(nodeId);

      this.nextNodeListMap[nodeId].forEach((node) => {
        if (!this.nodeMap[node.id])
          this.nodeMap[node.id] = node.parent
            ? node
            : { ...node, parent: { id: 'root' } };
      });
    }
  }

  updatePath(nodeId) {
    const prevPathIndex = this.path.findIndex((node) => node.id === nodeId);

    if (prevPathIndex !== -1) {
      this.path = this.path.slice(0, prevPathIndex + 1);
      return;
    }

    this.path.push(this.nodeMap[nodeId]);
  }
}

export default App;
