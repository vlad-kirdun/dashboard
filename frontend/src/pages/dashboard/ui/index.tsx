import { useTranslation } from 'react-i18next';

import { UsersTable } from '@/widgets';

import type { FunctionComponent } from 'react';

export const Dashboard: FunctionComponent = () => {
	const { t } = useTranslation('dashboard');

	return (
		<div className="w-full max-w-6xl mx-auto px-4 py-6">
			<h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-text-primary">{t('title')}</h1>

			<UsersTable />
		</div>
	);
};
