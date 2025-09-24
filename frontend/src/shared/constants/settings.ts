const Mode = {
	Light: 'light',
	Dark: 'dark',
} as const;

type Mode = (typeof Mode)[keyof typeof Mode];

const Lang = {
	EN: 'en',
	RU: 'ru',
	UK: 'uk',
} as const;

type Lang = (typeof Lang)[keyof typeof Lang];

export { Mode, Lang };
