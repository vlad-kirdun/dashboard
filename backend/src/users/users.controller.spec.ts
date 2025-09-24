import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Roles } from '../common/enums';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';

describe('UsersController', () => {
	let controller: UsersController;
	let service: jest.Mocked<UsersService>;

	const mockUsers = [
		{ id: 1, name: 'Alice', email: 'alice@example.com', roles: [Roles.Admin] },
		{ id: 2, name: 'Bob', email: 'bob@example.com', roles: [Roles.Editor] },
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: {
						findAll: jest.fn().mockResolvedValue(mockUsers),
						findOne: jest.fn().mockResolvedValue(mockUsers[0]),
						updateRoles: jest.fn().mockResolvedValue({
							...mockUsers[0],
							roles: [Roles.Admin, Roles.Viewer],
						}),
					},
				},
			],
		}).compile();

		controller = module.get<UsersController>(UsersController);
		service = module.get(UsersService);
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return paginated list of users', async () => {
			const query: FindUsersDto = { page: 1, perPage: 10 } as any;
			const result = await controller.findAll(query);

			expect(service.findAll).toHaveBeenCalledWith(query);
			expect(result).toEqual(mockUsers);
		});
	});

	describe('findOne', () => {
		it('should return a user by id', async () => {
			const result = await controller.findOne('1');

			expect(service.findOne).toHaveBeenCalledWith('1');
			expect(result).toEqual(mockUsers[0]);
		});

		it('should throw NotFoundException if user not found', async () => {
			(service.findOne as jest.Mock).mockRejectedValueOnce(new NotFoundException());

			await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
		});
	});

	describe('updateRoles', () => {
		const currentUser = { id: 99, email: 'admin@test.com' };

		it('should update user roles and return updated user', async () => {
			const dto: UpdateRolesDto = { roles: [Roles.Admin, Roles.Viewer] };

			const result = await controller.updateRoles('1', dto, currentUser);

			expect(service.updateRoles).toHaveBeenCalledWith('1', dto.roles, currentUser);
			expect(result.roles).toEqual([Roles.Admin, Roles.Viewer]);
		});

		it('should throw BadRequestException for invalid roles', async () => {
			const dto: UpdateRolesDto = { roles: ['INVALID' as Roles] };
			(service.updateRoles as jest.Mock).mockRejectedValueOnce(new BadRequestException());

			await expect(controller.updateRoles('1', dto, currentUser)).rejects.toThrow(BadRequestException);
		});
	});
});
