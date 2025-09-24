import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/entities';

export function useLogoutMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: authApi.logout,
		onSuccess: () => {
			queryClient.setQueryData(['profile'], null);
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});
}
