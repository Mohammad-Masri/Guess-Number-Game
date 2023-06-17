/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const GameSchema = new mongoose.Schema(
  {
    game_id: {
      type: String,
    },
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
