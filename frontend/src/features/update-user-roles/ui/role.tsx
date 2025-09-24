import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { RoleCode } from '@/shared/constants';

import type { FunctionComponent } from 'react';

type Props = {
	role: RoleCode;
};

export const Role: FunctionComponent<Props> = ({ role }) => {
	const { t } = useTranslation('dashboard');

	return (
		<span
			className={classNames('px-2 inline-flex text-xs leading-5 font-semibold rounded-full', {
				'bg-gray-100 text-gray-800': role === RoleCode.Admin,
				'bg-blue-100 text-blue-800': role === RoleCode.Editor,
				'bg-green-100 text-green-800': role === RoleCode.Viewer,
			})}
		>
			{t(`tables.users.filters.role.values.${role.toLowerCase()}`)}
		</span>
	);
};
