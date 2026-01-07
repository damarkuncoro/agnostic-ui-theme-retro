// src/retro.ts

import { themeCore, type UiTheme } from "@damarkuncoro/agnostic-ui-theme-core"

// Retro theme extending theme-core with retro-specific token overrides
export const retroTheme: UiTheme = {
  ...themeCore,
  tokens: {
    ...themeCore.tokens,
    // Retro-specific color palette overrides
    color: {
      ...themeCore.tokens.color,
      palette: {
        ...themeCore.tokens.color.palette,
        neutral: {
          50: "#fff7ed", 100: "#fff7ed", 200: "#fed7aa", 300: "#fdba74",
          400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c",
          800: "#9a3412", 900: "#3c1f0f"
        },
        primary: { 500: "#d35400", 600: "#b84300" },
        secondary: { 500: "#8b5e3c", 600: "#6b4a2f" }
      },
      text: {
        primary: "#3c1f0f",
        secondary: "#8b5e3c",
        muted: "#d9b899",
        inverse: "#ffffff",
        disabled: "#a16207"
      },
      background: {
        surface: "#fff4e6",
        elevated: "#fdebd0",
        muted: "#fbe3c4",
        inverse: "#3c1f0f"
      },
      border: {
        default: "#e0c4a1",
        subtle: "#f5f5f4",
        strong: "#d9b899",
        focus: "#d35400"
      }
    },
    // Retro-specific typography overrides (fontFamily not in UiTheme interface)
    typography: {
      ...themeCore.tokens.typography
      // Note: fontFamily would be added in extended tokens if needed
    },
    // Retro-specific shadow overrides (must be Record<string, string>)
    shadow: {
      ...themeCore.tokens.shadow,
      "retro-sm": "0 1px 2px rgba(60,31,15,0.25)",
      "retro-md": "0 4px 6px rgba(60,31,15,0.35)",
      "retro-lg": "0 10px 15px rgba(60,31,15,0.35)",
      "retro-focus": "0 0 0 2px rgba(211, 84, 0, 0.5)"
    }
  }
}
