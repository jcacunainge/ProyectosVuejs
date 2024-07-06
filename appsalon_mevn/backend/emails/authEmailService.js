import { createTransport } from '../config/nodemailer.js';

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    );

    console.log(process.env.EMAIL_HOST)
    console.log(process.env.EMAIL_PORT)
    console.log(process.env.EMAIL_USER)
    console.log(process.env.EMAIL_PASSWORD)

    try {
        // Enviar el email
        const info = await transporter.sendMail({
            from: 'AppSalon <cuentas@appsalon.com>',
            to: 'correo@correo.com',
            subject: "AppSalon - Confirma tu cuenta",
            text: "AppSalon - Confirma tu cuenta",
            html: `<p>Hola: ${name}, confirma tu cuenta en AppSalon</p>
                <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
                <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
            `
        });

        console.log('Mensaje de verificación enviado:', info.messageId);
    } catch (error) {
        console.error('Error al enviar el mensaje de verificación:', error);
    }
}

export async function sendEmailPasswordReset({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    );

    try {
        // Enviar el email
        const info = await transporter.sendMail({
            from: 'AppSalon <cuentas@appsalon.com>',
            to: email,
            subject: "AppSalon - Restablece tu contraseña",
            text: "AppSalon - Restablece tu contraseña",
            html: `<p>Hola: ${name}, has solicitado restablecer tu contraseña</p>
                <p>Sigue el siguiente enlace para generar una nueva contraseña:</p>
                <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Restablecer contraseña</a>
                <p>Si tú no solicitaste esto, puedes ignorar este mensaje</p>
            `
        });

        console.log('Mensaje de restablecimiento de contraseña enviado:', info.messageId);
    } catch (error) {
        console.error('Error al enviar el mensaje de restablecimiento de contraseña:', error);
    }
}
