import { SortTable } from '../components/index';

export default () => {
  const dataSource = new Array(22).fill({}).map((_, index) => ({
    id: index + '',
    name: index + '_name',
    idx: index,
  }));
  const columns = [
    { dataIndex: 'idx', title: 'idx' },
    { dataIndex: 'id', title: 'id' },
    { dataIndex: 'name', title: 'name' },
  ];

  return (
    <SortTable
      isSort={true}
      rowKey={'id'}
      sortKey={'sorter'}
      // pagination={{
      //   current: 3,
      //   pageSize: 10,
      //   total: dataSource.length,
      // }}
      dataSource={dataSource}
      columns={columns}
      onSortEnd={(changeNodes, newData) => {
        console.log(changeNodes, newData, 'newData');
      }}
      pagination={false}
      service={false}
    />
  );
}
