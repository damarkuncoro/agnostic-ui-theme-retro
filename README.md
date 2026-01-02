# @damarkuncoro/agnostic-ui-theme-retro

Retro theme variant for Agnostic UI. This package extends the core theme with retro-inspired color palettes, typography, and visual styling.

## Features

- ✅ **Retro Color Palette**: Warm, vintage-inspired colors with sepia and amber tones
- ✅ **Monospace Typography**: Courier New font family for that classic terminal feel
- ✅ **Organic Shadows**: Subtle, warm shadow effects that complement the retro aesthetic
- ✅ **Theme Extension**: Builds upon theme-core with targeted token overrides
- ✅ **Framework Agnostic**: Pure design data, works with any rendering system

## Installation

```bash
npm install @damarkuncoro/agnostic-ui-theme-retro
```

## Usage

Import and use the retro theme:

```typescript
import { retroTheme } from '@damarkuncoro/agnostic-ui-theme-retro'
import { validateTheme } from '@damarkuncoro/agnostic-ui-theme-core'

// Use the retro theme
const theme = retroTheme

// Validate theme compatibility
validateTheme(theme)

// Theme contains all contract-core tokens with retro-specific overrides
console.log(theme.tokens.color.palette.primary) // Retro orange tones
console.log(theme.tokens.typography.fontFamily.base) // "Courier New, monospace"
```

## Architecture

```
theme-core (base theme with all tokens)
   ↓ extends
theme-retro (retro-specific token overrides)
```

The retro theme inherits all tokens from theme-core and selectively overrides:
- **Colors**: Retro palette with warm, vintage colors
- **Typography**: Monospace fonts for terminal aesthetic
- **Shadows**: Organic, warm shadow effects

## Retro Design Characteristics

- **Color Palette**: Sepia, amber, and warm brown tones
- **Typography**: Monospace fonts (Courier New)
- **Shadows**: Soft, organic shadows with warm opacity
- **Spacing**: Inherits standard spacing from theme-core
- **Borders**: Warm border colors complementing the palette

## Dependencies

- `@damarkuncoro/agnostic-ui-theme-core`: Base theme with all token definitions

## Integration

The retro theme works seamlessly with all Agnostic UI components and skins:

```typescript
// Use with resolvers
import { resolveTheme } from '@damarkuncoro/agnostic-ui-contract-core'

// Resolve retro theme for runtime usage
const resolvedTheme = resolveTheme(retroTheme, { mode: 'static' })
```

## License

MIT
