import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

import { LanguageDropdown, LogoutButton, ModeToggle } from '@/features';

import { authApi } from '@/entities';

import { ROUTES } from '@/shared/constants';

import { LoginButton } from './login-button';

import type { FunctionComponent } from 'react';

export const Header: FunctionComponent = () => {
	const { t } = useTranslation('common');

	const { data: currentUser, isLoading } = useQuery(authApi.authQueries.profile());
	const location = useLocation();
	const isLoginPage = location.pathname === ROUTES.Login;

	return (
		<header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
				<div className="flex items-center space-x-2">
					<Link to={ROUTES.Home} className="text-xl font-bold text-gray-900 dark:text-white">
						{t('app_title')}
					</Link>
				</div>

				<div className="flex items-center space-x-4">
					<ModeToggle />

					<LanguageDropdown />

					{!isLoading && currentUser ? (
						<div className="flex items-center space-x-2">
							<span className="text-sm font-medium text-gray-900 dark:text-white">
								{currentUser.name} {currentUser.surname}
							</span>

							<LogoutButton />
						</div>
					) : !isLoading && !isLoginPage ? (
						<LoginButton />
					) : null}
				</div>
			</div>
		</header>
	);
};
