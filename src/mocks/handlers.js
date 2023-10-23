import { API_END_POINT } from '../api.js';
import { mockData } from './data/index.js';

const { http, HttpResponse } = MockServiceWorker;

export const handlers = [
  http.get(`${API_END_POINT}`, ({ params }) => {
    const { nodeId } = params;
    const data = mockData[`${nodeId || 'root'}`];

    return HttpResponse.json(data);
  }),
];
