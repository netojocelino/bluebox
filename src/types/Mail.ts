type MailContact = {
  email: string
  name: string
}

type MailDataRequired = {
  subject: string;
  to: MailContact[] | MailContact;
  sender: MailContact;
};

export type MailData = MailDataRequired & {
  body?: string;
  templateId?: string | Number;
  templateData?: TemplateData;
  htmlContent?: string
};
export type MailCallback = (...params: any) => {} | null;

type TemplateData = [T: string | Number];

export interface BlueboxResponse {
  status: Number | string;
  body: object;
  date: string;
  headers?: any;
}

export interface IBlueboxService {
  send(data: MailData, callback: MailCallback): Promise<BlueboxResponse | void>;
}
