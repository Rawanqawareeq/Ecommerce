import 'dotenv/config'
import nodemailer from "nodemailer"

export async function sendemail(to,subject,html){
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAILPASSWORD,
        }
    });
    const info = await transporter.sendMail({
        from: `RShope  <${process.env.EMAIL}>`,
        to, 
        subject, 
        html,
      });
      return info;
    
}
