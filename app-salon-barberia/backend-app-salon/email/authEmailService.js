import { createTransporter } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }){
    const transporter = createTransporter(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    )

    const info = await transporter.sendMail({
        from: 'AppSalon Belleza a tu estilo <cuentas@appsalon.com>',
        to: email, 
        subject: 'AppSalon Balleza a tu estilo - Confirma tu cuenta',
        text: 'AppSalon- Confirma tu cuenta',
        html: `
            <p>Hola estimado: <strong>${name}</strong>, agradecemos que confirmes tu cuenta en AppSalon </p>
            <p>Tu cuenta esta casi lista, solo debes confirmar la en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
            <br>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `
    })

    // console.log('email enviado', info.messageId)
}
