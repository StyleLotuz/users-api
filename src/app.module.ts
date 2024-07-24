import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import typeOrmConfig from './config/typeorm'
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig]
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      configService.get('typeorm')
  }),
  TypeOrmModule.forFeature([User, Profile]),
  AuthModule,
  UserModule,
  ProfileModule
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule { }
