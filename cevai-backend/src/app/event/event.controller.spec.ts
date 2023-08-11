import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventEntity } from './entity/event.entity';
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

const newEventEntity = new EventEntity({
  bands: 'DJ Figs',
  name: 'Social 40º',
  status: 0,
});

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

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(eventEntityList),
            create: jest.fn().mockResolvedValue(newEventEntity),
            findOne: jest.fn().mockResolvedValue(eventEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedEventEntity),
            deleteById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    eventController = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(eventController).toBeDefined();
    expect(eventService).toBeDefined();
  });
  describe('index', () => {
    it('should return a event list entity successfully', async () => {
      const result = await eventController.index();
      expect(result).toEqual(eventEntityList);
      expect(typeof result).toEqual('object');
      expect(eventService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(eventService, 'findAll').mockRejectedValueOnce(new Error());
      // Act
      // Assert
      expect(eventController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new event item', async () => {
      // Arrange
      const body: CreateEventDto = {
        name: 'Social40º',
        bands: 'DJ Figs',
        status: 0,
      };

      // Act
      const result = await eventService.create(body);

      // Assert
      expect(result).toEqual(newEventEntity);
      expect(eventService.create).toHaveBeenCalledTimes(1);
      expect(eventService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateEventDto = {
        name: 'Social40º',
        bands: 'DJ Figs',
        status: 0,
      };

      jest.spyOn(eventService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(eventController.create(body)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get a event item successfully', async () => {
      // Act
      const result = await eventController.show('1');
      // Assert
      expect(result).toEqual(eventEntityList[0]);
      expect(eventService.findOne).toHaveBeenCalledTimes(1);
      expect(eventService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(eventService, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(eventController.show('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a event item successfully', async () => {
      // Arrange
      const body: UpdateEventDto = {
        name: 'Social40º',
        bands: 'DJ Figs',
        status: 1,
      };

      // Act
      const result = await eventController.update('1', body);

      // Assert
      expect(result).toEqual(updatedEventEntity);
      expect(eventService.update).toHaveBeenCalledTimes(1);
      expect(eventService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(eventService, 'update').mockRejectedValueOnce(new Error());

      const body: UpdateEventDto = {
        name: 'Social40º',
        bands: 'DJ Figs',
        status: 1,
      };

      // Assert
      expect(eventController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove a event item successfully', async () => {
      // Act
      const result = await eventController.destroy('1');

      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(eventService, 'deleteById').mockRejectedValueOnce(new Error());

      // Assert
      expect(eventController.destroy('1')).rejects.toThrowError();
    });
  });
});
