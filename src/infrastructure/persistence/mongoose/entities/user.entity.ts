import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date, default: null })
  emailVerifiedAt?: Date;

  @Prop({ default: null })
  image: string;

  @Prop()
  description?: string;

  // Tiers ids
  @Prop({ default: null })
  googleId: string;

  @Prop({ default: null })
  facebookId: string;

  @Prop({ default: null })
  stripeId: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop()
  postal?: string;

  @Prop()
  country?: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: null })
  deletedAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ default: null, type: Date, expires: 0 })
  expireAt: Date;

  //
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Park' }] })
  // parks: Park[];
  //
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }] })
  // reservations: Reservation[];
  //
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Park' }] })
  // favorites: Park[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };

UserSchema.path('email').validate(function (email: string) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return emailRegex.test(email);
}, 'The email format is incorrect');

UserSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
