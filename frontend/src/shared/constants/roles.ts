const RoleCode = {
	Admin: 'ADMIN',
	Editor: 'EDITOR',
	Viewer: 'VIEWER',
} as const;

type RoleCode = (typeof RoleCode)[keyof typeof RoleCode];

export { RoleCode };
