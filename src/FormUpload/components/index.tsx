import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';
import { ACCEPTS, useController } from './hooks';
import { FormUploadProps } from './typeing';

/**
 * @param baseUrl 'http://127.0.0.1:300'
 * @param serviceName 接口名字 - '/common/upload'
 * @param responseKey 接口响应唯一标识字段 - ossFilePath
 * @param accepts 接受文件类型 - ['.doc','.docx']
 * @param limitSize 限制文件大小(单位: M) - 100
 * @param headers 自定义其他额外参数
 * @param onLoadingChange 上传中状态改变
 * @param others 兼容Upload组件其他属性
 * @use Form.Item 需要加 valuePropName = 'fileList'
 */
export const FormUpload: React.FC<FormUploadProps> = (
  props: FormUploadProps,
) => {
  const { disabled, accepts = ACCEPTS, ...others } = props;
  const [state, actions] = useController(props);

  return (
    <Upload
      disabled={disabled}
      progress={{ showInfo: true, size: 'small' }}
      {...others}
      accept={accepts.join(',')}
      onChange={actions.onChange}
      beforeUpload={actions.beforeUpload}
      customRequest={actions.customRequest}
      onRemove={actions.onRemove}
    >
      <Button
        disabled={disabled}
        loading={state.loading}
        icon={<UploadOutlined />}
      >
        附件上传
      </Button>
    </Upload>
  );
};
