/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true },
);

PlayerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});

export default PlayerSchema;
