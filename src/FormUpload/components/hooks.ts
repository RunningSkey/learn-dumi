import { Upload, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FileItem, FormUploadProps, onProgressInfo } from './typeing';
import { getExtension, getSizeMb, uploadFile } from './util';
export const ACCEPTS = [
  '.doc',
  '.docx',
  '.pdf',
  '.xls',
  '.xlsx',
  '.exe',
  '.msi',
];
export const LIMIT_SIZE = 1024; // 100M

export const useController = (props: FormUploadProps) => {
  const {
    onChange: propsOnchange,
    onLoadingChange,
    baseUrl,
    serviceName,
    responseKey,
    accepts = ACCEPTS,
    limitSize = LIMIT_SIZE,
    headers = {},
  } = props;
  const fileListRef = useRef<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const onChange = ({ fileList }) => {
    const newFileList: FileItem[] = [];
    fileList.forEach((item: FileItem) => {
      if (item.response && item.status === 'done') {
        newFileList.push({
          ...item.response,
          name: item.name,
          fileName: item.name,
          ossKey: item.response[responseKey],
          url: baseUrl + item.response[responseKey],
        });
      } else if (item.status !== 'error' && item.status !== 'removed') {
        newFileList.push(item);
      }
    });
    setLoading(!!fileList?.find((file) => file.status === 'uploading'));
    //调用Form传递下来的 onChange事件 把数据给Form实例保管
    propsOnchange?.(newFileList);
    fileListRef.current = newFileList;
  };
  const onProgress =
    (params) =>
    ({ xhr, percent, data }: onProgressInfo) => {
      const files = [...(fileListRef.current || [])];
      const file = files.find((item) => item.uid === params.file.uid);
      if (!file) return;
      file.xhr = xhr;
      file.percent = percent;
      onChange?.({ fileList: files });
      if (percent !== 100) return;
      // percent === 100 过渡效果
      setTimeout(() => {
        params.onSuccess(data!.data);
      }, 500);
    };
  const customRequest = async (params: any) => {
    const file = new FormData();
    file.append('file', params.file);

    await uploadFile({
      url: baseUrl + serviceName,
      formData: file,
      fileName: params.file.name,
      headers: headers,
      onProgress: onProgress(params),
      onError: params.onError,
    });
  };

  const beforeUpload = (file: any) => {
    if (
      !accepts.find(
        (item) => item.toLocaleLowerCase() === getExtension(file.name),
      )
    ) {
      notification.error({
        message: `文件格式不支持！请上传格式为 ${accepts.join(',')} 的文件`,
      });
      return Upload.LIST_IGNORE;
    }
    if (getSizeMb(file.size || 0) > limitSize) {
      notification.error({
        message: `文件过大！请上传大小不超过 ${limitSize}M 的文件`,
      });
      return Upload.LIST_IGNORE;
    }
    return file;
  };

  const onRemove = (file: any) => {
    if (file.xhr) file.xhr.abort();
  };

  useEffect(
    () => () => {
      fileListRef.current.forEach((file) => {
        if (file.status === 'uploading') file.xhr?.abort();
      });
    },
    [],
  );
  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading]);

  return [
    {
      loading,
    },
    {
      onRemove,
      beforeUpload,
      customRequest,
      onChange,
      setLoading,
    },
  ];
};
