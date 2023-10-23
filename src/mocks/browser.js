import { handlers } from './handlers.js';

const { setupWorker } = MockServiceWorker;

export const worker = setupWorker(...handlers);
