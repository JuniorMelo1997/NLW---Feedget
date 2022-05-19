import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "06efaa13a99786",
      pass: "057d4f146030b8"
    }
  });



export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
    await transport.sendMail({
        from: "Equipe Feedget <oi@feedget.com>",
        to: "Genival de Melo Junior <genivaldemelojr@gmail.com>",
        subject: subject,
        html: body
    })
    };
}