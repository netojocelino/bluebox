export interface IAppError {
  type: string;
  code: string;
}

export interface IBlueboxError extends IAppError {
  type: "Bluebox";
  code: "MISSING_API_KEY" | "UNAUTHORIZED" | "MISSING_CONNECTION" | "GENERIC_ERROR" ;
}

export interface ITemplateError extends IAppError {
  type: "TemplateData";
  code: "TEMPLATE_UNDEFINED_DATA" | "TEMPLATE_HTML_CONTENT_REQUIRED" | "TEMPLATE_REQUIRE_CONTENT_OR_TEMPLATE";
}



export abstract class AppError<T extends IAppError> extends Error {
  readonly type: T["type"];
  readonly code: T["code"];

  constructor(error: T) {
    super(`${error.type}-${error.code}`);
    this.type = error.type;
    this.code = error.code;
  }

  toJson(): IAppError {
    return {
      type: this.type,
      code: this.code,
    };
  }
}

export class BlueboxError extends AppError<IBlueboxError> {
  constructor(code: IBlueboxError["code"]) {
    super({ type: "Bluebox", code });
  }
}

export class TemplateError extends AppError<ITemplateError> {
  constructor(code: ITemplateError["code"]) {
    super({ type: "TemplateData", code });
  }
}



