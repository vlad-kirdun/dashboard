import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApi } from '@/entities';

import type { RoleCode } from '@/shared/constants';

export function useUpdateUserRolesMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ userId, roles }: { userId: string; roles: RoleCode[] }) =>
			userApi.updateUserRoles(userId, { roles }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
}
