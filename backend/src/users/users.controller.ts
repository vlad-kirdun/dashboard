import { Body, Controller, Get, Param, Patch, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { Public } from '../common/decorators/public.decorator';
import { FindUsersDto } from './dto/find-users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { Roles, SortBy, Order } from '../common/enums';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Public()
	@UsePipes(new ValidationPipe({ transform: true }))
	@Get()
	@ApiQuery({ name: 'page', required: false, type: Number })
	@ApiQuery({ name: 'perPage', required: false, type: Number })
	@ApiQuery({ name: 'role', required: false, type: typeof Roles })
	@ApiQuery({ name: 'sortBy', required: false, type: typeof SortBy })
	@ApiQuery({ name: 'order', required: false, type: typeof Order })
	@ApiResponse({ status: 200, description: 'Returns paginated list of users' })
	findAll(@Query() query: FindUsersDto) {
		return this.usersService.findAll(query);
	}

	@Public()
	@Get(':id')
	@ApiParam({ name: 'id', type: String, description: 'User ID' })
	@ApiResponse({ status: 200, description: 'Returns the user by ID' })
	@ApiResponse({ status: 404, description: 'User not found' })
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@UsePipes(new ValidationPipe({ transform: true }))
	@UseGuards(JwtAuthGuard)
	@Patch(':id/roles')
	@ApiParam({ name: 'id', type: String, description: 'User ID' })
	@ApiBody({ type: UpdateRolesDto })
	@ApiResponse({ status: 200, description: 'Returns the user with updated roles' })
	@ApiResponse({ status: 400, description: 'Incorrect roles codes' })
	@ApiResponse({ status: 404, description: 'User not found' })
	updateRoles(@Param('id') id: string, @Body() dto: UpdateRolesDto, @User() currentUser) {
		return this.usersService.updateRoles(id, dto.roles, currentUser);
	}
}
