import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type State = {
	page: number;
	perPage: number;
};

type Actions = {
	setPage: (page: number) => void;
	setPerPage: (page: number) => void;
};

type UsersPaginationState = State & Actions;

const initialState: State = {
	page: 1,
	perPage: 10,
};

const usersPaginationStore: StateCreator<
	UsersPaginationState,
	[['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
	...initialState,
	setPage: (newPage) => set(() => ({ page: newPage }), false, 'users/setPage'),
	setPerPage: (newPerPage) => set(() => ({ page: 1, perPage: newPerPage }), false, 'users/setPerPage'),
});

const useUsersPaginationStore = create<UsersPaginationState>()(
	devtools(
		persist(usersPaginationStore, {
			name: 'users-pagination-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ page: state.page, perPage: state.perPage }),
		}),
	),
);

export const usePage = () => useUsersPaginationStore((state) => state.page);
export const usePerPage = () => useUsersPaginationStore((state) => state.perPage);
export const setPage = (page: number) => useUsersPaginationStore.getState().setPage(page);
export const setPerPage = (perPage: number) => useUsersPaginationStore.getState().setPerPage(perPage);
