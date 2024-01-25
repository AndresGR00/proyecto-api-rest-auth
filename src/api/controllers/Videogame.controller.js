const Videogame = require("../models/Videogame.model");

//Get All
const getAllVideogames = async (req, res, next) => {
  try {
    const allVideogames = await Videogame.find().populate('availabilityConsoles');
    return res.status(200).json(allVideogames);
  } catch (error) {
    return res.status(404).json("Videogames not found");
  }
};

//Post
const createAVideogame = async (req, res, next) => {
  try {
    const newVideogame = new Videogame({
      name: req.body.name,
      genre: req.body.genre,
      year: req.body.year,
      availabilityConsoles: req.body.availabilityConsoles,
    });
    const createNewVideogame = await newVideogame.save();
    return res.status(201).json(createNewVideogame);
  } catch (error) {
    next(error);
  }
};

//Put
const editAVideogame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldVideogame = await Videogame.findById(id);
    const editedVideogame = new Videogame(req.body);
    editedVideogame._id = id;
    editedVideogame.availabilityConsoles = [
      ...oldVideogame.availabilityConsoles,
      req.body.availabilityConsoles,
    ];
    const updatedVideogame = await Videogame.findByIdAndUpdate(
      id,
      editedVideogame,
      { new: true }
    );
    return res.status(200).json(updatedVideogame);
  } catch (error) {
    return next(error);
  }
};

//Delete
const deleteAVideogame = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Videogame.findByIdAndDelete(id);
    return res.status(200).json("Videogame deleted");
  } catch (error) {
    return next(error)
  }
};

module.exports = { getAllVideogames, createAVideogame, editAVideogame, deleteAVideogame }
