import { Button } from '@headlessui/react';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { FunctionComponent, ReactNode } from 'react';

type WrapperProps = {
	children: ReactNode;
	className: string;
};

const Wrapper: FunctionComponent<WrapperProps> = ({ children, className }) => (
	<Button
		as={Link}
		to="login"
		className={classNames(
			'sm:min-w-21 cursor-pointer rounded bg-accent hover:bg-accent-hover px-1 sm:px-3 py-1 text-center text-sm font-medium text-white',
			className,
		)}
	>
		{children}
	</Button>
);

export const LoginButton: FunctionComponent = () => {
	const { t } = useTranslation('auth');

	return (
		<>
			<Wrapper className="hidden sm:inline">{t('log_in.text')}</Wrapper>

			<Wrapper className="inline sm:hidden">
				<ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-white" />
			</Wrapper>
		</>
	);
};
