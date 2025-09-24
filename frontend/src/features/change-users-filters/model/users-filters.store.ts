import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { RoleCode } from '@/shared/constants';

import type { StateCreator } from 'zustand';

type State = {
	role?: 'ALL' | RoleCode;
};

type Actions = {
	setRole: (role?: 'ALL' | RoleCode) => void;
};

type UsersFiltersState = State & Actions;

const initialState: State = {
	role: 'ALL',
};

const usersFiltersStore: StateCreator<
	UsersFiltersState,
	[['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
	...initialState,
	setRole: (newRole) => set(() => ({ role: newRole }), false, 'users/setRole'),
});

const useUsersFiltersStore = create<UsersFiltersState>()(
	devtools(
		persist(usersFiltersStore, {
			name: 'users-filters-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ role: state.role }),
		}),
	),
);

export const useRole = () => useUsersFiltersStore((state) => state.role);
export const setRole = (role?: 'ALL' | RoleCode) => useUsersFiltersStore.getState().setRole(role);
