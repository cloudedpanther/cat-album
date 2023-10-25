export const API_END_POINT =
  'https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/';

export const fetchNextNodes = async (nodeId) => {
  try {
    const res = await fetch(
      `${API_END_POINT}${nodeId === 'root' ? '' : nodeId}`,
    );

    if (res.ok) return await res.json();
  } catch (error) {
    fetchNextNodes(nodeId);
  }
};
