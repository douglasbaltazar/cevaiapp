import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEntity } from './entity/event.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

const eventEntityList: EventEntity[] = [
  new EventEntity({
    bands: 'Teste',
    createdAt: undefined,
    deletedAt: undefined,
    id: '1',
    name: undefined,
    status: 0,
    updatedAt: undefined,
    users: undefined,
  }),
  new EventEntity({
    bands: 'Teste 2',
    createdAt: undefined,
    deletedAt: undefined,
    id: '2',
    name: undefined,
    status: 1,
    updatedAt: undefined,
    users: undefined,
  }),
  new EventEntity({
    bands: 'Teste 3',
    createdAt: undefined,
    deletedAt: undefined,
    id: '3',
    name: undefined,
    status: 0,
    updatedAt: undefined,
    users: undefined,
  }),
];

const updatedEventEntity = new EventEntity({
  name: 'Social40º',
  createdAt: undefined,
  deletedAt: undefined,
  id: '1',
  bands: 'Teste',
  status: 1,
  updatedAt: undefined,
  users: undefined,
});

describe('EventService', () => {
  let eventService: EventService;
  let eventRepository: Repository<EventEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(EventEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(eventEntityList),
            findOneByOrFail: jest.fn().mockResolvedValue(eventEntityList[0]),
            create: jest.fn().mockReturnValue(eventEntityList[0]),
            merge: jest.fn().mockReturnValue(updatedEventEntity),
            save: jest.fn().mockResolvedValue(eventEntityList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    eventService = module.get<EventService>(EventService);
    eventRepository = module.get<Repository<EventEntity>>(
      getRepositoryToken(EventEntity),
    );
  });

  it('should be defined', () => {
    expect(eventService).toBeDefined();
    expect(eventRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a event list entity successfully', async () => {
      // Act
      const result = await eventService.findAll();

      // Assert

      expect(result).toEqual(eventEntityList);
      expect(eventRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should throw an exceptiion', () => {
      // Arrange
      jest.spyOn(eventRepository, 'find').mockRejectedValueOnce(new Error());

      // Assert
      expect(eventService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a event item successfully', async () => {
      // Act
      const result = await eventService.findOne('1');
      // Assert
      expect(result).toEqual(eventEntityList[0]);
      expect(eventRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(eventRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert

      expect(eventService.findOne('1')).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new event entity item successfully', async () => {
      // Arrange
      const data: CreateEventDto = {
        bands: 'Teste',
        name: 'Teste',
        status: 0,
      };

      // Act
      const result = await eventService.create(data);

      // Assert
      expect(result).toEqual(eventEntityList[0]);
      expect(eventRepository.create).toHaveBeenCalledTimes(1);
      expect(eventRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      const data: CreateEventDto = {
        bands: 'test',
        name: 'test',
        status: 0,
      };
      // Act
      jest.spyOn(eventRepository, 'save').mockRejectedValueOnce(new Error());

      // Assert
      expect(eventService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const data: UpdateEventDto = {
      bands: 'Teste',
      name: 'Teste',
      status: 1,
    };
    it('should update a event entity item successfully', async () => {
      jest
        .spyOn(eventRepository, 'save')
        .mockResolvedValueOnce(updatedEventEntity);
      // Act
      const result = await eventService.update('1', data);

      // Assert
      expect(result).toEqual(updatedEventEntity);
    });
    it('should throw a not found exception', () => {
      jest
        .spyOn(eventRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(eventService.update('1', data)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw an expception', () => {
      // Arrange
      jest.spyOn(eventRepository, 'save').mockRejectedValueOnce(new Error());
      // Assert
      expect(eventService.update('1', data)).rejects.toThrowError();
    });
  });

  describe('deleteById', () => {
    it('should delete a event item successfully', async () => {
      // Act
      const result = await eventService.deleteById('1');

      // Assert

      expect(result).toBeUndefined();
      expect(eventRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(eventRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found expceiton', () => {
      jest
        .spyOn(eventRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(eventService.deleteById('1')).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw an expception', () => {
      // Arrange
      jest
        .spyOn(eventRepository, 'softDelete')
        .mockRejectedValueOnce(new Error());
      // Assert
      expect(eventService.deleteById('1')).rejects.toThrowError();
    });
  });
});
