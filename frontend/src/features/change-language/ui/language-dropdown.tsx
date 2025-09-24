import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Lang } from '@/shared/constants';

import { LanguageDropdownItem } from './language-dropdown-item';

import type { FunctionComponent } from 'react';

export const LanguageDropdown: FunctionComponent = () => {
	const {
		t,
		i18n: { language },
	} = useTranslation('common');

	return (
		<Menu as="div" className="relative">
			<MenuButton className="cursor-pointer flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
				{t(`languages.${language}.code`)} <ChevronDownIcon className="ml-1 h-4 w-4" />
			</MenuButton>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems className="absolute right-0 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
					<div className="p-1">
						{Object.values(Lang).map((lang) => (
							<LanguageDropdownItem key={lang} lang={lang} />
						))}
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	);
};
