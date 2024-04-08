import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule, EnvService } from 'src/infra/env';
import { UserSchema } from './entities/user.entity';
import { BcryptModule } from 'src/infra/services/bcrypt/bcrypt.module';
import { User } from 'src/domain/entities';
import { UserRepository } from 'src/application/user/ports/user.repository';
import { MongooseUserRepository } from './repository/user.repository';
import { BcryptService } from 'src/infra/services/bcrypt/bcrypt.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvModule, BcryptModule],
      useFactory: (envService: EnvService) => ({
        uri: envService.get('DATABASE_URL'),
      }),
      inject: [EnvService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      //     { name: Product.name, schema: ProductSchema },
      //     { name: Order.name, schema: OrderSchema },
      //     { name: OrderProduct.name, schema: OrderProductSchema },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: MongooseUserRepository,
    },
    BcryptService,
  ],
  exports: [UserRepository],
})
export class MongoModule {}
