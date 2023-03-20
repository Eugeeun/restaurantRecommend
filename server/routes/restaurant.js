const express = require('express');
const router = express.Router();
const { connect } = require('../connect');

router.post('/insertOrUpdate', (req, res) => {
  const query = `insert into restaurant values (
    ${req.body.id},
    1,
    0,
    '${req.body.category_name}',
    '${req.body.phone}',
    '${req.body.place_name}',
    '${req.body.place_url}',
    '${req.body.y}',  
    '${req.body.x}')
    on duplicate key update impression_count=impression_count+1;`;
  connect.query(query, (err, rows, fields) => {
    if (err) res.status(400).json({ success: false });
    res.status(200).json({ success: true });
  });
});

router.post('/visitRestaurant', (req, res) => {
  const query = `update restaurant set VISIT_COUNT = VISIT_COUNT+1 WHERE ID = ${req.body.id};`;
  connect.query(query, (err, rows, fields) => {
    if (err) res.status(400).json({ success: false });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
