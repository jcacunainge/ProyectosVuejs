// Creación de una propiedad computada para formatear el precio
export const formatCurrency = (price) => 
    Number(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'        
    }
)