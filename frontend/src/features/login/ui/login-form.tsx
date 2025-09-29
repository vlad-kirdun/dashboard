import { Button, Field, Input, Label } from '@headlessui/react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLoginMutation } from '../model';

import type { FormEvent, FunctionComponent, ChangeEvent } from 'react';

export const LoginForm: FunctionComponent = () => {
	const { t } = useTranslation('auth');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { mutate, isPending, isError } = useLoginMutation();

	const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({ email, password });
	};

	return (
		<div className="flex flex-1 items-center justify-center">
			<div className="w-full max-w-md rounded-2xl bg-primary p-5 sm:p-8 shadow-lg">
				<h2 className="mb-6 text-center text-2xl font-bold text-text-primary">{t('log_in.form.title')}</h2>

				{isError ? (
					<p className="mb-4 rounded-xl bg-danger p-2 text-center font-medium text-text-danger">
						{t('log_in.form.error_text')}
					</p>
				) : null}

				<form onSubmit={handleSubmit} className="space-y-5">
					<Field>
						<Label className="block text-sm font-medium text-text-secondary">{t('log_in.form.email')}</Label>
						<div className="relative mt-1">
							<EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-text-tertiary" />
							<Input
								type="email"
								value={email}
								onChange={handleChangeEmail}
								required
								className="block w-full rounded-xl font-medium text-text-primary border border-tertiary pl-10 pr-3 py-2 shadow-sm focus:ring focus:ring-accent focus:border-accent outline-0 text-sm"
							/>
						</div>
					</Field>

					<Field>
						<Label className="block text-sm font-medium text-text-secondary">{t('log_in.form.password')}</Label>
						<div className="relative mt-1">
							<LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-text-tertiary" />
							<Input
								type="password"
								value={password}
								onChange={handleChangePassword}
								required
								className="block w-full rounded-xl font-medium text-text-primary border border-tertiary pl-10 pr-3 py-2 shadow-sm focus:ring focus:ring-accent focus:border-accent outline-0 text-sm"
							/>
						</div>
					</Field>

					<Button
						type="submit"
						disabled={isPending}
						className="w-full rounded-xl bg-accent py-2 text-white font-medium shadow-md transition-all cursor-pointer hover:bg-accent-hover active:scale-[0.98] disabled:opacity-50"
					>
						{t('log_in.form.button_text')}
					</Button>
				</form>
			</div>
		</div>
	);
};
