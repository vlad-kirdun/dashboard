import classNames from 'classnames';

import type { FunctionComponent, ReactNode } from 'react';

type Props = {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
};

export const TableHeadCell: FunctionComponent<Props> = ({ children, className, onClick }) => (
	<th
		scope="col"
		className={classNames('px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider', className)}
		onClick={onClick}
	>
		{children}
	</th>
);
