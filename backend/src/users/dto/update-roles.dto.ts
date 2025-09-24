import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsEnum } from 'class-validator';
import { Roles } from '../../common/enums';

export class UpdateRolesDto {
	@ApiProperty({
		example: ['ADMIN', 'EDITOR', 'VIEWER'],
		description: 'The array of roles codes',
		isArray: true,
		enum: Roles,
	})
	@IsArray()
	@ArrayNotEmpty()
	@ArrayUnique()
	@IsEnum(Roles, { each: true })
	roles!: Roles[];
}
