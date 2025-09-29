import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

import { Order, SortBy } from '@/shared/constants';
import { TableHeadCell } from '@/shared/ui';

import { setSortBy, useOrder, useSortBy } from '../model';

import type { FunctionComponent, ReactNode } from 'react';

type Props = {
	columnName: SortBy;
	children: ReactNode;
	disabled?: boolean;
	className?: string;
	onChange?: () => void;
};

export const SortableTableHeadCell: FunctionComponent<Props> = ({
	columnName,
	children,
	disabled,
	className,
	onChange,
}) => {
	const sortBy = useSortBy();
	const order = useOrder();

	const handleChangeSort = () => {
		if (disabled) return null;

		onChange?.();
		setSortBy(columnName);
	};

	return (
		<TableHeadCell className={classNames('cursor-pointer', className)} onClick={handleChangeSort}>
			<div className="inline-flex items-center gap-1">
				{children}
				<div className="flex flex-col">
					<ChevronUpIcon
						className={`h-3 w-3 -mb-0.5 ${sortBy === columnName && order === Order.Asc ? 'text-text-primary' : 'text-text-secondary opacity-40'}`}
					/>
					<ChevronDownIcon
						className={`h-3 w-3 -mt-0.5 ${sortBy === columnName && order === Order.Desc ? 'text-text-primary' : 'text-text-secondary opacity-40'}`}
					/>
				</div>
			</div>
		</TableHeadCell>
	);
};
