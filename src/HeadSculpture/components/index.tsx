import { Avatar, Button } from 'antd';
import { useState } from 'react';

export const HeadSculpture = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const openFolderFile = async () => {
    try {
      const w = window as any;
      const handle = await w.showOpenFilePicker();
      const file = await handle[0].getFile();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.onerror = (error) => {};
    } catch (e) {
      console.log(e, 'e');
    }
  };

  return (
    <>
      <Avatar size={80} src={<img src={avatarUrl} alt="avatar" />} />
      <Button onClick={openFolderFile}>打开文件夹</Button>
    </>
  );
};
