const express = require('express');
const router = express.Router({ mergeParams: true });
const jwtAuth = require('../jwtAuth/jwtAuth');
const adminClubController = require('../controllers/admin-clubs.controller');

// router.post('/', jwtAuth.auth, clubsController.createClub);
router.get('/', adminClubController.getClubs);
router.get('/:clubhandle', adminClubController.getClub);
router.post('/', adminClubController.createClub);
router.put('/:clubhandle', adminClubController.updateClub);
router.delete('/:clubhandle', adminClubController.deleteClub);

module.exports = router;