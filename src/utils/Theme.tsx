
export type PaletteTheme = 'light' | 'dark';

/* LIGHT MODE PALETTE
--lavender-web: #e8e1efff;
--mint-green: #d9fff8ff;
--tea-green: #c7ffdaff;
--tea-green-2: #c4f4c7ff;
--cambridge-blue: #9bb291ff;
*/

export const getDesignTokens = (mode: PaletteTheme) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#e8e1ef',
        },
        secondary: {
          main: '#70c1b3',
        },
      }
      : { /* palette values for dark mode  */ }
    )
  }
});
