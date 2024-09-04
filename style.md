# Coding Style and Standards Guide 🎨📐

This document outlines the coding style and standards followed in the **Mintago Pension API** project. Adhering to these guidelines ensures code consistency, readability, and maintainability across the codebase. 

## Table of Contents

- [General Guidelines](#general-guidelines)
- [Naming Conventions](#naming-conventions)
- [File and Folder Structure](#file-and-folder-structure)
- [Code Formatting](#code-formatting)
- [TypeScript Specific Guidelines](#typescript-specific-guidelines)
- [Commenting and Documentation](#commenting-and-documentation)
- [Error Handling](#error-handling)
- [Testing Guidelines](#testing-guidelines)
- [Version Control](#version-control)

---

## General Guidelines 🛠️

- **Consistency**: Consistency is key. Write code in a consistent style to ensure that it's easy to read, maintain, and collaborate on.
- **Simplicity**: Keep the code simple and avoid over-engineering. Use straightforward solutions and avoid unnecessary complexity.
- **Readability**: Code should be self-explanatory as much as possible. Choose clear, descriptive names for variables, functions, and classes.
- **SOLID Principles**: Adhere to the SOLID principles of object-oriented design to create more understandable, flexible, and maintainable code.

---

## Naming Conventions 📛

### Variables and Functions

- **Variables**:
    - Use `camelCase` for variable names.
    - Names should be descriptive and meaningful.
    - Boolean variables should be prefixed with `is`, `has`, or `should` to indicate their purpose (e.g., `isValid`, `hasPermission`).

- **Functions**:
    - Use `camelCase` for function names.
    - Function names should be verbs that clearly describe what the function does (e.g., `getPensionPot`, `calculateForecastedBalance`).

### Classes and Interfaces

- **Classes**:
    - Use `PascalCase` for class names.
    - Class names should be nouns that represent the object or entity they model (e.g., `PensionPotModel`, `PensionService`).

- **Interfaces**:
    - Use `PascalCase` for interface names.
    - Prefix interface names with an `I` (e.g., `IPensionPotRepository`, `ILogger`).

### Constants

- Use `UPPER_SNAKE_CASE` for constants (e.g., `MAX_PENSION_POTS`, `DEFAULT_INTEREST_RATE`).

### Files and Folders

- File and folder names should be in `kebab-case` (e.g., `pension-pot.controller.ts`, `pension-pot.model.ts`).
- Class and interface file names should match the class or interface name (e.g., `pension-pot.model.ts` for `PensionPotModel`).

---

## File and Folder Structure 🗂️

- **Domain Layer**: Contains business logic, models, and repository interfaces. All business rules and data modeling reside here.
- **Infrastructure Layer**: Implements the technical details like data access (repositories), external API integration, and controllers.
- **Use Cases**: Represents specific business logic that orchestrates actions within the application.
- **Common Utilities**: Include reusable components, helpers, and configurations.

### Example Structure

```bash
src/
├── domain/          # Business logic and models
│   ├── models/      # Domain models
│   ├── repositories/# Repository interfaces
│   ├── services/    # Domain services
├── infrastructure/ # Technical implementation details
│   ├── common/    #  Shared utilities and helpers
│   ├── controllers/ # API controllers
│   ├── repositories/# Repository implementations
│   ├── config/      # Configuration files
├── usecases/        # Application use cases
└── 
```

---

## Code Formatting ✨

- **Indentation**: Use 2 spaces for indentation.
- **Line Length**: Limit lines to 100 characters. Break lines that exceed this limit for readability.
- **Semicolons**: Always use semicolons to terminate statements.
- **Quotes**: Use single quotes for strings, except when the string contains a single quote that would require escaping.
- **Braces**: Use K&R (Kernighan & Ritchie) style for brace placement:
  ```typescript
  if (condition) {
    // code
  } else {
    // code
  }
  ```
- **Whitespace**:
    - Place a blank line between logical sections of the code.
    - Use a single space before opening braces for blocks.
    - No trailing whitespace at the end of lines.

### Example

```typescript
function calculateForecastedBalance(
  principal: number,
  interestRate: number,
  years: number
): number {
  const rate = interestRate / 100;
  return principal * Math.pow(1 + rate, years);
}
```

---

## TypeScript Specific Guidelines 🧑‍💻

- **Strict Typing**: Always use TypeScript's strict typing features. Avoid using `any` unless absolutely necessary.
- **Interfaces vs. Types**: Use interfaces to define the shape of objects. Use `type` for unions and other type combinations.
- **Optional Properties**: Mark optional properties with a question mark (`?`).
- **Enums**: Use `enums` sparingly; prefer `union` types where applicable.

### Example

```typescript
interface PensionProvider {
  name: string | null;
  value: string | null;
}

type PotStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';
```

---

## Commenting and Documentation 📝

- **Function and Method Comments**: Use JSDoc comments to describe the purpose, parameters, and return values of functions and methods.
- **Class and Interface Comments**: Provide a brief description of the class or interface.
- **Inline Comments**: Use inline comments sparingly to explain complex logic. Avoid stating the obvious.

### JSDoc Example

```typescript
/**
 * Calculates the forecasted balance of a pension pot after a given number of years.
 *
 * @param {number} principal - The initial amount in the pension pot.
 * @param {number} interestRate - The annual interest rate as a percentage.
 * @param {number} years - The number of years to forecast.
 * @returns {number} - The forecasted balance.
 */
function calculateForecastedBalance(
  principal: number,
  interestRate: number,
  years: number
): number {
  const rate = interestRate / 100;
  return principal * Math.pow(1 + rate, years);
}
```

---

## Error Handling ⚠️

- **Error Messages**: Provide clear and descriptive error messages.
- **Try-Catch**: Use `try-catch` blocks to handle exceptions. Always log errors with enough context to diagnose the issue.
- **Custom Errors**: Implement custom error classes for domain-specific errors.
- **Graceful Degradation**: Ensure that the system can continue running (or fail gracefully) in case of an error.

### Example

```typescript
try {
  const result = await this.pensionService.getPensionPotById(id);
  if (!result) {
    throw new NotFoundException('Pension pot not found');
  }
  return result;
} catch (error) {
  this.logger.error('Failed to retrieve pension pot', error.stack);
  throw error;
}
```

---

## Testing Guidelines 🧪

- **Unit Tests**: Write unit tests for all functions and methods, ensuring full coverage of edge cases.
- **Integration Tests**: Test the interaction between different modules to verify they work together correctly.
- **Test Naming**: Use descriptive names for test cases that clearly explain what the test is verifying.
- **Mocks and Stubs**: Use mocks and stubs to isolate the code being tested and avoid dependencies on external systems.
- **Test Structure**: Use `Arrange-Act-Assert` pattern in your tests for clarity and organization.

### Example

```typescript
describe('PensionService', () => {
  let pensionService: PensionService;
  let pensionRepository: jest.Mocked<IPensionPotRepository>;

  beforeEach(() => {
    pensionRepository = mockPensionPotRepository;
    pensionService = new PensionService(pensionRepository);
  });

  it('should return a pension pot by ID', async () => {
    const potId = 'some-id';
    const expectedPot = { id: potId, name: 'Test Pot' };
    pensionRepository.findById.mockResolvedValue(expectedPot);

    const result = await pensionService.getPensionPotById(potId);

    expect(result).toEqual(expectedPot);
    expect(pensionRepository.findById).toHaveBeenCalledWith(potId);
  });
});
```

---

## Version Control 🕹️

- **Branching Strategy**: Use the `GitFlow` branching strategy. The `main` branch is for production-ready code, `develop` is for integration, and feature branches are used for individual features or fixes.
- **Commit Messages**: Write meaningful and descriptive commit messages. Follow the **Conventional Commits** specification for consistency.
- **Pull Requests**: Ensure all code is reviewed through pull requests before merging into `main` or `develop`. Include a clear description of changes in the PR.

### Example Commit Message

```bash
feat(pension-pot): add method to calculate forecasted balance
```

---
Happy coding! 💻🚀
