// src/composables/useFormValidations.js

export default function useFormValidations() {
  const validateName = (val) => val && val.length > 0 || 'Ingresa tu nombre';

  const validateApellido = (val) => val && val.length > 0 || 'Ingresa tu apellido';

  const validateProfesion = (val) => val !== null && val !== undefined || 'Selecciona una profesión';

  const validateCorreo = (val) => [
    val && val.length > 0 || 'Por favor, ingresa tu correo electrónico',
    /\S+@\S+\.\S+/.test(val) || 'Por favor, ingresa un correo electrónico válido'
  ];

  const validateTelefono = (val) => [
    val !== null && val !== '' || 'Por favor, ingrese su número de teléfono',
    /^\d{10}$/.test(val) || 'El número de teléfono debe tener 10 dígitos'
  ];

  return {
    validateName,
    validateApellido,
    validateProfesion,
    validateCorreo,
    validateTelefono,
  };
}
