import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
	@ApiProperty({
		example: 'user@example.com',
		description: 'Email address of the user',
	})
	@IsEmail({}, { message: 'Invalid email format' })
	email!: string;

	@ApiProperty({
		example: 'Qwerty123',
		description: 'User password',
	})
	@IsString()
	password!: string;
}
