import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    index(): Promise<import("./entity/User.entity").UserEntity[]>;
    create(body: CreateUserDto): Promise<import("./entity/User.entity").UserEntity>;
    show(id: string): Promise<import("./entity/User.entity").UserEntity>;
    update(id: string, body: UpdateUserDto): Promise<import("./entity/User.entity").UserEntity>;
    destroy(id: string): Promise<void>;
}
