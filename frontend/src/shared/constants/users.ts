const SortBy = {
	Name: 'name',
	CreatedAt: 'createdAt',
} as const;

type SortBy = (typeof SortBy)[keyof typeof SortBy];

const Order = {
	Asc: 'asc',
	Desc: 'desc',
} as const;

type Order = (typeof Order)[keyof typeof Order];

export { SortBy, Order };
