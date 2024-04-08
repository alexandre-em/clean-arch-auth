import { User } from 'src/domain/entities';
import { User as UserDocument } from '../entities/user.entity';

export class MongooseUserMapper {
  static toDomain(entity: UserDocument): User {
    const model = new User({
      id: entity._id.toString(),
      name: entity.name,
      email: entity.email,
      password: entity.password,
      description: entity.description,
      image: entity.image,
      createdAt: entity.createdAt,
    });
    return model;
  }

  static toMongoose(user: User) {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      description: user.description,
      image: user.image,
      createdAt: user.createdAt,
    };
  }
}
