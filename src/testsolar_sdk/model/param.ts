// param.ts
export class EntryParam {
  Context: Record<string, string>;
  TaskId: string;
  ProjectPath: string;
  TestSelectors: string[];
  Collectors: string[];

  constructor(
    context: Record<string, string>,
    taskId: string,
    projectPath: string,
    testSelectors: string[],
    collectors: string[],
  ) {
    this.Context = context;
    this.TaskId = taskId;
    this.ProjectPath = projectPath;
    this.TestSelectors = testSelectors;
    this.Collectors = collectors;
  }
}
