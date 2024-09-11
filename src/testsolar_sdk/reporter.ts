import * as fs from "fs-extra";
import * as path from "path"
import { MD5 } from "crypto-js";
import { LoadResult } from "./model/load";
import { TestResult } from "./model/testresult";
import { typedSerialize } from "./model/encoder";
import log from './logger';


class Reporter {
  private readonly reportPath: string;

  constructor(taskId: string, reportPath: string) {
    if (!taskId.trim()) {
      throw new Error("Reporter.taskId must not be empty!");
    }

    this.reportPath = reportPath;
    if (reportPath.endsWith(".json")){
      const reportDir = path.dirname(reportPath);
      if (!fs.existsSync(reportDir)) {
        fs.mkdirsSync(reportDir);
      }
    } else {
      if (!fs.existsSync(reportPath)) {
        fs.mkdirsSync(reportPath);
        }
    }
    // 检查并创建reportFile路径

  }

  // 上报加载用例结果
  async reportLoadResult(loadResult: LoadResult): Promise<void> {
    const raw: string = typedSerialize(loadResult);

    await fs.writeFile(this.reportPath, raw);
    log.info(
      `Final load result is saved to:\n${this.reportPath} \nFinal load result content:\n${raw}\n`,
    );
  }


  // 上报测试用例执行结果
  async reportTestResult(testResult: TestResult): Promise<void> {
    const raw: string = typedSerialize(testResult);

    const runCaseReportName = this.generateRunCaseReportName(testResult);
    const runReportFile = path.join(this.reportPath, runCaseReportName);

    await fs.writeFile(runReportFile, raw);
    log.info(`Final run result content:\n${raw}\n`);
  }

  private generateRunCaseReportName(testResult: TestResult): string {
    const retryId: string = testResult.Test.Attributes["retry"] || "0";
    const testIdentifier = `${testResult.Test.Name}.${retryId}`;
    const hashedFileName = MD5(testIdentifier).toString();
    const fileName = `${hashedFileName}.json`;

    log.info(
      `Final run result is saved to:\n ${this.reportPath}/${fileName}\n`,
    );

    return fileName;
  }
}

export default Reporter;
