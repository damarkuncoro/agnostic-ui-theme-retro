// packages/agnostic-ui-theme-retro/src/infrastructure/bootstrap.ts

import { RetroThemeBuilderService } from '../application/services/RetroThemeBuilderService';

/**
 * Dependency Injection Container for Retro Theme Package
 */

// Singleton instances
let retroThemeBuilderServiceInstance: RetroThemeBuilderService | null = null;

/**
 * Gets the RetroThemeBuilderService instance
 */
export function getRetroThemeBuilderService(): RetroThemeBuilderService {
  if (!retroThemeBuilderServiceInstance) {
    retroThemeBuilderServiceInstance = new RetroThemeBuilderService();
  }
  return retroThemeBuilderServiceInstance;
}

/**
 * Resets all service instances (useful for testing)
 */
export function resetRetroThemeServices(): void {
  retroThemeBuilderServiceInstance = null;
}

/**
 * Initializes the retro theme package
 */
export function initializeRetroThemePackage(): void {
  // Pre-initialize services if needed
  getRetroThemeBuilderService();
}