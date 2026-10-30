// Esperar a que todo el HTML se termine de cargar antes de ejecutar el JS
document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Capturar los elementos del formulario mediante sus IDs
    const selectOpcion = document.getElementById('opcion');       // Desplegable de productos
    const inputOtro = document.getElementById('otro-producto');   // Campo de texto para "Otro"
    const formPedido = document.getElementById('form-pedido');     // Formulario principal

    // ===================================================
    // CONTROL DEL CAMPO DE TEXTO DINÁMICO ("OTRO")
    // ===================================================
    selectOpcion.addEventListener('change', function () {
        // Si el cliente elige la opción "otro"
        if (selectOpcion.value === 'otro') {
            inputOtro.style.display = 'inline-block'; // Mostrar el input al lado
            inputOtro.focus();                         // Poner el cursor automáticamente dentro del input
        } else {
            inputOtro.style.display = 'none';         // Ocultar si elige cualquier otro producto
            inputOtro.value = '';                     // Limpiar el texto si había escrito algo
        }
    });

    // ===================================================
    // ARMADO Y ENVÍO DEL MENSAJE POR WHATSAPP
    // ===================================================
    formPedido.addEventListener('submit', function (event) {
        // Prevenir el comportamiento por defecto (evita que la página se recargue al enviar)
        event.preventDefault();

        // Número de destino en formato internacional (Argentina: 54 + 9 + característica + número sin ceros ni 15)
        const miWhatsApp = "5492995176441"; 

        // Obtener los datos ingresados en los campos del formulario
        const telefonoCliente = document.getElementById('telefono').value;
        const detalles = document.getElementById('detalles').value;

        // Validar qué producto se seleccionó
        let producto = selectOpcion.value;
        if (producto === 'otro') {
            // .trim() remueve espacios en blanco al inicio o final
            producto = inputOtro.value.trim(); 
            
            // Si eligió "otro" pero dejó la caja vacía, mostrar alerta
            if (!producto) {
                alert("Por favor, especifica qué producto deseas en la casilla de texto.");
                return; // Cortar la ejecución
            }
        }

        // Obtener la fecha y hora actual en formato de Argentina (es-AR)
        const ahora = new Date();
        const fecha = ahora.toLocaleDateString('es-AR');
        const hora = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

        // Generar un número de pedido aleatorio sencillo (ejemplo: SUB-7392)
        const numPedido = "SUB-" + Math.floor(1000 + Math.random() * 9000);

        // ===================================================
        // PLANTILLA DEL MENSAJE FORMATO TICKET
        // ===================================================
        // Nota: Los saltos de línea se respetan gracias a las comillas invertidas `` (Template Literals)
        const mensaje = 
`👋 *NUEVO PEDIDO DE SUBLIMANDO*
🆔 Pedido: #${numPedido}
🗓️ ${fecha} ⏰ ${hora}

*👤 Datos del Cliente*
📞 *Teléfono:* ${telefonoCliente}

*📦 Productos*
• *1x ${producto.toUpperCase()}*

*📝 Detalles / Especificaciones:*
${detalles ? detalles : 'Sin especificaciones adicionales'}

---
👆 *Envíanos este mensaje ahora para procesar tu pedido.*`;

        // encodeURIComponent se asegura de convertir caracteres especiales (enter, espacios, signos) en formato URL seguro
        const url = `https://wa.me/${miWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        // Abrir la URL en una nueva pestaña
        window.open(url, '_blank');
    });
});
