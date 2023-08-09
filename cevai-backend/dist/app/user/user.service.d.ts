import { Repository } from 'typeorm';
import { UserEntity } from './entity/User.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    findOneByEmail(email: string): Promise<UserEntity>;
    create(data: CreateUserDto): Promise<UserEntity>;
    update(id: string, data: UpdateUserDto): Promise<UserEntity>;
    deleteById(id: string): Promise<void>;
}
