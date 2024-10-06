import { scriptProperties } from "@/ScriptProperties";
import { TASK_SPREAD_SHEET_COLUMNS, TASK_STATUS } from "@/app/AppConfig";
import { formatTaskRows } from "./formatTaskRows";
import { getFilteredDataWithQuery } from "@/SpreadSheet";

/**
 * タスクを取得する
 * @param {string} task_id - タスクID
 * @returns {Array} タスク
 */
export function getTask(task_id: string): any[] {
  return formatTaskRows(
    getFilteredDataWithQuery({
      spreadsheetId: scriptProperties.TASK_SPREADSHEET_ID,
      sheetName: scriptProperties.TASK_SHEET_NAME,
      filters: [
        {
          column: TASK_SPREAD_SHEET_COLUMNS.ID.column,
          operator: "=",
          value: task_id,
          connector: "AND",
        },
      ],
      skipRows: 1,
      selectColumns: ["*"],
    }),
  );
}
