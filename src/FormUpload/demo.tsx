import { Button, Form } from 'antd';
import { useState } from 'react';
import { FormUpload } from './components';
const API_BASE_URL = 'http://localhost:3000';
const API_URL = '/upload';

export default () => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          console.log(form.getFieldsValue());
        }}
        loading={uploading}
      >
        获取结果
      </Button>
      <Form form={form}>
        <Form.Item
          initialValue={[
            {
              fileName: 'node-v13.0.1-x64 - 副本.msi',
              filePath: './uploads/node-v13.0.1-x64 - 副本.msi',
              name: 'node-v13.0.1-x64 - 副本.msi',
              ossKey: './uploads/node-v13.0.1-x64 - 副本.msi',
              uid: '__AUTO__1688909349556_0__',
            },
          ]}
          name={'fileList'}
          valuePropName={'fileList'}
          label={'附件'}
        >
          <FormUpload
            baseUrl={API_BASE_URL}
            serviceName={API_URL}
            onLoadingChange={setUploading}
            multiple
            responseKey="filePath"
          />
        </Form.Item>
      </Form>
    </div>
  );
};
