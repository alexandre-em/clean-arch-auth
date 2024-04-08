import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule } from './mongoose/mongo.module';
// import { PrismaModule } from './prisma/prisma.module';

interface DatabaseOptions {
  type: 'prisma' | 'mongoose';
  global?: boolean;
}

@Module({})
export class PersistenceModule {
  static async register({ global = false, type }: DatabaseOptions): Promise<DynamicModule> {
    return {
      global,
      module: PersistenceModule,
      imports: [type === 'mongoose' ? MongoModule : MongoModule],
      exports: [type === 'mongoose' ? MongoModule : MongoModule], // Add prisma case if needed
    };
  }
}
