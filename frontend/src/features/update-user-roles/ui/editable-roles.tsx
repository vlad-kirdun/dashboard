import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CheckIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { Fragment, type FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { authApi, roleApi, userApi } from '@/entities';

import { RoleCode } from '@/shared/constants';

import { useUpdateUserRolesMutation } from '../model';
import { Role } from './role';

type Props = {
	userId: string;
};

export const EditableRoles: FunctionComponent<Props> = ({ userId }) => {
	const { t } = useTranslation('dashboard');

	const { data: allRoles } = useQuery(roleApi.roleQueries.list());
	const { data: user } = useQuery(userApi.userQueries.detail(userId));
	const { data: currentUser } = useQuery(authApi.authQueries.profile());
	const updateUserRolesMutation = useUpdateUserRolesMutation();

	if (!allRoles || !user) return null;

	const handleChange = (newRoles: RoleCode[]) => {
		updateUserRolesMutation.mutate({ userId, roles: newRoles });
	};

	const isAdmin = currentUser?.roles.includes(RoleCode.Admin);
	const isSelf = currentUser?.id === userId;

	if (!isAdmin) {
		return (
			<div className="flex gap-1">
				{user.roles.sort().map((role) => (
					<Role key={role} role={role} />
				))}
			</div>
		);
	}

	return (
		<Listbox as="div" value={user.roles} onChange={handleChange} multiple>
			<div className="relative">
				<ListboxButton className="flex items-center gap-1 cursor-pointer outline-0 px-1 py-0.5 rounded-md group hover:bg-primary hover:ring-1 hover:ring-accent">
					{[...user.roles]
						.sort((a, b) => a.localeCompare(b))
						.map((role) => (
							<Role key={role} role={role} />
						))}

					<PencilSquareIcon className="w-4 h-4 text-text-tertiary" />
				</ListboxButton>

				<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
					<ListboxOptions className="absolute z-10 mt-1 min-w-40 bg-primary shadow-md max-h-60 rounded-md py-1 border border-tertiary overflow-auto focus:outline-none text-sm">
						{[...allRoles]
							.sort((a, b) => a.localeCompare(b))
							.map((role) => {
								const disabled =
									(user.roles.length === 1 && user.roles.includes(role)) || (isSelf && role === RoleCode.Admin);

								return (
									<ListboxOption
										key={role}
										value={role}
										disabled={disabled}
										className={({ focus }) =>
											classNames('select-none relative py-1 px-3 text-text-primary', {
												'opacity-50 cursor-not-allowed': disabled,
												'cursor-pointer': !disabled,
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
								);
							})}
					</ListboxOptions>
				</Transition>
			</div>
		</Listbox>
	);
};
