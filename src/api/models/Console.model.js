const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consoleSchema = new Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    company: { type: String, trim: true, required: true},
    year: { type: Number, trim: true, required: true },
    popularVideogames: [{ type: mongoose.Types.ObjectId, ref: 'Game' }],
  },
  {
    timestamps: true,
    collection: "Consoles",
  }
);

const Console = mongoose.model('Console', consoleSchema, 'Consoles');
module.exports = Console;