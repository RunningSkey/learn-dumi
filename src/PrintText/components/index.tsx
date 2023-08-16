import { Button } from 'antd';
import { useRef, useState } from 'react';
import './style.less';

const fetchStream = (url, params, { onProgress, onError }) => {
  let text = '';
  const read = async (reader) => {
    const { done, value } = await reader.read();
    const decoder = new TextDecoder();
    const chunkText = decoder.decode(value);
    text += chunkText;
    onProgress(done, text, chunkText);
    if (!done) {
      return read(reader);
    }
  };
  return fetch(url, params)
    .then((response) => response.body?.getReader())
    .then(read)
    .catch(onError);
};

export const PrintText = ({ thunk = 2, speed = 50, baseUrl, serviceName }) => {
  const [string, setString] = useState('');
  const [loading, setLoading] = useState(false);
  const workRef = useRef<{
    currentIndex: number;
    text: string;
    setInterval: any;
  }>({
    currentIndex: 0,
    text: '',
    setInterval: null,
  });
  const start = (done) => {
    workRef.current.setInterval = setInterval(() => {
      const work = workRef.current;
      if (work.currentIndex + thunk >= work.text.length) {
        work.currentIndex = work.text.length;
      } else {
        work.currentIndex += thunk;
      }
      setString(work.text.slice(0, work.currentIndex));
      if (work.currentIndex >= work.text.length) {
        if (done) setLoading(false);
        clearInterval(work.setInterval);
      }
    }, speed);
  };

  const getData = () => {
    workRef.current.text = '';
    workRef.current.currentIndex = 0;
    setLoading(true);
    fetchStream(
      baseUrl + serviceName,
      {
        method: 'POST',
      },
      {
        onProgress: (done, text) => {
          workRef.current.text = text;
          clearInterval(workRef.current.setInterval);
          start(done);
        },
        onError: () => {
          clearInterval(workRef.current.setInterval);
          setLoading(false);
        },
      },
    );
  };

  return (
    <div>
      <Button loading={loading} onClick={getData}>
        start
      </Button>
      <div className={`text ${loading ? 'loading' : ''}`}>{string}</div>
    </div>
  );
};
