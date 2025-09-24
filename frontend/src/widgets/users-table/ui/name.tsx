import { useTranslation } from 'react-i18next';

import type { User } from '@/shared/model';

import type { FunctionComponent } from 'react';

type Props = {
	user: User;
};

export const Name: FunctionComponent<Props> = ({ user }) => {
	const { t } = useTranslation('dashboard');

	const fullName = `${user.name} ${user.surname}`;

	return (
		<div className="flex items-center gap-3">
			<div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">
				{fullName
					.split(' ')
					.map((n) => n[0])
					.slice(0, 2)
					.join('')}
			</div>
			<div>
				<div className="text-sm font-semibold text-gray-900">{fullName}</div>
				<div className="text-xs text-gray-500">
					{t('tables.users.columns.id')}: {user.id}
				</div>
			</div>
		</div>
	);
};
