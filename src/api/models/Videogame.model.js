const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    genre: { type: String, trim: true, required: true},
    year: { type: Number, trim: true, required: true },
    availabilityConsoles: [{ type: mongoose.Types.ObjectId, ref: 'Console' }],
  },
  {
    timestamps: true,
    collection: "Games",
  }
);

const Game = mongoose.model('Game', gameSchema, 'Games');
module.exports = Game;