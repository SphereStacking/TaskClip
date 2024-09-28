class ScriptProperties {
  private static instance: ScriptProperties;
  private props = PropertiesService.getScriptProperties();

  private _SLACK_BOT_USER_OAUTH_TOKEN: string | null = null;
  private _LOGGER_SPREADSHEET_APP_ID: string | null = null;
  private _TASK_SPREADSHEET_ID: string | null = null;
  private _TASK_SHEET_NAME: string | null = null;
  private _DEBUG_USER_ID: string | null = null;
  private _DEBUG_CHANNEL_ID: string | null = null;

  private constructor() {}

  public static getInstance(): ScriptProperties {
    if (!ScriptProperties.instance) {
      ScriptProperties.instance = new ScriptProperties();
    }
    return ScriptProperties.instance;
  }

  get SLACK_BOT_USER_OAUTH_TOKEN(): string {
    if (this._SLACK_BOT_USER_OAUTH_TOKEN === null) {
      this._SLACK_BOT_USER_OAUTH_TOKEN =
        this.props.getProperty("SlackBotUserOAuthToken") || "";
    }
    return this._SLACK_BOT_USER_OAUTH_TOKEN;
  }

  get LOGGER_SPREADSHEET_APP_ID(): string {
    if (this._LOGGER_SPREADSHEET_APP_ID === null) {
      this._LOGGER_SPREADSHEET_APP_ID =
        this.props.getProperty("LoggerSpreadsheetAppID") || "";
    }
    return this._LOGGER_SPREADSHEET_APP_ID;
  }

  get TASK_SPREADSHEET_ID(): string {
    if (this._TASK_SPREADSHEET_ID === null) {
      this._TASK_SPREADSHEET_ID =
        this.props.getProperty("TaskSpreadSheetId") || "";
    }
    return this._TASK_SPREADSHEET_ID;
  }

  get TASK_SHEET_NAME(): string {
    if (this._TASK_SHEET_NAME === null) {
      this._TASK_SHEET_NAME = this.props.getProperty("TaskSheetName") || "";
    }
    return this._TASK_SHEET_NAME;
  }

  get DEBUG_USER_ID(): string {
    if (this._DEBUG_USER_ID === null) {
      this._DEBUG_USER_ID = this.props.getProperty("DEBUG_USER_ID") || "";
    }
    return this._DEBUG_USER_ID;
  }

  get DEBUG_CHANNEL_ID(): string {
    if (this._DEBUG_CHANNEL_ID === null) {
      this._DEBUG_CHANNEL_ID = this.props.getProperty("DEBUG_CHANNEL_ID") || "";
    }
    return this._DEBUG_CHANNEL_ID;
  }
}

export const scriptProperties = ScriptProperties.getInstance();
