/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { ModuleNames } from 'src/utils/config/server.config';

const MessageSchema = new mongoose.Schema(
  {
    game_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModuleNames.GAME,
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
