import { useState } from 'react';
import {SearchSelect} from './components';
interface UserValue {
  label: string;
  value: string;
}
const API_BASE_URL = 'http://localhost:3000';
const API_URL = '/options';

export default () => {
  const [value, setValue] = useState<UserValue[]>([]);
  return (
    <SearchSelect
      mode="multiple"
      // value={value}
      placeholder="Select users"
      // onChange={(newValue) => {
      //   setValue(newValue as UserValue[]);
      // }}
      style={{ width: 400 }}
      fetchOptions={(username) => {
        console.log(username);

        return fetch(API_BASE_URL + API_URL, {
          method: 'POST',
          body: JSON.stringify({
            keyword: username,
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => response.json()).then(res => res.data).catch(() => {});
      }}
    />
  );
};
