import { Button, MenuItem } from '@headlessui/react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Lang } from '@/shared/constants';

import type { FunctionComponent } from 'react';

type Props = {
	lang: Lang;
};

export const LanguageDropdownItem: FunctionComponent<Props> = ({ lang }) => {
	const { t, i18n } = useTranslation('common');

	const handleClick = () => {
		i18n.changeLanguage(lang);
	};

	return (
		<MenuItem>
			{({ focus }) => (
				<Button
					className={classNames('block w-full rounded px-2 py-1 text-left text-sm text-text-primary cursor-pointer', {
						'bg-primary-hover': focus,
					})}
					onClick={handleClick}
				>
					{t(`languages.${lang}.label`)}
				</Button>
			)}
		</MenuItem>
	);
};
