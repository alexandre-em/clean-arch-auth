import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { UserRepository } from 'src/application/user/ports/user.repository';
import { DATA_DELETION_DELAY_EXPIRATION } from 'src/core/constants';
import { User } from 'src/domain/entities';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';

import { User as UserMongoose } from '../entities/user.entity';
import { MongooseUserMapper } from '../mapper/user';
import { MongooseUserDetailsMapper } from '../mapper/user-detail';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserMongoose.name) private readonly userModel: Model<UserMongoose>,
    private readonly bcryptService: BcryptService,
  ) {}

  async findById(id: string): Promise<User | Error> {
    const findQuery = await this.userModel.findById(id);
    // .populate(['favorites']);

    if (!findQuery?.email) {
      return new NotFoundException('User not found');
    }

    return MongooseUserDetailsMapper.toDomain(findQuery as UserMongoose);
  }

  async findByEmail(email: string): Promise<User | Error> {
    const findQuery = await this.userModel.findOne({ email }).exec();
    // .populate(['favorites']);
    //
    if (!findQuery) return new NotFoundException('user not found');

    return MongooseUserDetailsMapper.toDomain(findQuery as UserMongoose);
  }

  async create(user: User): Promise<User> {
    const data = MongooseUserMapper.toMongoose(user);
    const encryptedPassword = await this.bcryptService.hash(user.password!);
    const entity = new this.userModel({ ...data, password: encryptedPassword });
    await entity.save();

    return MongooseUserMapper.toDomain(entity);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const dataClone = { ...data };

    if (dataClone.password) {
      dataClone.password = await this.bcryptService.hash(data.password!);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true });

    return MongooseUserMapper.toDomain(updatedUser as UserMongoose);
  }

  async delete(id: string): Promise<User> {
    // Computing the date the user will be definitely removed from db
    const date = new Date();
    const expireAt = new Date(date.setDate(date.getDate() + DATA_DELETION_DELAY_EXPIRATION));

    const deletedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
        expireAt,
      },
      { new: true },
    );

    return MongooseUserMapper.toDomain(deletedUser as UserMongoose);
  }

  async appendFavorite(id: string, park: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        $push: { favorites: new mongoose.Types.ObjectId(park) },
      },
      { new: true },
    );

    return MongooseUserMapper.toDomain(updatedUser as UserMongoose);
  }

  async appendPark(id: string, park: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        $push: { favorites: new mongoose.Types.ObjectId(park) },
      },
      { new: true },
    );

    return MongooseUserMapper.toDomain(updatedUser as UserMongoose);
  }

  async appendReservation(id: string, reservation: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        $push: { favorites: new mongoose.Types.ObjectId(reservation) },
      },
      { new: true },
    );

    return MongooseUserMapper.toDomain(updatedUser as UserMongoose);
  }
}
