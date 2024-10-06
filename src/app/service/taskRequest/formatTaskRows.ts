import { TASK_SPREAD_SHEET_COLUMNS, TASK_STATUS } from "@/app/AppConfig";
import { logError } from "@/Logger";

/**
 * タスクの行をフォーマットする
 * @param {Array} rows - タスクの行
 * @returns {Array} フォーマットされたタスクの行
 */
export function formatTaskRows(rows: any[]): any[] {
  try {
    return rows.map((row) => {
      return {
        id: row[TASK_SPREAD_SHEET_COLUMNS.ID.index],
        summary: row[TASK_SPREAD_SHEET_COLUMNS.SUMMARY.index],
        detail: row[TASK_SPREAD_SHEET_COLUMNS.DETAIL.index],
        assignees: row[TASK_SPREAD_SHEET_COLUMNS.ASSIGNEES.index].split(",").map((item: string) => item.trim()),
        status: row[TASK_SPREAD_SHEET_COLUMNS.STATUS.index],
        status_emoji: TASK_STATUS[row[TASK_SPREAD_SHEET_COLUMNS.STATUS.index].toUpperCase()].emoji,
        due_date: Utilities.formatDate(row[TASK_SPREAD_SHEET_COLUMNS.DUE_DATE.index], "JST", "yy-MM-dd HH:mm"),
        priority: row[TASK_SPREAD_SHEET_COLUMNS.PRIORITY.index],
        requester: row[TASK_SPREAD_SHEET_COLUMNS.REQUESTER.index],
        time_left: row[TASK_SPREAD_SHEET_COLUMNS.TIME_LEFT.index],
        post_channel: row[TASK_SPREAD_SHEET_COLUMNS.POST_CHANNEL.index],
        slack_url: row[TASK_SPREAD_SHEET_COLUMNS.SLACK_MESSAGE_URL.index],
      };
    });
  } catch (error) {
    logError({ error: error, message: "formatTaskRowsで例外が発生しました", rows: rows });
    return [];
  }
}
