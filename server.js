const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/test', (req, res) => {
  exec('npx mocha cita3.spec.js', (error, stdout, stderr) => {
    if (error) {
      res.send(`Error: ${stderr}`);
    } else {
      res.send(`Output: ${stdout}`);
    }
  });
});
app.get('/resp', (req, res) => {
  res.send(`hello: 11111111111`);
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});