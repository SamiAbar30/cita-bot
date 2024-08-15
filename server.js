const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/', (req, res) => {
  exec('npx mocha cita2.spec.js', (error, stdout, stderr) => {
    if (error) {
      res.send(`Error: ${stderr}`);
    } else {
      res.send(`Output: ${stdout}`);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});