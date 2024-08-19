const express = require('express');
const { runBot } = require('./bot'); 

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});