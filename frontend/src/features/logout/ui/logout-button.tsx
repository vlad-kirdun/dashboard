import { Button } from '@headlessui/react';

import { useLogoutMutation } from '../model';

import type { FunctionComponent } from 'react';

export const LogoutButton: FunctionComponent = () => {
	const { mutate, isPending } = useLogoutMutation();

	const handleLogout = () => mutate();

	return (
		<Button
			onClick={handleLogout}
			disabled={isPending}
			className="cursor-pointer rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
		>
			Log Out
		</Button>
	);
};
