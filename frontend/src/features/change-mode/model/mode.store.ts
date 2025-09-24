import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { Mode } from '@/shared/constants';

import type { StateCreator } from 'zustand';

type State = {
	mode: Mode;
};

type Actions = {
	setMode: (theme: Mode) => void;
};

type ModeState = State & Actions;

const initialState: State = {
	mode: Mode.Light,
};

const modeStore: StateCreator<ModeState, [['zustand/devtools', never], ['zustand/persist', unknown]]> = (set) => ({
	...initialState,
	setMode: (newMode) => set(() => ({ mode: newMode }), false, 'setMode'),
});

const useModeStore = create<ModeState>()(
	devtools(
		persist(modeStore, {
			name: 'mode-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ mode: state.mode }),
		}),
	),
);

export const useDarkMode = () => useModeStore((state) => state.mode === Mode.Dark);
export const useMode = () => useModeStore((state) => state.mode);
export const setDarkMode = (darkMode: boolean) => useModeStore.getState().setMode(darkMode ? Mode.Dark : Mode.Light);
export const setMode = (mode: Mode) => useModeStore.getState().setMode(mode);
