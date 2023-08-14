import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let usersRepository: Repository<UserEntity>;

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

  const updatedUserEntity = new UserEntity({
    email: 'dougla@teste.com',
    firstName: 'Dogla',
    gender: 'Masculino',
    lastName: 'Baltazar',
    password: '123123',
    status: 1,
  });

  const newUserEntity = new UserEntity({
    email: 'dougla@teste.com',
    firstName: 'Dogla',
    gender: 'Masculino',
    lastName: 'Baltazar',
    password: '123123',
    status: 1,
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userEntityList),
            findOneByOrFail: jest.fn().mockResolvedValue(userEntityList[0]),
            findOne: jest.fn().mockResolvedValue(userEntityList[1]),
            create: jest.fn().mockReturnValue(newUserEntity),
            merge: jest.fn().mockReturnValue(updatedUserEntity),
            save: jest.fn().mockResolvedValue(userEntityList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an user list entity successfully', async () => {
      // Act
      const result = await userService.findAll();

      // Assert
      expect(result).toEqual(userEntityList);
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(usersRepository, 'find').mockRejectedValueOnce(new Error());
      // Assert
      expect(userService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a user item successfully', async () => {
      // Act
      const result = await userService.findOne('1');
      // Assert
      expect(result).toEqual(userEntityList[0]);
      expect(usersRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(usersRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(userService.findOne('1')).rejects.toThrowError(NotFoundException);
    });
  });
  describe('create', () => {
    const data: CreateUserDto = {
      email: 'dougla1@teste.com',
      firstName: 'Douglas',
      gender: 'Masculino',
      lastName: 'Baltazar',
      password: '123123',
      status: 1,
    };
    it('should create an user entity item successfully', async () => {
      // Act
      const result = await userService.create(data);

      // Assert
      expect(result).toEqual(userEntityList[0]);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', () => {
      // Act
      jest.spyOn(usersRepository, 'save').mockRejectedValueOnce(new Error());

      // Assert
      expect(userService.create(data)).rejects.toThrowError();
    });
  });
  describe('update', () => {
    const data: UpdateUserDto = {
      email: 'dougla1@teste.com',
      firstName: 'Douglas',
      gender: 'Masculino',
      lastName: 'Baltazar',
      password: '123123',
      status: 1,
    };
    it('should update an user item successfully', async () => {
      // Arrange
      jest
        .spyOn(usersRepository, 'save')
        .mockResolvedValueOnce(updatedUserEntity);

      // Act
      const result = await userService.update('1', data);

      // Assert
      expect(result).toEqual(updatedUserEntity);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(usersRepository, 'save').mockRejectedValueOnce(new Error());
      // Assert
      expect(userService.update('1', data)).rejects.toThrowError();
    });
    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(usersRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(userService.update('1', data)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
  describe('deleteById', () => {
    it('should delete a user item successfully', async () => {
      // Act
      const result = await userService.deleteById('1');

      // Assert
      expect(result).toBeUndefined();
      expect(usersRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(usersRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(usersRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(userService.deleteById('1')).rejects.toThrowError(
        NotFoundException,
      );
    });
    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(usersRepository, 'softDelete')
        .mockRejectedValueOnce(new Error());
      // Assert
      expect(userService.deleteById('1')).rejects.toThrowError();
    });
  });
});
