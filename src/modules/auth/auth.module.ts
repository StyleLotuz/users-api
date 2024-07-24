import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/profile.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User, Profile])],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
