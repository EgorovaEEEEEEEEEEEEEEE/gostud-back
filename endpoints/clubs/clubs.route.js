const express = require('express');
const router = express.Router({ mergeParams: true });
const jwtAuth = require('../../jwtAuth/jwtAuth');
const clubsController = require('./clubs.controller');

// router.post('/', jwtAuth.auth, clubsController.createClub);
router.get('/', clubsController.getClubs);
router.get('/:clubhandle', clubsController.getClub);

module.exports = router;