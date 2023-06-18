/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import PlayerSchema from '../player/player.schema';

const MessageSchema = new mongoose.Schema(
  {
    game_id: {
      type: String,
    },
    player: {
      type: PlayerSchema,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

MessageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});

export default MessageSchema;
