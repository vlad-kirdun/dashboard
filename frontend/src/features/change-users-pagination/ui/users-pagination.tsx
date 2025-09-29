import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Fragment, type FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { setPage, setPerPage, usePage, usePerPage } from '../model';

type Props = {
	totalPages?: number;
	isLoading?: boolean;
};

export const UsersPagination: FunctionComponent<Props> = ({ totalPages = 0, isLoading = false }) => {
	const { t } = useTranslation('dashboard');

	const page = usePage();
	const perPage = usePerPage();

	return (
		<div className="px-6 py-3 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<span className="text-sm text-text-secondary hidden sm:inline">
					{t('tables.users.pagination.per_page_label')}
				</span>
				<Listbox value={perPage} onChange={setPerPage}>
					<div className="relative">
						<ListboxButton
							disabled={isLoading}
							className="relative min-w-12 cursor-pointer bg-primary hover:bg-primary-hover border border-tertiary rounded-md py-1 px-3 text-center text-sm font-medium text-text-primary focus:outline-none "
						>
							{perPage}
						</ListboxButton>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<ListboxOptions className="absolute bottom-full mb-1 min-w-12 bg-primary border border-tertiary shadow-md max-h-40 rounded-md py-1 overflow-auto focus:outline-none text-sm">
								{[10, 25, 50].map((num) => (
									<ListboxOption
										key={num}
										value={num}
										className={({ focus }) =>
											classNames('cursor-pointer select-none relative py-1 px-3 text-center text-text-primary', {
												'bg-primary-hover': focus,
											})
										}
									>
										{num}
									</ListboxOption>
								))}
							</ListboxOptions>
						</Transition>
					</div>
				</Listbox>
			</div>

			<div className="flex items-center gap-3">
				{isLoading ? null : (
					<span className="text-sm text-text-secondary hidden sm:inline">
						{t('tables.users.pagination.page_label', { page, total: totalPages })}
					</span>
				)}
				<div className="inline-flex rounded-md overflow-hidden">
					<button
						onClick={() => setPage(Math.max(1, page - 1))}
						disabled={page === 1 || isLoading}
						className="inline-flex items-center gap-1 px-3 py-1 -mr-[1px] rounded-l-md font-medium bg-primary border border-tertiary text-sm text-text-primary not-disabled:hover:bg-primary-hover focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed not-disabled:cursor-pointer"
					>
						<ChevronLeftIcon className="h-4 w-4" />
						<span className="hidden sm:inline">{t('tables.users.pagination.prev')}</span>
					</button>
					<button
						onClick={() => setPage(Math.min(totalPages, page + 1))}
						disabled={page === totalPages || isLoading}
						className="inline-flex items-center gap-1 px-3 py-1 rounded-r-md font-medium bg-primary border border-tertiary text-sm text-text-primary not-disabled:hover:bg-primary-hover focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed not-disabled:cursor-pointer"
					>
						<span className="hidden sm:inline">{t('tables.users.pagination.next')}</span>
						<ChevronRightIcon className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	);
};
