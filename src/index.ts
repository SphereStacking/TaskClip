import { actionsRouter } from "./app/actionsRouter";
import { verificationToken } from "./app/auth/verificationToken";
import { logInfo, logError } from "./Logger";

const CONTENT_TYPE_JSON = "application/json";
const CONTENT_TYPE_FORM = "application/x-www-form-urlencoded";
const INVALID_REQUEST_MESSAGE = "invalid request";

function doPost(e: GoogleAppsScript.Events.DoPost) {
  if (!e.postData) return ContentService.createTextOutput(INVALID_REQUEST_MESSAGE);

  const { type } = e.postData;
  const { payload, command } = e.parameters;
  logInfo({ event: e, payload, command });
  if (type === CONTENT_TYPE_JSON) {
    const payload = JSON.parse(e.postData.contents);
    return handlePayload(payload.event.type, payload);
  }

  if (type === CONTENT_TYPE_FORM) {
    /* block_actionsの際の処理 */
    if (payload) {
      try {
        const parsedPayload = JSON.parse(e.parameters.payload[0]);
        const { actions, view, type } = parsedPayload;
        const route = (actions && actions.length > 0 ? actions[0].action_id : undefined) || view?.callback_id;
        logInfo({ CONTENT_TYPE_FORM: "payload", route, payload: parsedPayload });

        return handlePayload(`${type}/${route}`, parsedPayload);
      } catch (error) {
        logError(`block_actionsの際の処理でエラーが発生しました : ${error}`);
      }
    }

    /* slash commandの際の処理 */
    if (command) {
      try {
        const payload = Object.fromEntries(Object.entries(e.parameters).map(([key, value]) => [key, value[0]]));
        // logInfo({ CONTENT_TYPE_FORM: "command", payload: payload });
        return handlePayload(payload.type, payload);
      } catch (error) {
        logError(`slash commandの際の処理でエラーが発生しました : ${error}`);
      }
    }
  }

  return ContentService.createTextOutput("");
}

function handlePayload(type: string, payload: any) {
  // verificationToken(payload.token);
  if (typeof payload.challenge !== "undefined") {
    return ContentService.createTextOutput(payload.challenge);
  }
  return actionsRouter(type, payload);
}
