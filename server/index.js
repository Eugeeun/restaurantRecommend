const express = require('express');
const { connect } = require('./connect');
const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}!!`);
});
