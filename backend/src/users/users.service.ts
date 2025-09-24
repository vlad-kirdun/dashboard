import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Roles } from '../common/enums';
import { User } from '../common/types';
import { FindUsersDto } from './dto/find-users.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
	async findAll(params: FindUsersDto) {
		const { page = 1, perPage = 10, role, sortBy = 'createdAt', order = 'asc' } = params;

		const skip = (page - 1) * perPage;
		const take = perPage;

		const where = role
			? {
					roles: {
						some: {
							role: {
								code: role,
							},
						},
					},
				}
			: {};

		const [users, total] = await prisma.$transaction([
			prisma.user.findMany({
				where,
				skip,
				take,
				orderBy: { [sortBy]: order },
				include: {
					roles: {
						include: {
							role: true,
						},
					},
				},
			}),

			prisma.user.count({ where }),
		]);

		return {
			data: users.map(({ password, roles, ...user }) => ({
				...user,
				roles: roles.map((ur) => ur.role.code),
			})),
			meta: {
				page,
				perPage,
				total,
				totalPages: Math.ceil(total / perPage),
			},
		};
	}

	async findOne(id: string) {
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				roles: { include: { role: true } },
			},
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const { password, roles, ...data } = user;

		return {
			...data,
			roles: roles.map((ur) => ur.role.code),
		};
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: { email },
			include: {
				roles: { include: { role: true } },
			},
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const { roles, ...data } = user;

		return {
			...data,
			roles: roles.map((ur) => ur.role.code),
		};
	}

	async updateRoles(userId: string, roles: Roles[] = [], currentUser: User) {
		if (!currentUser.roles.includes(Roles.Admin)) {
			throw new ForbiddenException('Only admins can update roles');
		}

		const user = await prisma.user.findUnique({ where: { id: userId } });

		if (!user) throw new NotFoundException('User not found');

		if (currentUser.id === userId && !roles.includes(Roles.Admin)) {
			throw new BadRequestException('Cannot remove your own ADMIN role');
		}

		const roleRecords = await prisma.role.findMany({
			where: { code: { in: roles } },
		});
		const foundCodes = roleRecords.map((r) => r.code);
		const invalidCodes = roles.filter((r) => !foundCodes.includes(r));

		if (invalidCodes.length > 0) {
			throw new BadRequestException(`Invalid roles: ${invalidCodes.join(', ')}`);
		}

		const roleIds = roleRecords.map((r) => r.id);

		await prisma.userRole.deleteMany({ where: { userId } });

		if (roleIds.length > 0) {
			await prisma.userRole.createMany({
				data: roleIds.map((roleId) => ({ userId, roleId })),
				skipDuplicates: true,
			});
		}

		return this.findOne(userId);
	}
}
