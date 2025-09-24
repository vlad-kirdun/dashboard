import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Public()
	@Get()
	@ApiResponse({ status: 200, description: 'Returns the list of all roles' })
	findAll() {
		return this.rolesService.findAll();
	}
}
