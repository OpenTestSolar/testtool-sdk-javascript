import { TestCase } from "./test";

export class LoadError {
  private _name: string;
  private _message: string;

  constructor(name: string, message: string) {
    this._name = name;
    this._message = message;
  }

  toJSON(): object {
    return {
      name: this._name,
      message: this._message,
    };
  }

  static fromJSON(json: any): LoadError {
    return new LoadError(json.name, json.message);
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}

export class LoadResult {
  private _tests: TestCase[];
  private _loadErrors: LoadError[];

  constructor(tests: TestCase[], loadErrors: LoadError[]) {
    this._tests = tests;
    this._loadErrors = loadErrors;
  }

  toJSON(): object {
    return {
      Tests: this._tests.map((test) => test.toJSON()),
      LoadErrors: this._loadErrors.map((error) => error.toJSON()),
    };
  }

  static fromJSON(json: any): LoadResult {
    const tests = json.Tests.map((testJson: any) =>
      TestCase.fromJSON(testJson),
    );
    const loadErrors = json.LoadErrors.map((errorJson: any) =>
      LoadError.fromJSON(errorJson),
    );
    return new LoadResult(tests, loadErrors);
  }

  get tests(): TestCase[] {
    return this._tests;
  }

  set tests(value: TestCase[]) {
    this._tests = value;
  }

  get loadErrors(): LoadError[] {
    return this._loadErrors;
  }

  set loadErrors(value: LoadError[]) {
    this._loadErrors = value;
  }
}
