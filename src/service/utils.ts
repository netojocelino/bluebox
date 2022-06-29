import { ApiConnection } from "../api";
import { BlueboxError, TemplateError } from "../errors";
import { MailData } from "../types/Mail";



/// VALIDATE

export const checkKey = (apiKey?: string) => {
  if (apiKey === '' || apiKey === undefined) {
    throw new BlueboxError('MISSING_API_KEY');
  }
}

export const checkConnection = (connection: ApiConnection | null) => {
  if (connection === null) {
    throw new BlueboxError('MISSING_CONNECTION');
  }
}

type ContentEmailType = {
  templateId?: string | Number,
  templateData?: object,
  htmlContent?: string
};
export const checkContent = (data: ContentEmailType) => {
  const hasTemplate = data.templateId !== undefined;
  const hasHTMLContent =  data.htmlContent !== undefined

  if (hasTemplate && data.templateData !== undefined ) {
    throw new TemplateError('TEMPLATE_UNDEFINED_DATA');
  } else if(!hasHTMLContent) {
    throw new TemplateError("TEMPLATE_HTML_CONTENT_REQUIRED");
  }
  if (!hasTemplate && !hasHTMLContent) {
    throw new TemplateError("TEMPLATE_REQUIRE_CONTENT_OR_TEMPLATE");
  }

}



// SANITIZE

export const buildEmailData = (data: MailData) => {
  return {
    sender: data.sender,
    from: data.sender,
    to: data.to,
    templateId: data.templateId,
    params: data.templateData,
    subject: data.subject,
    htmlContent: data.htmlContent,
  }
}




// Error Utils

export const throw_if = (conditional: boolean, message: string, errorType: any) => {
  if(conditional) {
    throw errorType.bind(message);
  }
}
