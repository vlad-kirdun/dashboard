import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
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
		<div className="px-6 py-3 bg-gray-50 border-t border-t-gray-200 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<span className="text-sm text-gray-600 hidden sm:inline">{t('tables.users.pagination.per_page_label')}</span>
				<Listbox value={perPage} onChange={setPerPage}>
					<div className="relative">
						<ListboxButton
							disabled={isLoading}
							className="relative min-w-12 cursor-pointer bg-white border border-gray-300 rounded-md py-1 px-3 text-center text-sm shadow-sm text-gray-700 focus:outline-none hover:bg-gray-50"
						>
							{perPage}
						</ListboxButton>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<ListboxOptions className="absolute bottom-full mb-1 min-w-12 bg-white shadow-lg max-h-40 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
								{[10, 25, 50].map((num) => (
									<ListboxOption
										key={num}
										value={num}
										className={({ focus }) =>
											`cursor-pointer select-none relative py-1 px-3 text-center ${
												focus ? 'bg-indigo-600 text-white' : 'text-gray-900'
											}`
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
					<span className="text-sm text-gray-600 hidden sm:inline">
						{t('tables.users.pagination.page_label', { page, total: totalPages })}
					</span>
				)}
				<div className="inline-flex shadow-sm rounded-md overflow-hidden">
					<button
						onClick={() => setPage(Math.max(1, page - 1))}
						disabled={page === 1 || isLoading}
						className="inline-flex items-center gap-1 px-3 py-1 -mr-[1px] rounded-l-md bg-white border border-gray-300 text-sm text-gray-700 not-disabled:hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed not-disabled:cursor-pointer"
					>
						<ChevronLeftIcon className="h-4 w-4" />
						<span className="hidden sm:inline">{t('tables.users.pagination.prev')}</span>
					</button>
					<button
						onClick={() => setPage(Math.min(totalPages, page + 1))}
						disabled={page === totalPages || isLoading}
						className="inline-flex items-center gap-1 px-3 py-1 rounded-r-md bg-white border border-gray-300 text-sm text-gray-700 not-disabled:hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed not-disabled:cursor-pointer"
					>
						<span className="hidden sm:inline">{t('tables.users.pagination.next')}</span>
						<ChevronRightIcon className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	);
};
