import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Roles, SortBy, Order } from '../../common/enums';

export class FindUsersDto {
	@ApiPropertyOptional({ example: 1, description: 'Page number (>=1)' })
	@IsOptional()
	@Transform(({ value }) => parseInt(value, 10))
	@IsInt()
	@Min(1)
	page?: number = 1;

	@ApiPropertyOptional({ example: 10, description: 'Items per page (>=1)' })
	@IsOptional()
	@Transform(({ value }) => parseInt(value, 10))
	@IsInt()
	@Min(1)
	perPage?: number = 10;

	@ApiPropertyOptional({
		enum: Roles,
		description: 'Filter by role',
		example: Roles.Admin,
	})
	@IsOptional()
	@IsEnum(Roles)
	role?: Roles;

	@ApiPropertyOptional({
		enum: SortBy,
		description: 'Sort by field',
		example: SortBy.CreatedAt,
	})
	@IsOptional()
	@IsEnum(SortBy)
	sortBy?: SortBy = SortBy.CreatedAt;

	@ApiPropertyOptional({
		enum: Order,
		description: 'Sort order',
		example: Order.Asc,
	})
	@IsOptional()
	@IsEnum(Order)
	order?: Order = Order.Asc;
}
