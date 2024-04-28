import { TestCase } from "./test";

export class LoadError {
  Name: string;
  Message: string;

  constructor(name: string, message: string) {
    this.Name = name;
    this.Message = message;
  }
}

export class LoadResult {
  Tests: TestCase[];
  LoadErrors: LoadError[];

  constructor(tests: TestCase[], loadErrors: LoadError[]) {
    this.Tests = tests;
    this.LoadErrors = loadErrors;
  }
}
