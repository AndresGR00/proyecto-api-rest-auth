const express = require("express");
const router = express.Router();
const consoleController = require("../controllers/Console.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth");

router.get("/consoles", [isAuth], consoleController.getAllConsoles);
router.post("/create-console", [isAdmin], consoleController.postNewConsole);
router.put("/edite-console/:id", [isAdmin], consoleController.editAConsole);
router.delete(
  "/delete-console/:id",
  [isAdmin],
  consoleController.deleteAConsole
);

module.exports = router;
