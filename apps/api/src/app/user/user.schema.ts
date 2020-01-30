import { IUser } from '@ng-nest-chat/api-interfaces';
import { compare, genSalt, hash } from 'bcrypt';
import { Document, HookNextFunction, Schema } from 'mongoose';

export interface IUserDocument extends Document, IUser {}
export interface IUserModel extends IUserDocument {
  checkPassword: (attempt: string) => Promise<boolean>;
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
