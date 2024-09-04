/**
 * A generic class that acts as a proxy for a use case instance.
 * @template T - The type of the use case.
 */
export class UseCaseProxy<T> {
  /**
   * Initializes a new instance of the UseCaseProxy class.
   * @param useCase - The use case instance to be proxied.
   */
  constructor(private readonly useCase: T) {}

  /**
   * Gets the proxied use case instance.
   * @returns The proxied use case instance.
   */
  getInstance(): T {
    return this.useCase;
  }
}
