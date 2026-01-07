// packages/agnostic-ui-theme-retro/src/application/services/RetroThemeBuilderService.ts

import { Theme, getThemeBuilderService } from '@damarkuncoro/agnostic-ui-theme-core';
import { RetroTheme } from '../../domain/theme/entities/RetroTheme';

/**
 * Retro Theme Builder Service
 * Orchestrates the construction of retro themes with business rules
 */
export class RetroThemeBuilderService {
  private themeBuilderService = getThemeBuilderService();

  /**
   * Builds a complete retro theme from configuration
   */
  buildRetroTheme(config: RetroThemeConfig): RetroTheme {
    // Create base theme using theme-core builder
    const baseTheme = this.themeBuilderService.buildTheme({
      color: config.baseColors,
      spacing: config.spacing,
      typography: config.typography
    });

    // Create retro-specific overrides
    const retroOverrides = this.generateRetroOverrides(config);

    // Create and return retro theme entity
    return RetroTheme.create({
      baseTheme,
      retroOverrides,
      retroMetadata: {
        style: 'retro',
        version: '1.0',
        generatedAt: new Date().toISOString(),
        config: config
      }
    });
  }

  /**
   * Builds a retro theme with preset configurations
   */
  buildPresetRetroTheme(preset: RetroPreset): RetroTheme {
    const presetConfig = this.getPresetConfig(preset);
    return this.buildRetroTheme(presetConfig);
  }

  /**
   * Generates retro-specific token overrides
   */
  private generateRetroOverrides(config: RetroThemeConfig): Record<string, any> {
    const overrides: Record<string, any> = {};

    // Color overrides for retro aesthetic
    if (config.retroColors) {
      overrides.color = {
        palette: this.generateRetroPalette(config.retroColors),
        text: this.generateRetroTextColors(config.retroColors),
        background: this.generateRetroBackgroundColors(config.retroColors),
        border: this.generateRetroBorderColors(config.retroColors)
      };
    }

    // Typography overrides
    if (config.retroTypography) {
      overrides.typography = {
        fontFamily: { base: config.retroTypography.fontFamily || "Courier New, monospace" }
      };
    }

    // Shadow overrides for retro aesthetic
    overrides.shadow = {
      semantic: this.generateRetroShadows(config.retroColors?.primary || '#d35400')
    };

    return overrides;
  }

  /**
   * Generates retro color palette
   */
  private generateRetroPalette(colors: RetroColorConfig): Record<string, Record<string, string>> {
    return {
      neutral: this.generateNeutralScale(colors.neutral || '#f5f5f4'),
      primary: this.generatePrimaryScale(colors.primary || '#d35400'),
      secondary: this.generateSecondaryScale(colors.secondary || '#8b5e3c')
    };
  }

  /**
   * Generates neutral color scale with retro warmth
   */
  private generateNeutralScale(baseColor: string): Record<string, string> {
    // Generate warm neutral scale
    return {
      50: this.adjustColorWarmth(baseColor, 0.95),
      100: this.adjustColorWarmth(baseColor, 0.9),
      200: this.adjustColorWarmth(baseColor, 0.8),
      300: this.adjustColorWarmth(baseColor, 0.7),
      400: this.adjustColorWarmth(baseColor, 0.6),
      500: baseColor,
      600: this.adjustColorWarmth(baseColor, 0.4),
      700: this.adjustColorWarmth(baseColor, 0.3),
      800: this.adjustColorWarmth(baseColor, 0.2),
      900: this.adjustColorWarmth(baseColor, 0.1)
    };
  }

  /**
   * Generates primary color scale
   */
  private generatePrimaryScale(baseColor: string): Record<string, string> {
    return {
      500: baseColor,
      600: this.adjustBrightness(baseColor, -20)
    };
  }

  /**
   * Generates secondary color scale
   */
  private generateSecondaryScale(baseColor: string): Record<string, string> {
    return {
      500: baseColor,
      600: this.adjustBrightness(baseColor, -15)
    };
  }

  /**
   * Generates retro text colors
   */
  private generateRetroTextColors(colors: RetroColorConfig): Record<string, string> {
    return {
      primary: colors.textPrimary || '#3c1f0f',
      secondary: colors.textSecondary || '#8b5e3c',
      muted: colors.textMuted || '#d9b899',
      inverse: colors.textInverse || '#ffffff',
      disabled: colors.textDisabled || '#a16207'
    };
  }

  /**
   * Generates retro background colors
   */
  private generateRetroBackgroundColors(colors: RetroColorConfig): Record<string, string> {
    return {
      surface: colors.surface || '#fff4e6',
      elevated: colors.elevated || '#fdebd0',
      muted: colors.muted || '#fbe3c4',
      inverse: colors.inverse || '#3c1f0f'
    };
  }

  /**
   * Generates retro border colors
   */
  private generateRetroBorderColors(colors: RetroColorConfig): Record<string, string> {
    return {
      default: colors.borderDefault || '#e0c4a1',
      subtle: colors.borderSubtle || '#f5f5f4',
      strong: colors.borderStrong || '#d9b899',
      focus: colors.borderFocus || colors.primary || '#d35400'
    };
  }

  /**
   * Generates retro shadow styles
   */
  private generateRetroShadows(primaryColor: string): Record<string, string> {
    const shadowBase = this.extractRgb(primaryColor);
    return {
      sm: `0 1px 2px rgba(${shadowBase.r}, ${shadowBase.g}, ${shadowBase.b}, 0.25)`,
      md: `0 4px 6px rgba(${shadowBase.r}, ${shadowBase.g}, ${shadowBase.b}, 0.35)`,
      lg: `0 10px 15px rgba(${shadowBase.r}, ${shadowBase.g}, ${shadowBase.b}, 0.35)`,
      focus: `0 0 0 2px rgba(${shadowBase.r}, ${shadowBase.g}, ${shadowBase.b}, 0.5)`
    };
  }

  /**
   * Gets preset configuration
   */
  private getPresetConfig(preset: RetroPreset): RetroThemeConfig {
    const presets: Record<RetroPreset, RetroThemeConfig> = {
      classic: {
        baseColors: {
          palette: { primary: { 500: '#d35400' } },
          text: { primary: '#3c1f0f' },
          background: { surface: '#fff4e6' }
        },
        retroColors: {
          neutral: '#f5f5f4',
          primary: '#d35400',
          secondary: '#8b5e3c',
          textPrimary: '#3c1f0f',
          textSecondary: '#8b5e3c',
          surface: '#fff4e6',
          elevated: '#fdebd0'
        },
        retroTypography: {
          fontFamily: 'Courier New, monospace'
        }
      },
      vintage: {
        baseColors: {
          palette: { primary: { 500: '#b84300' } },
          text: { primary: '#2d1b0f' },
          background: { surface: '#fef3e7' }
        },
        retroColors: {
          neutral: '#f3f2f1',
          primary: '#b84300',
          secondary: '#6b4a2f',
          textPrimary: '#2d1b0f',
          textSecondary: '#6b4a2f',
          surface: '#fef3e7',
          elevated: '#fce5cd'
        },
        retroTypography: {
          fontFamily: 'Times New Roman, serif'
        }
      },
      neon: {
        baseColors: {
          palette: { primary: { 500: '#ff0080' } },
          text: { primary: '#ffffff' },
          background: { surface: '#0a0a0a' }
        },
        retroColors: {
          neutral: '#1a1a1a',
          primary: '#ff0080',
          secondary: '#00ffff',
          textPrimary: '#ffffff',
          textSecondary: '#cccccc',
          surface: '#0a0a0a',
          elevated: '#1a1a1a'
        },
        retroTypography: {
          fontFamily: 'Courier New, monospace'
        }
      }
    };

    return presets[preset];
  }

  /**
   * Adjusts color warmth
   */
  private adjustColorWarmth(color: string, factor: number): string {
    // Simple color adjustment - in real implementation, use a proper color library
    return color; // Placeholder
  }

  /**
   * Adjusts color brightness
   */
  private adjustBrightness(color: string, amount: number): string {
    // Simple brightness adjustment
    return color; // Placeholder
  }

  /**
   * Extracts RGB values from hex color
   */
  private extractRgb(hexColor: string): { r: number; g: number; b: number } {
    const hex = hexColor.replace('#', '');
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    };
  }
}

/**
 * Retro theme configuration
 */
export interface RetroThemeConfig {
  baseColors?: {
    palette?: Record<string, Record<string, string>>;
    text?: Record<string, string>;
    background?: Record<string, string>;
  };
  spacing?: any;
  typography?: any;
  retroColors?: RetroColorConfig;
  retroTypography?: RetroTypographyConfig;
}

/**
 * Retro color configuration
 */
export interface RetroColorConfig {
  neutral?: string;
  primary?: string;
  secondary?: string;
  textPrimary?: string;
  textSecondary?: string;
  textMuted?: string;
  textInverse?: string;
  textDisabled?: string;
  surface?: string;
  elevated?: string;
  muted?: string;
  inverse?: string;
  borderDefault?: string;
  borderSubtle?: string;
  borderStrong?: string;
  borderFocus?: string;
}

/**
 * Retro typography configuration
 */
export interface RetroTypographyConfig {
  fontFamily?: string;
}

/**
 * Retro theme presets
 */
export type RetroPreset = 'classic' | 'vintage' | 'neon';