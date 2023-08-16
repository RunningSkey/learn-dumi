import { VirtualScrollList } from './components';

export default () => (
  <VirtualScrollList
    data={new Array(10011).fill(0).map((_, idx) => idx)}
    itemHeight={20}
    containerHeight={150}
  />
);
