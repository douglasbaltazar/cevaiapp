import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const userEntityList: UserEntity[] = [
    new UserEntity({
      createdAt: undefined,
      deletedAt: undefined,
      email: 'douglasbaltazar1@douglas.com',
      events: undefined,
      firstName: 'Douglas',
      gender: undefined,
      id: '1',
      lastName: 'Teste',
      password: undefined,
      status: undefined,
      updatedAt: undefined,
    }),
    new UserEntity({
      createdAt: undefined,
      deletedAt: undefined,
      email: 'diego@gmail.com',
      events: undefined,
      firstName: 'Diego',
      gender: undefined,
      id: '2',
      lastName: 'Teste',
      password: undefined,
      status: undefined,
      updatedAt: undefined,
    }),
    new UserEntity({
      createdAt: undefined,
      deletedAt: undefined,
      email: 'joaquim@gmail.com',
      events: undefined,
      firstName: 'Joaquim',
      gender: undefined,
      id: '3',
      lastName: 'Teste',
      password: undefined,
      status: undefined,
      updatedAt: undefined,
    }),
  ];

  const newUserEntity = new UserEntity({
    email: 'dougla@teste.com',
    firstName: 'Douglas',
    gender: 'Masculino',
    lastName: 'Baltazar',
    password: '123123',
    status: 1,
  });
  const updatedUserEntity = new UserEntity({
    email: 'dougla@teste.com',
    firstName: 'Dogla',
    gender: 'Masculino',
    lastName: 'Baltazar',
    password: '123123',
    status: 1,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userEntityList),
            findOne: jest.fn().mockResolvedValue(userEntityList[0]),
            findOneByEmail: jest.fn(),
            create: jest.fn().mockResolvedValue(newUserEntity),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            deleteById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();
    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('index', () => {
    it('should return a user list entity successfully', async () => {
      const result = await userController.index();
      expect(result).toEqual(userEntityList);
      expect(typeof result).toEqual('object');
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(userController.index()).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get an user successfully', async () => {
      // Act
      const result = await userController.show('1');
      // Assert
      expect(result).toEqual(userEntityList[0]);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
      expect(userService.findOne).toHaveBeenCalledWith('1');
    });
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(userController.show('1')).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateUserDto = {
      email: 'dougla@teste.com',
      firstName: 'Douglas',
      gender: 'Masculino',
      lastName: 'Baltazar',
      password: '123123',
      status: 1,
    };
    it('should create a new user', async () => {
      // Arrange

      // Act
      const result = await userService.create(body);

      // Assert
      expect(result).toEqual(newUserEntity);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'create').mockRejectedValue(new Error());

      expect(userController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const body: UpdateUserDto = {
      email: 'dougla@teste.com',
      firstName: 'Dogla',
      gender: 'Masculino',
      lastName: 'Baltazar',
      password: '123123',
      status: 1,
    };
    it('should update an user item successfully', async () => {
      // Act
      const result = await userController.update('1', body);
      // Assert
      expect(result).toEqual(updatedUserEntity);
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(userController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove an user item successfully', async () => {
      // Act
      const result = await userController.destroy('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(userService, 'deleteById').mockRejectedValueOnce(new Error());

      // Assert
      expect(userController.destroy('1')).rejects.toThrowError();
    });
  });
});
