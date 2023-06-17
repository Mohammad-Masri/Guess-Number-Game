/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import GamePlayerSchema from '../game-player/game-player.schema';
import RoundSchema from '../round/round.schema';

const GameSchema = new mongoose.Schema(
  {
    game_id: {
      type: String,
    },
    players: [
      {
        type: GamePlayerSchema,
        default: [],
      },
    ],
    rounds: [
      {
        type: RoundSchema,
        default: [],
      },
    ],
  },
  { timestamps: true },
);

GameSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});

export default GameSchema;
