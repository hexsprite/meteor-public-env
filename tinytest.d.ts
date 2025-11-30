declare module 'meteor/tinytest' {
  interface Test {
    equal<T>(actual: T, expected: T, message?: string): void
    notEqual<T>(actual: T, expected: T, message?: string): void
    isTrue(value: unknown, message?: string): void
    isFalse(value: unknown, message?: string): void
    isUndefined(value: unknown, message?: string): void
  }

  export const Tinytest: {
    add(name: string, fn: (test: Test) => void): void
    addAsync(name: string, fn: (test: Test, onComplete: () => void) => void): void
  }
}
