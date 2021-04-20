var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	let myArr = [
    {'id': 123, 'name': 'apples', 'total': 30},
    {'id': 541, 'name': 'oranges', 'total': 42},
    {'id': 300, 'name': 'bananas', 'total': 18}
];
  res.send(myArr);
});

module.exports = router;
