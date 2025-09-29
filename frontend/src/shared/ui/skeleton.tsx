import classNames from 'classnames';

import type { FunctionComponent } from 'react';

type Props =
	| {
			className?: string;
	  }
	| undefined;

export const Skeleton: FunctionComponent<Props> = ({ className } = {}) => (
	<div className={classNames('w-4 h-4 bg-primary-hover shadow-md rounded animate-pulse', className)} />
);
