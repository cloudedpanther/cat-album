import { fetchNextNodes } from '../api.js';
import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';

class App {
  $target = null;
  nodeMap = {};
  nextNodeListMap = {};
  path = [];
  nextNodes = [];

  constructor($target) {
    this.$target = $target;

    this.init();
  }

  async init() {
    await this.updateNextNodes('root');

    const rootNode = { id: 'root', name: 'root' };

    this.path.push(rootNode);

    this.render();
  }

  render() {
    this.$target.innerHTML = '';

    new Breadcrumb({ $target: this.$target, path: this.path });

    new Nodes({ $target: this.$target, nodes: this.nextNodes });
  }

  async updateNextNodes(nodeId) {
    if (!this.nextNodeListMap[nodeId]) {
      this.nextNodeListMap[nodeId] = await fetchNextNodes(nodeId);

      this.nextNodeListMap[nodeId].forEach((node) => {
        if (!this.nodeMap[node.id]) this.nodeMap[node.id] = node;
      });
    }

    this.nextNodes = this.nextNodeListMap[nodeId];
  }

  updatePath(nodeId) {
    const prevPathIndex = this.path.findIndex((node) => node.id === nodeId);

    if (prevPathIndex !== -1) {
      this.path = this.path.slice(0, prevPathIndex + 1);
      return;
    }

    this.path.push(this.nodeMap[nodeId]);
  }

  async updateState(nodeId) {
    await this.updateNextNodes(nodeId);
    this.updatePath(nodeId);

    this.render();
  }
}

export default App;
