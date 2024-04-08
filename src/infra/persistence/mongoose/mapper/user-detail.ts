import { User } from 'src/domain/entities';

import { User as UserDocument } from '../entities/user.entity';

type UserWithOrderDocument = UserDocument; // & { favorites?: Parks[] }

export class MongooseUserDetailsMapper {
  static toDomain(entity: UserWithOrderDocument): User {
    const model = new User({
      id: entity._id.toString(),
      name: entity.name,
      email: entity.email,
      password: entity.password,
      emailVerifiedAt: entity.emailVerifiedAt,
      description: entity.description,
      image: entity.image,

      googleId: entity.googleId,
      facebookId: entity.facebookId,
      stripeId: entity.stripeId,

      address: entity.address,
      city: entity.city,
      postal: entity.postal,
      country: entity.country,
      phone: entity.phone,

      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
      updatedAt: entity.updatedAt,

      // orders: !!entity.orders ? entity.orders.map((order) => MongooseOrderMapper.toDomain(order)) : [],
    });
    return model;
  }

  static toMongoose(user: User) {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      emailVerifiedAt: user.emailVerifiedAt,
      description: user.description,
      image: user.image,

      googleId: user.googleId,
      facebookId: user.facebookId,
      stripeId: user.stripeId,

      address: user.address,
      city: user.city,
      postal: user.postal,
      country: user.country,
      phone: user.phone,

      createdAt: user.createdAt,
      deletedAt: user.deletedAt,
      updatedAt: user.updatedAt,
    };
  }
}
