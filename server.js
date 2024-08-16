const express = require('express');
const { runBot } = require('./bot'); 

const app = express();

app.get('/run-bot', async (req, res) => {
  try {
    await runBot();
    res.send('Bot executed successfully.');
  } catch (error) {
    res.status(500).send(`Error executing bot: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});