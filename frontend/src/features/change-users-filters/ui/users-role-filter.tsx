import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { roleApi } from '@/entities';

import type { RoleCode } from '@/shared/constants';
import { Skeleton } from '@/shared/ui';

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
			<label className="text-sm font-medium text-text-secondary hidden sm:inline">
				{t('tables.users.filters.role.label')}
			</label>
			{isLoading ? (
				<Skeleton className="min-w-32 h-7 rounded-md" />
			) : (
				<Listbox value={role} onChange={handleChangeRole}>
					<div className="relative min-w-32">
						<ListboxButton className="relative w-full cursor-pointer text-text-primary font-medium bg-primary hover:bg-primary-hover shadow-md rounded-md py-1 pl-3 pr-8 text-left text-sm focus:outline-none">
							{role ? t(`tables.users.filters.role.values.${role.toLowerCase()}`) : null}
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<ChevronUpDownIcon className="h-4 w-4 text-text-secondary" />
							</span>
						</ListboxButton>
						<ListboxOptions className="absolute mt-1 w-full bg-primary border border-tertiary shadow-md max-h-40 rounded-md py-1 overflow-auto focus:outline-none text-sm z-10">
							{roles.map((role) => (
								<ListboxOption
									key={role}
									value={role}
									className={({ focus }) =>
										classNames('select-none relative py-1 px-3 text-text-primary cursor-pointer', {
											'bg-primary-hover': focus,
										})
									}
								>
									{({ selected }) => (
										<div className="flex items-center justify-between">
											<span className={selected ? 'font-medium' : ''}>
												{t(`tables.users.filters.role.values.${role.toLowerCase()}`)}
											</span>

											{selected ? <CheckIcon className="w-5 h-5 text-text-primary" /> : null}
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
