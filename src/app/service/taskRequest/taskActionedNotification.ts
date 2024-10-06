import { logError } from "@/Logger";
import { extractChannelIdAndTimestamp, postMessageToThread, postDirectMessage } from "@/Slack";
import { makeActionedToThreadBlocks, makeActionedToUserBlocks } from "@/app/SlackBlocks";
import { getTask } from "./getTask";
/**
 * タスクアクションを通知する
 * @param {string} task_id - タスクID
 * @param {string} user_id - ユーザーID
 */
export function taskActionedNotification(task_id: string, user_id: string): void {
  const task = getTask(task_id);
  if (task.length === 0) {
    logError({ error: "タスクが見つかりません", task_id });
    return;
  }
  const { channelId, threadTimestamp } = extractChannelIdAndTimestamp(task[0].slack_url);
  if (!channelId || !threadTimestamp) {
    logError({ error: "スレッドのタイムスタンプが取得できません", task_id });
    return;
  }
  try {
    postMessageToThread(channelId, threadTimestamp, makeActionedToThreadBlocks(user_id));
  } catch (error) {
    logError({ error: "スレッドにメッセージを送信できません", task_id });
  }
  try {
    postDirectMessage(user_id, makeActionedToUserBlocks(task[0].summary, task[0].slack_url));
  } catch (error) {
    logError({ error: "ユーザーにメッセージを送信できません", task_id });
  }
}
