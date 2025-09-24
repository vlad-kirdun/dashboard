import { Button } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { FunctionComponent } from 'react';

export const LoginButton: FunctionComponent = () => {
	const { t } = useTranslation('auth');

	return (
		<Button
			as={Link}
			to="login"
			className="cursor-pointer rounded bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700"
		>
			{t('log_in.text')}
		</Button>
	);
};
