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
						<Skeleton className="h-8 w-8 rounded-full" />
						<div>
							<Skeleton className="w-32 mb-2" />
							<Skeleton className="h-3 w-20 bg-gray-100 rounded" />
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell>
					<Skeleton className="w-40" />
				</TableBodyCell>
				<TableBodyCell>
					<Skeleton className="w-24" />
				</TableBodyCell>
				<TableBodyCell>
					<Skeleton className="w-16 ml-auto" />
				</TableBodyCell>
			</tr>
		))}
	</>
);
