const express = require('express');
const router = express.Router();
const { connect } = require('../connect');

router.post('/insertOrUpdate', (req, res) => {
  const query = `insert into restaurant values (${req.body.id} ,0 , 0) on duplicate key update impression_count=impression_count+1;`;
  connect.query(query, (err, rows, fields) => {
    if (err) res.status(400).json({ success: false });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
