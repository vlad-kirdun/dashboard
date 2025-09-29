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
			className={classNames('px-2 inline-flex text-xs leading-5 font-medium rounded-full', {
				'bg-danger text-text-danger': role === RoleCode.Admin,
				'bg-info text-text-info': role === RoleCode.Editor,
				'bg-success text-text-success': role === RoleCode.Viewer,
			})}
		>
			{t(`tables.users.filters.role.values.${role.toLowerCase()}`)}
		</span>
	);
};
