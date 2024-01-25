const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, trim: true, required: true },
    nombreUsuario: { type: String, trim: true, required: true },
    contraseña: { type: String, trim: true, required: true },
    añoNacimiento: { type: Number, trim: true, required: true },
    rol: { type: String, enum: ['isUser', 'isAdmin'], trim: true, required: true },
    imagenPerfil: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

userSchema.pre("save", function () {
  this.contraseña = bcrypt.hashSync(this.contraseña, 10);
});

const User = mongoose.model("User", userSchema, "Users");
module.exports = User;
