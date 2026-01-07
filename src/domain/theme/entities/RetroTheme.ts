// packages/agnostic-ui-theme-retro/src/domain/theme/entities/RetroTheme.ts

import { Theme } from '@damarkuncoro/agnostic-ui-theme-core';
import { BaseEntity } from '../../shared/BaseEntity';

/**
 * Retro Theme Entity
 * Wraps base Theme with retro-specific business rules and validations
 */
export class RetroTheme extends BaseEntity {
  private _baseTheme: Theme;
  private _retroOverrides: Record<string, any>;
  private _retroMetadata: Record<string, any>;
  private domainEvents: any[] = [];

  private constructor(
    id: string,
    baseTheme: Theme,
    retroOverrides: Record<string, any> = {},
    retroMetadata: Record<string, any> = {}
  ) {
    super(id);
    this._baseTheme = baseTheme;
    this._retroOverrides = { ...retroOverrides };
    this._retroMetadata = { ...retroMetadata };

    this.validateRetroBusinessRules();
  }

  /**
   * Creates a new RetroTheme instance
   */
  static create(params: {
    id?: string;
    baseTheme: Theme;
    retroOverrides?: Record<string, any>;
    retroMetadata?: Record<string, any>;
  }): RetroTheme {
    const themeId = params.id || crypto.randomUUID();

    const theme = new RetroTheme(
      themeId,
      params.baseTheme,
      params.retroOverrides,
      params.retroMetadata
    );

    // Emit creation event
    theme.addDomainEvent({
      eventType: 'RetroThemeCreatedEvent',
      themeId,
      baseThemeVersion: params.baseTheme.version,
      retroOverrides: Object.keys(params.retroOverrides || {}),
      timestamp: new Date()
    });

    return theme;
  }

  /**
   * Validates retro-specific business rules
   */
  private validateRetroBusinessRules(): void {
    // Ensure base theme is valid
    if (!this._baseTheme) {
      throw new Error('RetroTheme must have a valid base theme');
    }

    // Validate retro color palette structure
    this.validateRetroColorPalette();

    // Validate retro typography
    this.validateRetroTypography();

    // Validate retro shadows
    this.validateRetroShadows();
  }

  /**
   * Validates retro color palette business rules
   */
  private validateRetroColorPalette(): void {
    const retroColors = this._retroOverrides?.color;
    if (!retroColors) return;

    // Retro themes must have warm, vintage colors
    const requiredColors = ['neutral', 'primary', 'secondary'];
    for (const colorName of requiredColors) {
      if (!retroColors[colorName]) {
        throw new Error(`Retro theme must define ${colorName} color palette`);
      }
    }

    // Validate color warmth (retro colors should be warm)
    this.validateColorWarmth(retroColors);
  }

  /**
   * Validates that colors are warm/vintage appropriate
   */
  private validateColorWarmth(colors: Record<string, any>): void {
    // Retro colors should have warm undertones
    // This is a business rule for retro theme aesthetics
    const warmColorThreshold = 0.3; // Warm colors have higher red/yellow components

    for (const [colorName, colorShades] of Object.entries(colors)) {
      if (typeof colorShades === 'object' && colorShades !== null) {
        for (const [shade, hexColor] of Object.entries(colorShades)) {
          if (typeof hexColor === 'string' && hexColor.startsWith('#')) {
            const warmth = this.calculateColorWarmth(hexColor);
            if (warmth < warmColorThreshold) {
              console.warn(`Color ${colorName}.${shade} (${hexColor}) may not be warm enough for retro theme`);
            }
          }
        }
      }
    }
  }

  /**
   * Calculates color warmth (simple heuristic)
   */
  private calculateColorWarmth(hexColor: string): number {
    // Remove # if present
    const hex = hexColor.replace('#', '');

    // Parse RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Warmth heuristic: higher red/yellow vs blue
    const warmth = (r + g * 0.8) / (r + g + b + 1);
    return warmth;
  }

  /**
   * Validates retro typography business rules
   */
  private validateRetroTypography(): void {
    const retroTypography = this._retroOverrides?.typography;
    if (!retroTypography) return;

    // Retro themes typically use monospace fonts
    const fontFamily = retroTypography.fontFamily?.base;
    if (fontFamily && !fontFamily.includes('monospace') && !fontFamily.includes('Courier')) {
      console.warn('Retro themes typically use monospace fonts like Courier New');
    }
  }

  /**
   * Validates retro shadow business rules
   */
  private validateRetroShadows(): void {
    const retroShadows = this._retroOverrides?.shadow?.semantic;
    if (!retroShadows) return;

    // Retro shadows should be subtle and warm
    for (const [size, shadowValue] of Object.entries(retroShadows)) {
      if (typeof shadowValue === 'string') {
        // Check if shadow uses warm colors (not pure black)
        if (shadowValue.includes('rgba(0,0,0') || shadowValue.includes('#000')) {
          console.warn(`Retro shadow ${size} uses pure black - consider warm brown tones`);
        }
      }
    }
  }

  /**
   * Gets the complete merged theme tokens
   */
  getTokens(): Record<string, any> {
    // Get base theme tokens and deep merge with retro overrides
    const baseTokens = this._baseTheme.toUiTheme().tokens;
    return this.deepMerge(baseTokens, this._retroOverrides);
  }

  /**
   * Gets retro-specific overrides only
   */
  getRetroOverrides(): Record<string, any> {
    return { ...this._retroOverrides };
  }

  /**
   * Updates retro overrides
   */
  updateRetroOverrides(overrides: Record<string, any>): void {
    this._retroOverrides = { ...overrides };
    this.validateRetroBusinessRules();
    this.markAsModified();

    this.addDomainEvent({
      eventType: 'RetroThemeOverridesUpdatedEvent',
      themeId: this.id,
      updatedOverrides: Object.keys(overrides),
      timestamp: new Date()
    });
  }

  /**
   * Deep merges two objects
   */
  private deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = { ...target };

    for (const key in source) {
      const srcValue = source[key];
      const tgtValue = target[key];

      if (this.isObject(srcValue) && this.isObject(tgtValue)) {
        result[key] = this.deepMerge(tgtValue as Record<string, any>, srcValue as Record<string, any>);
      } else if (srcValue !== undefined) {
        result[key] = srcValue;
      }
    }

    return result;
  }

  /**
   * Checks if value is an object
   */
  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' &&
           value !== null &&
           !Array.isArray(value) &&
           !(value instanceof Date) &&
           !(value instanceof RegExp);
  }

  /**
   * Adds a domain event
   */
  private addDomainEvent(event: any): void {
    this.domainEvents.push(event);
  }

  /**
   * Gets and clears domain events
   */
  public getDomainEvents(): any[] {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }

  // Getters
  get baseTheme(): Theme {
    return this._baseTheme;
  }

  get retroMetadata(): Record<string, any> {
    return { ...this._retroMetadata };
  }

  get isValidRetroTheme(): boolean {
    try {
      this.validateRetroBusinessRules();
      return true;
    } catch {
      return false;
    }
  }

  get retroCharacteristics(): string[] {
    const characteristics: string[] = [];

    if (this._retroOverrides?.typography?.fontFamily?.base?.includes('monospace')) {
      characteristics.push('monospace-font');
    }

    if (this._retroOverrides?.color?.palette?.neutral) {
      characteristics.push('warm-palette');
    }

    if (this._retroOverrides?.shadow?.semantic) {
      characteristics.push('soft-shadows');
    }

    return characteristics;
  }
}