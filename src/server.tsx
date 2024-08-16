import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const appString = renderToString(<App />);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My SSR App</title>
      </head>
      <body>
        <div id="root">${appString}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
