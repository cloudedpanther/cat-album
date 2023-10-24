export const API_END_POINT =
  'https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/';

export const fetchNextNodes = async (nodeId) => {
  const res = await fetch(`${API_END_POINT}${nodeId || ''}`);

  if (res.ok) return await res.json();

  throw new Error(res.Error);
};
