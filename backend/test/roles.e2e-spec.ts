import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { RolesController } from '../src/roles/roles.controller';
import { RolesService } from '../src/roles/roles.service';

describe('RolesController (e2e)', () => {
	let app: INestApplication;
	let rolesService: RolesService;

	const mockRoles = ['ADMIN', 'EDITOR', 'VIEWER'];

	beforeAll(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [RolesController],
			providers: [RolesService],
		})
			.overrideProvider(RolesService)
			.useValue({
				findAll: jest.fn().mockResolvedValue(mockRoles),
			})
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();

		rolesService = moduleRef.get<RolesService>(RolesService);
	});

	afterAll(async () => {
		await app.close();
	});

	it('/roles (GET) -> 200 + array of roles', async () => {
		const response = await request(app.getHttpServer()).get('/roles').expect(200);

		expect(response.body).toEqual(mockRoles);
		expect(rolesService.findAll).toHaveBeenCalled();
	});
});
