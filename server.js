const express = require('express');
const { exec } = require('child_process');
const schedule = require('node-schedule');
const app = express();

schedule.scheduleJob('*/15 * * * *', () => {
  console.log('Running scheduled test...');
  try {
    exec('npx mocha cita3.spec.js', (error, stdout, stderr) => {
      if (error) {
        // res.send(`Error: ${stderr}`);
        console.log('error', error);
      } else if (stdout) {
        // res.send(`stdout: ${stdout}`);
        console.log('stdout', stdout);
      } else {
        // res.send(`Output: ${stderr}`);
        console.log('stderr', stderr);
      }
    });
  } catch (error) {
    console.log(error);
    
  }
  
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});