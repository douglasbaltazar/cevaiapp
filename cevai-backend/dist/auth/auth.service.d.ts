import { UserEntity } from 'src/app/user/entity/User.entity';
import { UserService } from 'src/app/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<UserEntity>;
    login(user: any): Promise<{
        token: string;
    }>;
}
