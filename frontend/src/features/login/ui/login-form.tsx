import { Button, Field, Input, Label } from '@headlessui/react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { type FormEvent, type FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLoginMutation } from '../model';

export const LoginForm: FunctionComponent = () => {
	const { t } = useTranslation('auth');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { mutate, isPending, isError } = useLoginMutation();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({ email, password });
	};

	return (
		<div className="flex flex-1 items-center justify-center">
			<div className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-8 shadow-lg">
				<h2 className="mb-6 text-center text-2xl font-bold text-gray-900">{t('log_in.form.title')}</h2>

				{isError && (
					<p className="mb-4 rounded-lg bg-red-100 p-2 text-center text-red-600">{t('log_in.form.error_text')}</p>
				)}

				<form onSubmit={handleSubmit} className="space-y-5">
					<Field>
						<Label className="block text-sm font-medium text-gray-700">{t('log_in.form.email')}</Label>
						<div className="relative mt-1">
							<EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="block w-full rounded-xl border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
					</Field>

					<Field>
						<Label className="block text-sm font-medium text-gray-700">{t('log_in.form.password')}</Label>
						<div className="relative mt-1">
							<LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="block w-full rounded-xl border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
					</Field>

					<Button
						type="submit"
						disabled={isPending}
						className="w-full rounded-xl bg-indigo-600 py-2 text-white shadow-md transition-all cursor-pointer hover:bg-indigo-700 active:scale-[0.98] disabled:bg-indigo-300"
					>
						{t('log_in.form.button_text')}
					</Button>
				</form>
			</div>
		</div>
	);
};
