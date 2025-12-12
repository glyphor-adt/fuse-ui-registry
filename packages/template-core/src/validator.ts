import { ZodError } from "zod";
import { TemplateConfigSchema } from "./schema";
import type { TemplateConfig } from "./schema";

/**
 * Custom error class for template validation errors
 */
export class TemplateValidationError extends Error {
  public readonly errors: Array<{ path: string; message: string }>;

  constructor(zodError: ZodError) {
    const errors = zodError.errors.map((err) => ({
      path: err.path.join(".") || "root",
      message: err.message,
    }));

    const errorMessages = errors
      .map((err) => `  - ${err.path}: ${err.message}`)
      .join("\n");

    super(
      `Template configuration validation failed:\n${errorMessages}\n\nPlease fix the above errors and try again.`
    );

    this.name = "TemplateValidationError";
    this.errors = errors;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, TemplateValidationError);
    }
  }
}

/**
 * Validates a template configuration object against the schema
 *
 * @param config - The template configuration object to validate
 * @returns The validated and typed configuration object
 * @throws {TemplateValidationError} If validation fails, with clear error messages
 *
 * @example
 * ```typescript
 * import { validateTemplateConfig } from '@fuse-ui/template-core';
 *
 * try {
 *   const config = validateTemplateConfig({
 *     meta: { title: 'My Template' },
 *     brand: { name: 'My Brand' },
 *     theme: { mode: 'light' },
 *     nav: { items: [] },
 *     hero: { title: 'Welcome' },
 *     sections: []
 *   });
 *   console.log('Valid config:', config);
 * } catch (error) {
 *   if (error instanceof TemplateValidationError) {
 *     console.error('Validation errors:', error.errors);
 *   }
 * }
 * ```
 */
export function validateTemplateConfig(config: unknown): TemplateConfig {
  try {
    return TemplateConfigSchema.parse(config);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new TemplateValidationError(error);
    }
    throw error;
  }
}

/**
 * Validates a template configuration object and returns success/error result
 * without throwing
 *
 * @param config - The template configuration object to validate
 * @returns Object with success flag and either data or formatted errors
 *
 * @example
 * ```typescript
 * import { safeValidateTemplateConfig } from '@fuse-ui/template-core';
 *
 * const result = safeValidateTemplateConfig(config);
 * if (result.success) {
 *   console.log('Valid config:', result.data);
 * } else {
 *   console.error('Validation errors:', result.errors);
 * }
 * ```
 */
export function safeValidateTemplateConfig(
  config: unknown
):
  | { success: true; data: TemplateConfig }
  | { success: false; errors: Array<{ path: string; message: string }> } {
  const result = TemplateConfigSchema.safeParse(config);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: result.error.errors.map((err) => ({
      path: err.path.join(".") || "root",
      message: err.message,
    })),
  };
}
