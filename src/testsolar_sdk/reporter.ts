import * as fs from "fs-extra";
import * as path from "path"
import { MD5 } from "crypto-js";
import { LoadResult } from "./model/load";
import { TestResult } from "./model/testresult";
import { dateTimeReplacer } from "./model/encoder";


class Reporter {
  private loadReportDir: string;
  private runReportDir: string;

  constructor(taskId: string, reportDir: string = "/home/testsolar") {
    if (!taskId.trim()) {
      throw new Error("Reporter.taskId must not be empty!");
    }
    if (!reportDir.trim()) {
      throw new Error("Reporter.reportDir must not be empty!");
    }

    this.loadReportDir = path.join(reportDir, 'task', taskId, 'load');
    this.runReportDir = path.join(reportDir, 'task', taskId, 'run');
  }

  // 上报加载用例结果
  async reportLoadResult(loadResult: LoadResult): Promise<void> {
    const raw: string = JSON.stringify(loadResult, dateTimeReplacer, 2);

    await fs.mkdirs(this.loadReportDir);
    await fs.writeFile(`${this.loadReportDir}/result.json`, raw);
    console.log(
      `Final load result is saved to:\n${this.loadReportDir}/result.json \nFinal load result content:\n${raw}\n`,
    );
  }

  // 上报测试用例执行结果
  async reportTestResult(testResult: TestResult): Promise<void> {
    const raw: string = JSON.stringify(testResult, dateTimeReplacer, 2);

    await fs.mkdirs(this.runReportDir);
    await fs.writeFile(
      `${this.runReportDir}/${this.generateRunCaseReportName(testResult)}`,
      raw,
    );
    console.log(`Final run result content:\n${raw}\n`);
  }

  private generateRunCaseReportName(testResult: TestResult): string {
    const retryId: string = testResult.Test.Attrs["retry"] || "0";
    const testIdentifier = `${testResult.Test.Name}.${retryId}`;
    const hashedFileName = MD5(testIdentifier).toString();
    const fileName = `${hashedFileName}.json`;

    console.log(
      `Final run result is saved to:\n ${this.runReportDir}/${fileName}\n`,
    );

    return fileName;
  }
}

export default Reporter;
