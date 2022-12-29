declare module '@mui/private-theming' {
	import type { Theme } from '@mui/material/styles';

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

declare interface Window {
	google?: google;
	onGoogleLibraryLoad?: onGoogleLibraryLoad;
}
