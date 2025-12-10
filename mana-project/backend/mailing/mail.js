import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.EMAIL_API_KEY);

(async function() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <restobarmana01@gmail.com>',
      to: ['santiagovargas9@outlook.com'],
      subject: 'hola mana',
      html: '<strong>le envio un correo con mi api!</strong>'
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();