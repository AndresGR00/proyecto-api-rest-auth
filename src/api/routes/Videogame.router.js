const express = require('express');
const router = express.Router();
const videogameController = require('../controllers/Videogame.controller');
const { isAuth, isAdmin } = require("../../middlewares/auth");

router.get('/videogames', [isAuth], videogameController.getAllVideogames);
router.post('/create-videogame', videogameController.createAVideogame);
router.put('/edite-videogame/:id', [isAdmin], videogameController.editAVideogame);
router.delete('/delete-videogame/:id', [isAdmin], videogameController.deleteAVideogame);

module.exports = router;