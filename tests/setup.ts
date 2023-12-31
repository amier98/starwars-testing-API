import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// extends Vitest's expect method with methods from react-testing-library

// runs a cleanup after each test case
afterEach(() => {
  cleanup();
});
