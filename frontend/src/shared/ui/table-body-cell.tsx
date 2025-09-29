import classNames from 'classnames';

import type { FunctionComponent, ReactNode } from 'react';

type Props = {
	colSpan?: number;
	children: ReactNode;
	className?: string;
};

export const TableBodyCell: FunctionComponent<Props> = ({ colSpan, children, className }) => (
	<td colSpan={colSpan} className={classNames('px-6 py-4 whitespace-nowrap text-sm text-text-primary', className)}>
		{children}
	</td>
);
