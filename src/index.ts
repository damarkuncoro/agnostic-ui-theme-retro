// =================================================================
// Agnostic UI Theme Retro - Domain-Driven Design Architecture
//
// This package provides retro-themed design tokens with comprehensive
// business rules, accessibility validation, and DDD principles.
// =================================================================

// Initialize bootstrap
import './infrastructure/bootstrap';

// =================================================================
// DDD ARCHITECTURE EXPORTS (New Enterprise APIs)
// =================================================================

// Domain Layer
export { RetroTheme } from './domain/theme/entities/RetroTheme';

// Application Layer
export { RetroThemeBuilderService } from './application/services/RetroThemeBuilderService';
export type {
  RetroThemeConfig,
  RetroColorConfig,
  RetroTypographyConfig,
  RetroPreset
} from './application/services/RetroThemeBuilderService';

// Infrastructure Layer
export {
  getRetroThemeBuilderService,
  resetRetroThemeServices,
  initializeRetroThemePackage
} from './infrastructure/bootstrap';

// =================================================================
// LEGACY COMPATIBILITY EXPORTS (Maintained)
// =================================================================

import { Theme, getThemeBuilderService } from '@damarkuncoro/agnostic-ui-theme-core';
import { RetroTheme } from './domain/theme/entities/RetroTheme';
import { getRetroThemeBuilderService } from './infrastructure/bootstrap';

// Legacy retro theme (now powered by DDD)
export const retroTheme: any = (() => {
  const builder = getRetroThemeBuilderService();
  const retroThemeEntity = builder.buildPresetRetroTheme('classic');
  return retroThemeEntity.getTokens();
})();

// Legacy creation function (now uses DDD)
export function createRetroTheme(config?: {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
}): any {
  const builder = getRetroThemeBuilderService();

  const retroConfig = {
    retroColors: {
      primary: config?.primaryColor || '#d35400',
      secondary: config?.secondaryColor || '#8b5e3c'
    },
    retroTypography: {
      fontFamily: config?.fontFamily || 'Courier New, monospace'
    }
  };

  const retroThemeEntity = builder.buildRetroTheme(retroConfig);
  return retroThemeEntity.getTokens();
}
