import { Button } from '@headlessui/react';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useLogoutMutation } from '../model';

import type { FunctionComponent, ReactNode } from 'react';

type WrapperProps = {
	children: ReactNode;
	className: string;
	disabled: boolean;
	onClick: () => void;
};

const Wrapper: FunctionComponent<WrapperProps> = ({ children, className, disabled, onClick }) => (
	<Button
		onClick={onClick}
		disabled={disabled}
		className={classNames(
			'sm:min-w-21 cursor-pointer rounded bg-danger hover:bg-danger-hover px-1 sm:px-3 py-1 text-sm font-medium text-text-danger',
			className,
		)}
	>
		{children}
	</Button>
);

export const LogoutButton: FunctionComponent = () => {
	const { t } = useTranslation('auth');

	const { mutate, isPending } = useLogoutMutation();

	const handleLogout = () => mutate();

	return (
		<>
			<Wrapper className="hidden sm:inline" disabled={isPending} onClick={handleLogout}>
				{t('log_out.text')}
			</Wrapper>

			<Wrapper className="inline sm:hidden" disabled={isPending} onClick={handleLogout}>
				<ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-text-danger" />
			</Wrapper>
		</>
	);
};
