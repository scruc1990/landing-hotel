// Identificación: dígitos numéricos, máximo 10 dígitos.
function validarIdentificacion(input) {
    let identificacion = input.value;
    if (!/^\d{1,10}$/.test(identificacion)) {
        alert("La identificación debe contener máximo 10 dígitos numéricos.");
        input.value = "";
    }
}

// Nombre: sólo letras
function validarNombre(input) {
    let nombre = input.value;
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        alert("El nombre solo puede contener letras.");
        input.value = "";
    }
}

// Fecha de Nacimiento (Control tipo Date): Menor a la fecha actual
function validarFechaNacimiento(input) {
    let fechaNacimiento = new Date(input.value);
    let fechaActual = new Date();
    if (fechaNacimiento >= fechaActual) {
        alert("La fecha de nacimiento debe ser menor a la fecha actual.");
        input.value = "";
    }
}

// Edad: Se calcula a partir de la fecha de nacimiento
function calcularEdad() {
    let fechaNacimiento = new Date(document.getElementById("fechaNacimiento").value);
    let hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    document.getElementById("edad").value = edad;
}

// Correo electrónico: validar formato
function validarCorreo(input) {
    let correo = input.value;
    let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        alert("Ingrese un correo electrónico válido.");
        input.value = "";
    }
}

//Número celular:  dígitos numéricos, máximo 10 dígitos.
function validarCelular(input) {
    let celular = input.value;
    let regexCelular = /^\d{1,10}$/;
    if (!regexCelular.test(celular)) {
        alert("El número de celular debe contener máximo 10 dígitos numéricos.");
        input.value = "";
    }
}

// Tipo de habitación (Control tipo Select)
function validarTipoHabitacion(select) {
    let tipoHabitacion = select.value;
    if (tipoHabitacion === "") {
        alert("Por favor seleccione un tipo de habitación.");
        select.focus();
    }
}

// Valor habitación: se muestra dependiendo del tipo de habitación que se seleccione
function actualizarValorHabitacion() {
    let imagen = document.getElementById("imagen");
    let tipoHabitacion = document.getElementById("tipoHabitacion").value;
    let valorHabitacionInput = document.getElementById("valorHabitacion");

    let valorHabitacion;
    switch (tipoHabitacion) {
        case "habitacion1":
            imagen.src = "assets/img/habitacion1.jpeg";
            valorHabitacion = 450000;
            break;
        case "habitacion2":
            imagen.src = "assets/img/habitacion2.jpeg";
            valorHabitacion = 250000;
            break;
        case "habitacion3":
            imagen.src = "assets/img/habitacion3.jpeg";
            valorHabitacion = 300000;
            break;
        default:
            imagen.src="assets/img/noimage.jpeg";
            alert("Por favor, seleccione una habitación.");
            valorHabitacion = 0;
    }

    valorHabitacionInput.value = valorHabitacion;
}

// Fecha ingreso (Control tipo Date): mayor a la fecha actual y menor a la fecha de salida.
function validarFechaIngreso() {
    let fechaIngresoInput = document.getElementById("fechaIngreso");
    let fechaIngreso = new Date(fechaIngresoInput.value);

    let fechaActual = new Date();

    let fechaSalida = new Date(document.getElementById("fechaSalida").value);

    if (fechaIngreso <= fechaActual) {
        alert("La fecha de ingreso debe ser mayor a la fecha actual.");
        fechaIngresoInput.value = "";
        return;
    }

    if (fechaIngreso >= fechaSalida) {
        alert("La fecha de ingreso debe ser menor a la fecha de salida.");
        fechaIngresoInput.value = "";
        return;
    }
    calcularCantidadNoches();
}
// Fecha salida (Control tipo Date): mayor a la fecha actual y a la fecha de ingreso
function validarFechaSalida() {
    let fechaSalidaInput = document.getElementById("fechaSalida");
    let fechaSalida = new Date(fechaSalidaInput.value);

    let fechaActual = new Date();

    let fechaIngreso = new Date(document.getElementById("fechaIngreso").value);

    if (fechaSalida <= fechaActual) {
        alert("La fecha de salida debe ser mayor a la fecha actual.");
        fechaSalidaInput.value = "";
        return;
    }

    if (fechaSalida <= fechaIngreso) {
        alert("La fecha de salida debe ser mayor a la fecha de ingreso.");
        fechaSalidaInput.value = "";
        return;
    }
    calcularCantidadNoches();
}

// Cantidad de noches: se calcula a partir de la fecha de ingreso y salida
function calcularCantidadNoches() {
    let fechaIngreso = new Date(document.getElementById("fechaIngreso").value);
    let fechaSalida = new Date(document.getElementById("fechaSalida").value);

    let diferencia = fechaSalida.getTime() - fechaIngreso.getTime();

    let cantidadNoches = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

    document.getElementById("cantidadNoches").value = cantidadNoches;
    calcularSubtotal();
}
// Valor: depende del servicio adicional 1
function actualizarValorServicioAdicional1() {
    let servicioSeleccionado = document.getElementById("servicioAdicional1").value;
    let valorServicioInput = document.getElementById("valorServicio1");

    let valorServicio;
    switch (servicioSeleccionado) {
        case "servicio1":
            valorServicio = 90000;
            break;
        case "servicio2":
            valorServicio = 110000;
            break;
        default:
            valorServicio = 0;
    }

    valorServicioInput.value = valorServicio;
    calcularSubtotal();
}

function actualizarValorServicioAdicional2() {
    let servicioSeleccionado = document.getElementById("servicioAdicional2").value;
    let valorServicioInput = document.getElementById("valorServicio2");

    let valorServicio;
    switch (servicioSeleccionado) {
        case "servicio1":
            valorServicio = 90000;
            break;
        case "servicio2":
            valorServicio = 110000;
            break;
        default:
            valorServicio = 0;
    }

    valorServicioInput.value = valorServicio;
    calcularSubtotal();
}

// Subtotal ((Valor habitación * cantidad de días) + valor servicio adicional 1 + valor servicio adicional 2)
function calcularSubtotal() {
    
    let valorHabitacion = parseFloat(document.getElementById("valorHabitacion").value);
        valorHabitacion = isNaN(valorHabitacion) ? 0 : valorHabitacion;
    let cantidadNoches = parseInt(document.getElementById("cantidadNoches").value);
        cantidadNoches = isNaN(cantidadNoches) ? 0 : cantidadNoches;
    let valorServicio1 = parseFloat(document.getElementById("valorServicio1").value);
        valorServicio1 = isNaN(valorServicio1) ? 0 : valorServicio1;
    let valorServicio2 = parseFloat(document.getElementById("valorServicio2").value);
        valorServicio2 = isNaN(valorServicio2) ? 0 : valorServicio2;

    let subtotal = (valorHabitacion * cantidadNoches) + valorServicio1 + valorServicio2;

    document.getElementById("subtotal").value = subtotal;
    calcularIVA();
}

function calcularIVA() {
    let subtotal = parseFloat(document.getElementById("subtotal").value);

    let iva = subtotal * 0.19; 

    document.getElementById("iva").value = iva.toFixed(2);
}


// Botón [Calcular total] Total (subtotal + IVA)
function calcularTotal() {
    calcularSubtotal();
    calcularIVA();

    let subtotal = parseFloat(document.getElementById("subtotal").value);
    let iva = parseFloat(document.getElementById("iva").value);
    if (validateform()) return;
    
    let total = subtotal + iva;

    document.getElementById("total").value = total.toFixed(2);
}

function validateform () {
    let identificacion = document.getElementById("identificacion").value;
    let nombre = document.getElementById("nombre").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let correo = document.getElementById("correo").value;
    let numeroCelular = document.getElementById("numeroCelular").value;
    let tipoHabitacion = document.getElementById("tipoHabitacion").value;
    let valorHabitacion = document.getElementById("valorHabitacion").value;
    let fechaIngreso = document.getElementById("fechaIngreso").value;
    let fechaSalida = document.getElementById("fechaSalida").value;
    let cantidadNoches = document.getElementById("cantidadNoches").value;
    let valorServicio1 = document.getElementById("valorServicio1").value;
    let valorServicio2 = document.getElementById("valorServicio2").value;
    let subtotal = document.getElementById("subtotal").value;
    let iva = document.getElementById("iva").value;
    let total = document.getElementById("total").value;

    if (identificacion === "" || nombre === "" || fechaNacimiento === "" 
    || correo === "" || numeroCelular === "" || tipoHabitacion === "" 
    || valorHabitacion === "" || fechaIngreso === "" || fechaSalida === "" 
    || cantidadNoches === ""
    || subtotal === "" || iva === "" || total === ""
    || subtotal === 0 || iva === 0 || total === 0
    || cantidadNoches === 0 || valorHabitacion === 0
    || isNaN(valorHabitacion) || isNaN(cantidadNoches)  
    || isNaN(subtotal) || isNaN(iva) || isNaN(total) ){
        alert("Por favor, complete todos los campos.");
        return true;
    } else {
        return false;
    }

}

document.getElementById("identificacion").addEventListener("blur", function() {
    validarIdentificacion(this);
});
document.getElementById("nombre").addEventListener("blur", function() {
    validarNombre(this);
});
document.getElementById("fechaNacimiento").addEventListener("change", function() {
    validarFechaNacimiento(this);
    calcularEdad();
});
document.getElementById("correo").addEventListener("blur", function() {
    validarCorreo(this);
});
document.getElementById("numeroCelular").addEventListener("blur", function() {
    validarCelular(this);
});
/* document.getElementById("calcularTotal").addEventListener("click", function() {
    calcularTotal();
}); */
