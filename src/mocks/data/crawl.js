import { API_END_POINT } from '../../api.js';

const fetchNodes = async (mockData, nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}${nodeId || ''}`);

    if (res.ok) {
      const json = await res.json();

      mockData[`${nodeId || 'root'}`] = json;

      await Promise.all(
        json.map(async (node) =>
          node.type === 'DIRECTORY'
            ? await fetchNodes(mockData, node.id)
            : node,
        ),
      );

      return mockData;
    }
  } catch (error) {
    fetchNodes(mockData, nodeId);
  }
};

export const consoleFetchData = async () => {
  const data = await fetchNodes({});
  console.log(JSON.stringify(data));
};
