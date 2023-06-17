/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import PlayerGuessSchema from '../player-guess/player-guess.schema';

const RoundSchema = new mongoose.Schema(
  {
    player_guesses: [
      {
        type: PlayerGuessSchema,
        default: [],
      },
    ],
    round_multiplier: {
      type: Number,
    },
  },
  { timestamps: true },
);

RoundSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});

export default RoundSchema;
