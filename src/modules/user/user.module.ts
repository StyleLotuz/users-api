import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
