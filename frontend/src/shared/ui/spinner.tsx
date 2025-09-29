import type { FunctionComponent } from 'react';

type Props =
	| {
			size?: number;
	  }
	| undefined;

export const Spinner: FunctionComponent<Props> = ({ size = 24 } = {}) => (
	<div
		className="animate-spin rounded-full border-4 border-tertiary border-t-accent"
		style={{ width: size, height: size }}
	/>
);
