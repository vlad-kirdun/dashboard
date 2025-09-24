import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Roles } from '../common/enums';

describe('RolesController', () => {
	let controller: RolesController;
	let service: jest.Mocked<RolesService>;

	const mockRoles = [
		{ id: 1, code: Roles.Admin },
		{ id: 2, code: Roles.Editor },
		{ id: 3, code: Roles.Viewer },
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RolesController],
			providers: [
				{
					provide: RolesService,
					useValue: {
						findAll: jest.fn().mockResolvedValue(mockRoles),
					},
				},
			],
		}).compile();

		controller = module.get<RolesController>(RolesController);
		service = module.get(RolesService);
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should call RolesService.findAll and return roles list', async () => {
			const result = await controller.findAll();

			expect(service.findAll).toHaveBeenCalledTimes(1);
			expect(result).toEqual(mockRoles);
		});

		it('should propagate service errors', async () => {
			(service.findAll as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

			await expect(controller.findAll()).rejects.toThrow('DB error');
		});
	});
});
