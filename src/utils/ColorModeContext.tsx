import { createContext } from 'react'
import { PaletteTheme } from './Theme'

interface ColorModeContextType {
    themeMode: PaletteTheme
    setThemeMode: (mode: PaletteTheme) => void
}

// TODO: Create default ColorModeContext and remove undefined
export const ColorModeContext = createContext<ColorModeContextType>(undefined!)
    