/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import PlayerSchema from '../player/player.schema';

const PlayerGuessSchema = new mongoose.Schema(
  {
    player: {
      type: PlayerSchema,
    },
    multiplier: {
      type: Number,
    },
    points: {
      type: Number,
    },
  },
  { timestamps: true },
);

PlayerGuessSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});

export default PlayerGuessSchema;
