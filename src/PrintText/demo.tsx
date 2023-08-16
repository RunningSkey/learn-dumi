import { PrintText } from './components';
const API_BASE_URL = 'http://localhost:3000';
const API_URL = '/text-stream';
export default () => (
  <PrintText
    baseUrl={API_BASE_URL}
    serviceName={API_URL}
    thunk={5}
    speed={50}
  />
);
