import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { authApi, type LoginRequest } from '@/entities';

import { ROUTES } from '@/shared/constants';

export function useLoginMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (body: LoginRequest) => authApi.login(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
			navigate(ROUTES.Home);
		},
	});
}
