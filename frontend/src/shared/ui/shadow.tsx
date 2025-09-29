import classNames from 'classnames';

import type { FunctionComponent } from 'react';

type Props = {
	position: 'left' | 'right';
};

export const Shadow: FunctionComponent<Props> = ({ position }) => (
	<div
		className={classNames('pointer-events-none absolute top-0 bottom-0 w-6 from-slate-900/15 to-transparent', {
			'left-0 bg-gradient-to-r': position === 'left',
			'right-0 bg-gradient-to-l': position === 'right',
		})}
	/>
);
