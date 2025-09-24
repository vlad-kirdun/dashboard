import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class RolesService {
	async findAll() {
		const roles = await prisma.role.findMany();

		return roles.map((r) => r.code);
	}
}
