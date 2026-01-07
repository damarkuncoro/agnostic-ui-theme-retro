# @damarkuncoro/agnostic-ui-theme-retro

## 🚀 **Enterprise DDD Retro Theme System**

**Domain-Driven Design (DDD) + DRY + SOLID Architecture** for retro-themed design tokens. This package provides **enterprise-grade retro theme orchestration** with rich domain models, comprehensive business rules for retro aesthetics, and extensible token systems.

### ✨ **DDD Architecture Excellence**

#### **🏗️ Complete DDD Layer Structure**
```
theme-packages/agnostic-ui-theme-retro/src/
├── domain/                    # Domain Layer - Retro Business Logic & Rules
│   ├── shared/                # Shared Kernel
│   │   └── BaseEntity.ts      # Base entity with common functionality
│   └── theme/                 # Retro Theme Bounded Context
│       └── entities/
│           └── RetroTheme.ts  # Retro theme entity with business rules
├── application/               # Application Layer - Retro Theme Use Cases
│   └── services/
│       └── RetroThemeBuilderService.ts # Retro theme construction orchestration
└── infrastructure/            # Infrastructure Layer - External Concerns
    └── bootstrap.ts           # Dependency Injection Container
```

#### **🎯 DDD Domain Features**
- ✅ **Rich Retro Domain Entities**: RetroTheme aggregate with encapsulated retro business logic
- ✅ **Retro Business Rules**: Validation for warm colors, monospace fonts, organic shadows
- ✅ **Retro Value Objects**: Immutable retro token representations with aesthetic validation
- ✅ **Bounded Contexts**: Separate domains for retro color palettes, typography, shadows
- ✅ **Ubiquitous Language**: Retro, vintage, warm, organic, monospace terminology
- ✅ **Retro Aesthetics Rules**: Color warmth validation, font appropriateness, shadow characteristics

## 🏛️ **SOLID Architecture Implementation**

### **✅ Single Responsibility**
- **`RetroTheme` Entity**: Retro theme business logic and aesthetic validation only
- **`RetroThemeBuilderService`**: Retro theme construction orchestration only
- **Domain Validators**: Retro-specific validation rules only

### **✅ Open/Closed Principle**
- **Extensible Retro Rules**: New retro aesthetic rules without modifying existing code
- **Pluggable Retro Builders**: New retro generation strategies via composition
- **Retro Domain Extensions**: New retro business rules without changing core entities

### **✅ Liskov Substitution**
- **Retro Theme Contracts**: All retro implementations adhere to consistent theme interfaces
- **Retro Service Abstractions**: Clean interfaces for retro theme operations
- **Immutable Retro Operations**: All retro transformations return new instances

### **✅ Interface Segregation**
- **Focused Retro Contracts**: Specific interfaces for retro color, typography, shadow domains
- **Retro Service Interfaces**: Minimal interfaces for retro theme operations
- **Retro Domain Boundaries**: Clear separation between retro aesthetic concerns

### **✅ Dependency Inversion**
- **Retro Application Layer**: Depends on retro domain abstractions, not infrastructure
- **Clean Retro Architecture**: Retro business rules independent of external concerns
- **Retro Testability**: Dependency injection enables comprehensive retro testing

## 💧 **DRY Principles Applied**

### **✅ Eliminated Code Duplication**
- **Retro Token Generation**: Centralized in `RetroThemeBuilderService.buildRetroTheme()`
- **Retro Validation Logic**: Unified in RetroTheme entity business rules
- **Retro Theme Construction**: Orchestrated through `RetroThemeBuilderService`
- **Retro Business Rules**: Encapsulated in RetroTheme domain entity

### **✅ Reusable Retro Builders**
```typescript
// DRY: One-stop retro theme generation
const retroTheme = RetroThemeBuilderService.buildPresetRetroTheme('classic');
```

### **✅ Retro Semantic Patterns**
```typescript
// DRY: Consistent retro aesthetic access
const retroTheme = RetroTheme.create({ baseTheme, retroOverrides });
const warmColors = retroTheme.getRetroOverrides().color;
const organicShadows = retroTheme.getRetroOverrides().shadow.semantic;
```

## 🎨 **Rich Retro Domain System**

### **🎨 Retro Color Domain**
- **Warm Color Validation**: Ensures colors meet retro warmth requirements
- **Retro Palette Generation**: Automatic generation of retro color scales
- **Aesthetic Compliance**: Business rules for retro color appropriateness

### **📝 Retro Typography Domain**
- **Font Appropriateness**: Validation for retro-appropriate fonts (monospace, serif)
- **Retro Typography Rules**: Business rules for retro text styling
- **Readability Validation**: Ensures retro fonts maintain accessibility

### **🎭 Retro Shadow Domain**
- **Organic Shadow Generation**: Creates warm, soft shadows characteristic of retro design
- **Retro Shadow Validation**: Ensures shadows complement retro aesthetic
- **Depth Hierarchy**: Proper shadow progression for retro interfaces

## 🏭 **Application Services**

### **🎯 RetroThemeBuilderService**
```typescript
// Enterprise retro theme construction
const builder = getRetroThemeBuilderService();
const retroTheme = builder.buildRetroTheme({
  retroColors: {
    primary: '#d35400',
    secondary: '#8b5e3c',
    neutral: '#f5f5f4'
  },
  retroTypography: {
    fontFamily: 'Courier New, monospace'
  }
});
```

### **✅ Retro Theme Validation**
```typescript
// Comprehensive retro aesthetic validation
const retroTheme = RetroTheme.create({ baseTheme, retroOverrides });
const isValidRetro = retroTheme.isValidRetroTheme;
const retroCharacteristics = retroTheme.retroCharacteristics;
// → ['monospace-font', 'warm-palette', 'soft-shadows']
```

## 🚀 **DDD API Usage Examples**

### **🏗️ Modern DDD Retro API**
```typescript
import {
  RetroTheme,
  RetroThemeBuilderService,
  getRetroThemeBuilderService
} from '@damarkuncoro/agnostic-ui-theme-retro';

// Build custom retro theme
const builder = getRetroThemeBuilderService();
const retroTheme = builder.buildRetroTheme({
  retroColors: {
    primary: '#d35400',
    secondary: '#8b5e3c',
    textPrimary: '#3c1f0f'
  },
  retroTypography: {
    fontFamily: 'Courier New, monospace'
  }
});

// Access retro domain entity
console.log(retroTheme.retroCharacteristics); // ['monospace-font', 'warm-palette']
console.log(retroTheme.isValidRetroTheme); // true

// Get merged tokens
const tokens = retroTheme.getTokens();
console.log(tokens.color.palette.primary); // Retro color palette
```

### **🎭 Retro Theme Presets**
```typescript
import { getRetroThemeBuilderService } from '@damarkuncoro/agnostic-ui-theme-retro';

// Use preset retro themes
const builder = getRetroThemeBuilderService();
const classicRetro = builder.buildPresetRetroTheme('classic');
const vintageRetro = builder.buildPresetRetroTheme('vintage');
const neonRetro = builder.buildPresetRetroTheme('neon');
```

### **🔄 Legacy Compatibility**
```typescript
import { retroTheme, createRetroTheme } from '@damarkuncoro/agnostic-ui-theme-retro';

// Existing code continues to work unchanged
const theme = retroTheme;
const customRetro = createRetroTheme({
  primaryColor: '#d35400',
  fontFamily: 'Courier New, monospace'
});
```

## 📊 **Quality Metrics Achieved**

| Metric | Legacy Implementation | DDD Implementation | Improvement |
|--------|----------------------|-------------------|-------------|
| **Retro Logic** | Scattered hardcoded values | Encapsulated domain rules | ✅ **Business Rules** |
| **Retro Validation** | Manual checks | Automated aesthetic validation | ✅ **Comprehensive** |
| **Retro Extensibility** | Hard to modify | Easy to extend retro rules | ✅ **Future-proof** |
| **Retro Testing** | Hard to isolate | DI-enabled testing | ✅ **Thorough** |
| **Retro Consistency** | Inconsistent application | Domain-enforced consistency | ✅ **Enterprise-grade** |
| **Retro Aesthetics** | Subjective decisions | Objective business rules | ✅ **Measurable** |

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
