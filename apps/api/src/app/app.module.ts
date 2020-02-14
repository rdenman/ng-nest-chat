import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
        Logger.log(configService.get<string>('MONGODB_URI'), 'Mongoose Initialization');
        return {
          uri: configService.get<string>('MONGODB_URI'),
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    AuthModule,
    ChatModule,
    UserModule,
  ],
})
export class AppModule {}
