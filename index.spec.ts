import Bluebox from "./index";
import { MailData } from "~/types/Mail";
import { must, asserts } from './src/tests/utils'
import 'dotenv/config'

const apiKey =  process.env!.SENDINBLUE_API as string;
const senderEmail = process.env!.SENDER_EMAIL as string;
const senderName = process.env!.SENDER_NAME as string;
const toEmail = process.env!.TO_EMAIL as string;
const toName = process.env!.TO_NAME as string;

const timestamp = () => {
  const now = (new Date()).toLocaleString('pt-BR').split(' ')
  return `${now[1]} de ${now[0]}`
}

const emailBody: MailData = {
  to: [{
    name: toName,
    email: toEmail,
  }],
  sender: {
    name: senderName,
    email: senderEmail
  },
  subject: 'Sending a email with bluebox (a Sendinblue wrapper)',
  // body: 'Do you are seeing this?',
  // templateId: 3,
  htmlContent: `<div>Enviado em ${timestamp()}</div>`
}


must("Bluebox → Must have api_key", function () {
  asserts(apiKey).notNull()
});

must("Bluebox → Must instance with api_key", function () {
  const bluebox = new Bluebox(apiKey)
});

must("Bluebox → Must send a email", async function () {
  const bluebox = new Bluebox(apiKey)
  const response:any = await bluebox.send(emailBody);

  asserts(response).notNull();

  asserts(response!.status).equals(201)
}, {
  type: 'Boxblue',
  message: 'Boxblue'
});
