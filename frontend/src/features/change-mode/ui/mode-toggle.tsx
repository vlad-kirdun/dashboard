import { Button } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

import { setDarkMode, useDarkMode } from '../model';

import type { FunctionComponent } from 'react';

export const ModeToggle: FunctionComponent = () => {
	const darkMode = useDarkMode();

	const handleClick = () => setDarkMode(!darkMode);

	return (
		<Button
			onClick={handleClick}
			className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer outline-0"
		>
			{darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-indigo-600" />}
		</Button>
	);
};
