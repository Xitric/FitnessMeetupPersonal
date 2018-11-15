var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res, next) {
    res.render('meetupDetails', {
        title: 'Cycling for beginners',
        date: '14/11 2018 12:45',
        owner: {name: 'Kasper Schultz Davidsen'}
    })
});

module.exports = router;
