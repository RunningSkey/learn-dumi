const fs = require('fs');
const FOLDER = './uploads';

const routeMap = {
  '/upload': (req, res) => {
    let data = Buffer.alloc(0);
    req.on('data', (chunk) => {
      data = Buffer.concat([data, chunk]);
    });
    const fileName = decodeURIComponent(req.headers['content-disposition']);
    const filePath = `${FOLDER}/${fileName}`; // 指定保存路径
    req.on('end', () => {
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          console.log(err,'rr');
          res.statusCode = 500;
          res.end('An error occurred while saving the file.');
        } else {
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              success: true,
              data: {
                fileName,
                filePath,
              },
            }),
          );
        }
      });
    });
  },
  '/text-stream': (_, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    let index = 10; // 重复发送的次数
    const t = setInterval(() => {
      const text = 'This is some sample text. ' + new Date().toLocaleString(); // 要发送的文本数据
      if (!index) {
        res.end('is end!' + '\n');
        clearInterval(t);
        return;
      }
      res.write(text + '\n');
      index--;
    }, 500);
  },
  '/options': (req, res) => {
    const body = req.body;
    const options = require('./database/options.json');
    const data = options.filter((i) => i.label.includes(body.keyword));
    setTimeout(() => {
      res.send(
        JSON.stringify({
          data: body.keyword === 'default' ? options : data,
          success: true,
        }),
      );
    }, 2000);
  },
  '*': (_, res) => {
    res.statusCode = 404;
    res.send('Not found.');
  },
};

module.exports = {
  routeMap,
};
