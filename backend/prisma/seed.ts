import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function getRandomDate(start: Date, end: Date) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
	await prisma.userRole.deleteMany();
	await prisma.user.deleteMany();
	await prisma.role.deleteMany();

	await prisma.role.createMany({
		data: [{ code: 'ADMIN' }, { code: 'EDITOR' }, { code: 'VIEWER' }],
		skipDuplicates: true,
	});

	const passwordHash = await bcrypt.hash('Qwerty123', 10);

	const startDate = new Date('2024-06-01T00:00:00Z');
	const endDate = new Date('2025-06-01T00:00:00Z');

	await prisma.user.createMany({
		data: [
			{
				name: 'Alice',
				surname: 'Cooper',
				password: passwordHash,
				email: 'alice@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Bob',
				surname: 'Marley',
				password: passwordHash,
				email: 'bob@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Carol',
				surname: 'Alt',
				password: passwordHash,
				email: 'carol@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Anna',
				surname: 'Kowalska',
				password: passwordHash,
				email: 'anna@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Piotr',
				surname: 'Nowak',
				password: passwordHash,
				email: 'piotr@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Marta',
				surname: 'Zielinska',
				password: passwordHash,
				email: 'marta@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Jan',
				surname: 'Kowal',
				password: passwordHash,
				email: 'jan@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Kasia',
				surname: 'Lis',
				password: passwordHash,
				email: 'kasia@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Tomek',
				surname: 'Bielski',
				password: passwordHash,
				email: 'tomek@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Ewa',
				surname: 'Maj',
				password: passwordHash,
				email: 'ewa@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Bartek',
				surname: 'Lesny',
				password: passwordHash,
				email: 'bartek@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Ola',
				surname: 'Wiśniewska',
				password: passwordHash,
				email: 'ola@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Krzysztof',
				surname: 'Wojcik',
				password: passwordHash,
				email: 'krzysztof@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Magda',
				surname: 'Kaminska',
				password: passwordHash,
				email: 'magda@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Tadeusz',
				surname: 'Lewandowski',
				password: passwordHash,
				email: 'tadeusz@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Joanna',
				surname: 'Duda',
				password: passwordHash,
				email: 'joanna@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Grzegorz',
				surname: 'Szewczyk',
				password: passwordHash,
				email: 'grzegorz@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Zofia',
				surname: 'Adamczyk',
				password: passwordHash,
				email: 'zofia@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Marek',
				surname: 'Michalski',
				password: passwordHash,
				email: 'marek@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Iwona',
				surname: 'Czarnecka',
				password: passwordHash,
				email: 'iwona@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Leszek',
				surname: 'Ostrowski',
				password: passwordHash,
				email: 'leszek@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Renata',
				surname: 'Pawlak',
				password: passwordHash,
				email: 'renata@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Artur',
				surname: 'Kaczmarek',
				password: passwordHash,
				email: 'artur@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Halina',
				surname: 'Sikora',
				password: passwordHash,
				email: 'halina@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Wojciech',
				surname: 'Król',
				password: passwordHash,
				email: 'wojciech@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Sylwia',
				surname: 'Baran',
				password: passwordHash,
				email: 'sylwia@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Damian',
				surname: 'Jaworski',
				password: passwordHash,
				email: 'damian@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
			{
				name: 'Urszula',
				surname: 'Wilk',
				password: passwordHash,
				email: 'urszula@example.com',
				createdAt: getRandomDate(startDate, endDate),
			},
		],
		skipDuplicates: true,
	});

	const roles = await prisma.role.findMany();
	const users = await prisma.user.findMany();

	const userRolesData = users.flatMap((user) => {
		const assigned = new Set<string>();
		const rolesCount = Math.floor(Math.random() * 3) + 1;

		while (assigned.size < rolesCount) {
			const role = roles[Math.floor(Math.random() * roles.length)];
			assigned.add(role.id);
		}

		return [...assigned].map((roleId) => ({
			userId: user.id,
			roleId,
		}));
	});

	await prisma.userRole.createMany({
		data: userRolesData,
		skipDuplicates: true,
	});
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
