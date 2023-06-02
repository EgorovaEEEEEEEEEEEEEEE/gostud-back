const express = require('express');
const router = express.Router({ mergeParams: true });
const jwtAuth = require('../jwtAuth/jwtAuth');
const userClubsController = require('../controllers/user-clubs.controller');

// router.post('/', jwtAuth.auth, clubsController.createClub);
router.get('/', userClubsController.getClubs);
router.get('/:clubhandle', userClubsController.getClub);
router.post('/:clubhandle', userClubsController.subToClub);
router.delete('/:clubhandle', userClubsController.unsubFromClub);

module.exports = router;