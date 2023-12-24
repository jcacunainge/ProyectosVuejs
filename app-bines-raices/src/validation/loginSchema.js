// Objeto loginSchema que contiene funciones para validar campos de email y contraseña
export const loginSchema = {
  // Función de validación para el campo de correo electrónico
  email(value) {
      // Verifica si el campo de correo electrónico está vacío
      if (!value) {
          return 'Este campo es obligatorio'; // Devuelve mensaje si el campo está vacío
      }
      
      // Expresión regular para validar el formato de un email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      // Verifica si el valor no coincide con el formato de correo electrónico válido
      if (!regex.test(value)) {
          return 'Email no válido'; // Devuelve mensaje si el formato no es válido
      }

      return true; // Devuelve true si el email es válido
  },

  // Función de validación para el campo de contraseña
  password(value) {
      // Verifica si se ha proporcionado un valor para la contraseña
      if (value) {
          return true; // Devuelve true si se proporciona un valor para la contraseña
      }

      return 'El Password es Obligatorio'; // Devuelve mensaje si no se proporciona valor para la contraseña
  }
}
