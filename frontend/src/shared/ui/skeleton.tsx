import classNames from 'classnames';

import type { FunctionComponent } from 'react';

type Props =
	| {
			className?: string;
	  }
	| undefined;

export const Skeleton: FunctionComponent<Props> = ({ className } = {}) => (
	<div className={classNames('h-4 w-4 bg-gray-200 rounded', className)} />
);
