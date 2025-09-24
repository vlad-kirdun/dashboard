import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { roleApi } from '@/entities';

import type { RoleCode } from '@/shared/constants';

import { setRole, useRole } from '../model';

import type { FunctionComponent } from 'react';

type Props =
	| {
			onChange?: () => void;
	  }
	| undefined;

export const UsersRoleFilter: FunctionComponent<Props> = ({ onChange } = {}) => {
	const { t } = useTranslation('dashboard');

	const role = useRole();

	const { data = [], isLoading } = useQuery(roleApi.roleQueries.list());
	const roles = ['ALL', ...[...data].sort((a, b) => a.localeCompare(b))];

	function handleChangeRole(newRole?: 'ALL' | RoleCode) {
		onChange?.();
		setRole(newRole);
	}

	return (
		<div className="flex items-center gap-3">
			<label className="text-sm font-medium text-gray-700 hidden sm:inline">
				{t('tables.users.filters.role.label')}
			</label>
			{isLoading ? (
				<div className="min-w-32 h-8 bg-gray-200 rounded-md animate-pulse" />
			) : (
				<Listbox value={role} onChange={handleChangeRole}>
					<div className="relative min-w-32">
						<ListboxButton className="relative w-full cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 rounded-md py-1 pl-3 pr-8 text-left text-sm shadow-sm focus:outline-none">
							{role ? t(`tables.users.filters.role.values.${role.toLowerCase()}`) : null}
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<ChevronUpDownIcon className="h-4 w-4 text-gray-500" />
							</span>
						</ListboxButton>
						<ListboxOptions className="absolute mt-1 w-full bg-white shadow-lg max-h-40 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm z-10">
							{roles.map((role) => (
								<ListboxOption
									key={role}
									value={role}
									className={({ focus }) =>
										classNames(
											'cursor-pointer select-none relative py-1 px-3',
											focus ? 'bg-indigo-600 text-white' : 'text-gray-900',
										)
									}
								>
									{({ selected, focus }) => (
										<div className="flex items-center justify-between">
											<span className={selected ? 'font-semibold' : ''}>
												{t(`tables.users.filters.role.values.${role.toLowerCase()}`)}
											</span>

											{selected && (
												<CheckIcon className={classNames('w-5 h-5', focus ? 'text-white' : 'text-indigo-600')} />
											)}
										</div>
									)}
								</ListboxOption>
							))}
						</ListboxOptions>
					</div>
				</Listbox>
			)}
		</div>
	);
};
