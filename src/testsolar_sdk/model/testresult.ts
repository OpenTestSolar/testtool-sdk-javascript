import { TestCase } from "./test";

export enum ResultType {
  UNKNOWN = "UNKNOWN",
  SUCCEED = "SUCCEED",
  FAILED = "FAILED",
  LOAD_FAILED = "LOAD_FAILED",
  IGNORED = "IGNORED",
  RUNNING = "RUNNING",
  WAITING = "WAITING",
}

export enum LogLevel {
  TRACE = "VERBOSE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARNNING",
  ERROR = "ERROR",
}

export enum AttachmentType {
  FILE = "FILE",
  URL = "URL",
  IFRAME = "IFRAME",
}

export class TestCaseAssertError {
  Expect: string;
  Actual: string;
  Message: string;

  constructor(expect: string, actual: string, message: string) {
    this.Expect = expect;
    this.Actual = actual;
    this.Message = message;
  }
}

export class TestCaseRuntimeError {
  Summary: string;
  Detail: string;

  constructor(summary: string, detail: string) {
    this.Summary = summary;
    this.Detail = detail;
  }
}

export class Attachment {
  Name: string;
  Url: string;
  AttachmentType: AttachmentType;

  constructor(name: string, url: string, type: AttachmentType) {
    this.Name = name;
    this.Url = url;
    this.AttachmentType = type;
  }
}

export class TestCaseLog {
  Time: string;
  Level: LogLevel;
  Content: string;
  Attachments: Attachment[];
  AssertError?: TestCaseAssertError;
  RuntimeError?: TestCaseRuntimeError;

  constructor(
    time: string,
    level: LogLevel,
    content: string,
    attachments: Attachment[] = [], // 默认为空数组
    assertError?: TestCaseAssertError, // 可选参数
    runtimeError?: TestCaseRuntimeError, // 可选参数
  ) {
    this.Time = time;
    this.Level = level;
    this.Content = content;
    this.Attachments = attachments;
    this.AssertError = assertError;
    this.RuntimeError = runtimeError;
  }
}

export class TestCaseStep {
  StartTime: string;
  EndTime?: string;
  Title: string;
  ResultType: ResultType;
  Logs: TestCaseLog[];

  constructor(
    startTime: string,
    endTime: string | undefined,
    title: string,
    resultType: ResultType,
    logs: TestCaseLog[],
  ) {
    this.StartTime = startTime;
    this.EndTime = endTime;
    this.Title = title;
    this.ResultType = resultType;
    this.Logs = logs;
  }
}

export class TestResult {
  Test: TestCase;
  StartTime: string;
  EndTime?: string;
  ResultType: ResultType;
  Message: string;
  Steps: TestCaseStep[];

  constructor(
    test: TestCase,
    startTime: string,
    endTime: string | undefined,
    resultType: ResultType,
    message: string,
    steps: TestCaseStep[],
  ) {
    this.Test = test;
    this.StartTime = startTime;
    this.EndTime = endTime;
    this.ResultType = resultType;
    this.Message = message;
    this.Steps = steps;
  }
}
