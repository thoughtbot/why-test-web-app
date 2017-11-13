const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
  const order = await Order.findOne({});

  res.render('index', { order });
});

router.post('/cake-type', async (req, res) => {
  const {cakeType} = req.body;

  await Order.updateOrCreate({cakeType});

  res.status(302);
  res.redirect('/');
});

router.post('/name', async (req, res) => {
  const { name } = req.body;

  if (name) {
    const order = await Order.updateOrCreate({ name: name })

    res.status(200);
    res.render('index', { order });
  } else {
    const errors = { name: 'name is required' };
    res.status(400);
    res.render('index', { errors });
  }
});

router.post('/fillings', async (req, res) => {
  const { fillings } = req.body;

  const order = await Order.updateOrCreate({fillings});

  res.redirect('/');
});

router.post('/size', async (req, res) => {
  const { size } = req.body;

  const order = await Order.updateOrCreate({size});

  res.redirect('/');
});

module.exports = router;
