const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { routeMap } = require('./routes');
const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': 86400, // 预检请求的有效期，单位为秒
};
const PORT = 3000;

app.use(bodyParser.json());
app.use((_,res,next) => {
  Object.keys(HEADERS).forEach((key) => res.setHeader(key, HEADERS[key]));
  next();
})


Object.keys(routeMap).forEach(path => {
  app.post(path,routeMap[path])
})

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
