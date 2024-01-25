const Console = require("../models/Console.model");

//Get All
const getAllConsoles = async (req, res, next) => {
  try {
    const allConsoles = await Console.find().populate('popularVideogames');
    return res.status(200).json(allConsoles);
  } catch (error) {
    return res.status(404).json("Consoles not found");
  }
};

//Post
const postNewConsole = async (req, res, next) => {
  try {
    const newConsole = new Console({
      name: req.body.name,
      company: req.body.company,
      year: req.body.year,
      popularVideogames: req.body.popularVideogames,
    });

    const createNewConsole = await newConsole.save();
    return res.status(201).json(createNewConsole);
  } catch (error) {
    next(error);
  }
};

//Put
const editAConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldConsole = await Console.findById(id);
    const editedConsole = new Console(req.body);
    editedConsole._id = id;
    editedConsole.popularVideogames = [
      ...oldConsole.popularVideogames,
      req.body.popularVideogames,
    ];
    const updatedConsole = await Console.findByIdAndUpdate(id, editedConsole, {
      new: true,
    });
    return res.status(200).json(updatedConsole);
  } catch (error) {
    return next(error);
  }
};

//Delete
const deleteAConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Console.findByIdAndDelete(id);
    return res.status(200).json("Console deleted");
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllConsoles, postNewConsole, editAConsole, deleteAConsole };
