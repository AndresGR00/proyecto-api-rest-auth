const { generateSign } = require("../../config/jwt");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

//Get All
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(404).json("Users not found");
  }
};

//Post - Register a new user
const createAnUser = async (req, res, next) => {
  try {
    const newUser = new User({
      email: req.body.email,
      nombreUsuario: req.body.nombreUsuario,
      contraseña: req.body.contraseña,
      añoNacimiento: req.body.añoNacimiento,
      rol: req.body.rol,
      imagenPerfil: req.body.imagenPerfil,
    });

    const userDuplicated = await User.findOne({ email: req.body.email });

    if(userDuplicated){
      return res.status(400).json("This email already exists");
    }

    const createNewUser = await newUser.save();
    return res.status(201).json(createNewUser);
  } catch (error) {
    return next(error);
  }
};

//Post - Login User
const loginUser = async (req, res, next) =>{
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("Email or password is incorrect");
    }
    if(bcrypt.compareSync(req.body.contraseña, user.contraseña)){
      const token = generateSign(user._id);
      return res.status(200).json( {user, token} )
    } else {
      return res.status(400).json("Email or password is incorrect");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
}

//Put
const editAnUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editedUser = new User(req.body);
    editedUser._id = id;
    const updatedUser = await User.findByIdAndUpdate(id, editedUser, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

//Delete
const deleteAnUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json("User deleted");
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllUsers, createAnUser, loginUser, editAnUser, deleteAnUser };
