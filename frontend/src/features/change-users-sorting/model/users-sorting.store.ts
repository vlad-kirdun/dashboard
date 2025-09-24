import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { Order, SortBy } from '@/shared/constants';

type State = {
	sortBy: SortBy;
	order: Order;
};

type Actions = {
	setSortBy: (sortBy: SortBy) => void;
	setOrder: (order: Order) => void;
};

type UsersSortingState = State & Actions;

const initialState: State = {
	sortBy: SortBy.CreatedAt,
	order: Order.Desc,
};

const usersSortingStore: StateCreator<
	UsersSortingState,
	[['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
	...initialState,
	setSortBy: (newSortBy) =>
		set(
			(state) => ({
				sortBy: newSortBy,
				order: state.sortBy === newSortBy && state.order === Order.Desc ? Order.Asc : Order.Desc,
			}),
			false,
			'users/setSortBy',
		),
	setOrder: (newOrder) => set(() => ({ order: newOrder }), false, 'users/setOrder'),
});

const useUsersSortingStore = create<UsersSortingState>()(
	devtools(
		persist(usersSortingStore, {
			name: 'users-sorting-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ sortBy: state.sortBy, order: state.order }),
		}),
	),
);

export const useSortBy = () => useUsersSortingStore((state) => state.sortBy);
export const useOrder = () => useUsersSortingStore((state) => state.order);
export const setSortBy = (sortBy: SortBy) => useUsersSortingStore.getState().setSortBy(sortBy);
export const setOrder = (order: Order) => useUsersSortingStore.getState().setOrder(order);
