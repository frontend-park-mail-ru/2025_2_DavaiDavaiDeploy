import express from 'express';

const app = express();

app.use('/src', express.static('src'));
app.use('/public', express.static('public'));

app.get('/', (_, response) => {
  response.sendFile("/index.html", {'root': './'});
});

app.listen(3000, () => {
  console.log('Server running on http://127.0.0.1:3000');
});