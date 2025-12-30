// src/retro.ts

import type { UiTheme } from "@damarkuncoro/agnostic-ui-contract-core"
import { themeCore } from "@damarkuncoro/agnostic-ui-theme-core"

// Simple deep merge function
function deepMerge(target: any, source: any): any {
  const result = { ...target }
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}

export const retroTheme: UiTheme = deepMerge(themeCore, {
  tokens: {
    color: {
      palette: {
        primary: {
          500: "#d35400",
          600: "#b84300"
        },
        neutral: {
          50: "#fff7ed",
          900: "#3c1f0f"
        }
      },
      text: {
        primary: "#3c1f0f",
        secondary: "#8b5e3c",
        muted: "#d9b899"
      },
      background: {
        surface: "#fff4e6",
        elevated: "#fdebd0",
        muted: "#fbe3c4"
      },
      border: {
        default: "#e0c4a1",
        focus: "#d35400"
      }
    },

    typography: {
      fontFamily: {
        base: "Courier New, monospace"
      }
    },

    shadow: {
      scale: {
        1: "0 1px 2px rgba(60,31,15,0.25)",
        2: "0 4px 6px rgba(60,31,15,0.35)"
      }
    }
  }
})
