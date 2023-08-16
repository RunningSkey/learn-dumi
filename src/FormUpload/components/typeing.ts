import type { UploadFile, UploadProps } from 'antd';

export interface FileItem extends UploadFile {
  name: string;
  fileName: string;
  ossKey: string;
  xhr?: XMLHttpRequest;
}
export interface FormUploadProps
  extends Omit<
    UploadProps,
    'accept' | 'beforeUpload' | 'onChange' | 'customRequest' | 'onRemove'
  > {
  baseUrl: string;
  serviceName: string;
  responseKey: string;
  accepts?: string[];
  limitSize?: number;
  headers?: Record<string, string>;
  showBtn?: boolean;
  onChange?: (file: FileItem[]) => void;
  onLoadingChange?: (loading: boolean) => void;
}
export type onProgressInfo = {
  xhr: XMLHttpRequest;
  percent: number;
  data?: { data: any };
};
export type uploadFileParams = {
  url: string;
  formData: FormData;
  fileName: string;
  headers: Record<string, string>;
  onProgress: (info: onProgressInfo) => void;
  onError: (error: string | ProgressEvent<EventTarget>) => void;
};
