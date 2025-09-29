import { Skeleton, TableBodyCell } from '@/shared/ui';

import type { FunctionComponent } from 'react';

type Props = {
	rows: number;
};

export const TableSkeleton: FunctionComponent<Props> = ({ rows }) => (
	<>
		{Array.from({ length: rows }).map((_, i) => (
			<tr key={i} className="animate-pulse">
				<TableBodyCell>
					<div className="flex items-center gap-3">
						<Skeleton className="w-8 h-8 rounded-full" />
						<div className="flex-1">
							<Skeleton className="w-32 mb-2" />
							<Skeleton className="w-full h-3!" />
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell>
					<Skeleton className="w-full" />
				</TableBodyCell>
				<TableBodyCell>
					<Skeleton className="w-full" />
				</TableBodyCell>
				<TableBodyCell>
					<Skeleton className="w-full ml-auto" />
				</TableBodyCell>
			</tr>
		))}
	</>
);
