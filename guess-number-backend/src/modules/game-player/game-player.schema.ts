/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import PlayerSchema from '../player/player.schema';

const GamePlayerSchema = new mongoose.Schema(
  {
    player: {
      type: PlayerSchema,
    },
    rank: {
      type: Number,
    },
    points: {
      type: Number,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

GamePlayerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});

export default GamePlayerSchema;
