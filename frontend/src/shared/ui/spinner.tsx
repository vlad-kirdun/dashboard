import type { FunctionComponent } from 'react';

type Props =
	| {
			size?: number;
	  }
	| undefined;

export const Spinner: FunctionComponent<Props> = ({ size = 24 } = {}) => (
	<div
		className="animate-spin rounded-full border-4 border-gray-300 border-t-indigo-700"
		style={{ width: size, height: size }}
	/>
);
