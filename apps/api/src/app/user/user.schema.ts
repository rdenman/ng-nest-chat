import { IUser } from '@ng-nest-chat/api-interfaces';
import { compare, genSalt, hash } from 'bcrypt';
import { Document, HookNextFunction, Schema } from 'mongoose';

export interface IUserDocument extends Document, IUser {}
export interface IUserModel extends IUserDocument {
  checkPassword: (attempt: string) => Promise<boolean>;
  addToken: (token: string) => Promise<void>;
  removeToken: (token: string) => Promise<void>;
}

export const UserSchema: Schema<IUserModel> = new Schema<IUserModel>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  display: {
    type: String,
    required: true,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.pre<IUserDocument>('save', function(next: HookNextFunction): void {
  const user: IUserDocument = this;
  if (!user.isModified('password')) {
    return next();
  }

  genSalt(10, (error: Error, salt: string) => {
    if (error) {
      return next(error);
    }
    hash(user.password, salt, (err: Error, encrypted: string) => {
      if (err) {
        return next(error);
      }
      user.password = encrypted;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function(attempt: string): Promise<boolean> {
  const user: IUserDocument = this;
  return compare(attempt, user.password);
};

UserSchema.methods.addToken = function(token: string): Promise<void> {
  const user: IUserDocument = this;
  user.tokens = user.tokens.concat([{ access: 'auth', token }]);
  return user.save().then(_ => {});
};

UserSchema.methods.removeToken = function(token: string): Promise<void> {
  const user: IUserDocument = this;
  return user
    .updateOne({
      $pull: {
        tokens: { token },
      },
    })
    .then(_ => {});
};
