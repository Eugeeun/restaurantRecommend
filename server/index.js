const express = require('express');
const { connect } = require('./connect');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/review', require('./routes/review'));
app.use('/api/users', require('./routes/users'));
app.use('/api/visited', require('./routes/visited'));

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}!!`);
});
