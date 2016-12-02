import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import {Request, Response, NextFunction} from 'express';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IUserModel extends mongoose.Document {
  name: string;
  email: string;
  url: string;
  admin: boolean;
  editor: boolean;
  linguist: boolean;
  passwordResetToken: string;
  passwordResetExpires: Date;
}

let schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
}

let schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  editor: {
    type: Boolean,
    default: false,
  },
  liguist: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, schemaOptions).pre('save', (next) => {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      this.password = hash;
      next();
    });
  });
});

schema.statics.isLogged = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.isAuthenticated) {
    return next();
  }
  res.redirect('/sign-in');
};

interface IRequest extends Request {
  isAuthenticated: boolean;
}
