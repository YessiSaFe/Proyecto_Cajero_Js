// Mini Proyecto: Cajero Automático

// Crea una aplicación web con JavaScript donde simulemos la interacción con un cajero automático.

// Al ingresar al cajero, puedes seleccionar la cuenta con la que deseas interactuar. Deben existir al menos tres cuentas. Para esto, puedes trabajar con un arreglo de objetos como el siguiente:

let cuentas = [
  { nombre: "Hiromi", saldo: 200, password: "helloworld" },
  { nombre: "Luis", saldo: 290, password: "l33t" },
  { nombre: "Carlos", saldo: 67, password: "123" },
];

// login();

// Inicio del programa
// function login() {
//     // 1. Elegir usuario.
//     let usuario = prompt('Escribe tu nombre');
//     let contra = prompt('Ingresa la contraseña para el usuario: ' + usuario);
//     validarUsuario(usuario, contra)
// }

// function validarUsuario (usuario, contra) {
//     for(let i = 0; i < cuentas.length; i++) {
//         if(usuario === cuentas[i].nombre) {
//             // Usuario existe
//             if(contra === cuentas[i].password) {
//                 console.log('DATOS CORRECTOS');
//                 mostrarMenu(i)
//             } else {
//                 console.log('Contraseña incorrecta')
//             }
//             return
//         } else {
//             console.log('no');
//         }
//     }
// }

// Al seleccionar una cuenta, debes ingresar el password asociado a la cuenta. Si el password es incorrecto, debes notificar al usuario y permitirle intentarlo nuevamente. Si el password es correcto, debes mostrar las siguientes opciones:
// Consultar saldo
// Ingresar monto
// Retirar monto

// function mostrarMenu(posicionUsuario){
//     let opcion = prompt('Indica una opción:\n 1. Consultar saldo\n 2. Hacer un deposito \n 3. Hacer un retiro \n 4. Salir');

//     if(opcion == 1) {
//         consultarSaldo(posicionUsuario)
//     } else if(opcion == 2) {
//         depositar(posicionUsuario)
//     } else if(opcion == 3){
//         retirar(posicionUsuario)
//     } else if(opcion == 4){
//         alert('adiós');
//         return
//     } else {
//         alert('opción inválida');
//         mostrarMenu(posicionUsuario);
//     }
// }

// Al seleccionar consultar saldo, debe mostrar en pantalla el saldo actual de la cuenta
// Al seleccionar ingresar monto, el usuario debe escribir el monto a ingresar. Al ingresar el monto, debe mostrarle al usuario el monto ingresado y el nuevo saldo total.
// Al seleccionar retirar monto, el usuario debe escribir el monto a retirar. Al retirar el monto, debe mostrarle al usuario el monto retirado y el nuevo saldo total.

// function consultarSaldo(posicionUsuario) {
//     alert('El saldo del usuario ' + cuentas[posicionUsuario].nombre + ' es de $' + cuentas[posicionUsuario].saldo);
//     mostrarMenu(posicionUsuario)
// }

// function depositar(posicionUsuario) {
//     let ingreso = prompt("Escribe tu ingreso:")
//     ingreso = Number(ingreso)
//     cuentas[posicionUsuario].saldo = cuentas[posicionUsuario].saldo + ingreso;
//     mostrarMenu(posicionUsuario);
// }

// function retirar(posicionUsuario) {
//     let retiro = prompt("Escribe cuánto quieres retirar:")
//     retiro = Number(retiro)
//     cuentas[posicionUsuario].saldo = cuentas[posicionUsuario].saldo - retiro;
//     mostrarMenu(posicionUsuario);
// }

// Como regla de negocio, una cuenta no debe de tener más de $990 y menos de $10.
// Es necesario hacer las validaciones pertinentes en tu código para que no se rompa esta regla de negocio.

// RETO EXTRA PLUS:
// Si ya posees conocimientos de desarrollo web con html, css y javascript. Haciendo uso del DOM crea una interfaz con html y css que maneje toda la interacción descrita arriba

// --------------------------------------------------------------------------------------------------------------

// FUNCIONES NUEVAS ADAPTADAS AL DOM (HTML)

function ingresar() {
  // Tomar datos de los inputs
  let usuario = document.getElementById("usuario").value;
  let contrasenia = document.getElementById("contrasenia").value;

  // alert('El usuario del input es: ' + usuario + ' y la contraseña es: ' + contrasenia);

  // Validar los datos de los inputs
  validarUsuarioLogin(usuario, contrasenia);
}

function validarUsuarioLogin(usuario, contra) {
  let usuarioValido = false;
  for (let i = 0; i < cuentas.length; i++) {
    if (usuario === cuentas[i].nombre && contra === cuentas[i].password) {
      // Definir qué pasará si son correctos
      alert("DATOS CORRECTOS");
      usuarioValido = true;
      mostrarMenuHTML(i);
      return;
    }
  }
  // Definir qué pasará si son incorrectos
  if (!usuarioValido) {
    alert("Datos incorrectos");
  }
}

function mostrarMenuHTML(posicionUsuario) {
  // Ocultar Login
  document.getElementById("inicio").style.display = "none";

  // Mostrar menú opciones
  document.getElementById("acciones").style.display = "block";

  // Mostrar nombre en el saludo
  // 1. obtener elemento a modificar a través de su id e insertar el nombre del usuario actual
  document.getElementById("nombre-usuario").innerText =
    cuentas[posicionUsuario].nombre;

  //---------------------------------------------------------------------------------------------------------------
  // Añadir funciones a los botenes desde Js, con ayuda de addEventListener
  // Funcion CONSULTAR saldo
  document.getElementById("consultar").addEventListener("click", function () {
    // alert('El saldo actual es de: $' + cuentas[posicionUsuario].saldo);
    // No usar un alert poner el saldo a consultar en un elemento HTML

    // Opc1. Crear un elemento HTML

    // Opc2. El elemento ya está creado en el HTML y sólo lo rellenamos
    document.getElementById("info").innerText =
      "El saldo actual es de: $" + cuentas[posicionUsuario].saldo;

    //ocultar botones
    document.getElementById("deposito").style.display = "none";
    document.getElementById("retiro").style.display = "none";

    //------------------BOTON REGRESAR
    document.getElementById("regresar").style.display = "inline-block";
    //----Agregando funcionalidad al boton regresar; se muestran de nuevo los botones de retiro y deposito (REVISAR)
    let botonregresar = document.getElementById("regresar");
    botonregresar.addEventListener("click", function () {
      document.getElementById("deposito").style.display = "inline-block";
      document.getElementById("retiro").style.display = "inline-block";
      document.getElementById("regresar").style.display = "none";
      document.getElementById("info").style.display = "none";
      document.getElementById("cambio").style.display = "none";
    });
  });

  // Contruir el resto de funciones para los botones
  //-------------------------------------------------------------------------------------------------------------
  ///Funcion para RETIRAR saldo
  document.getElementById("retiro").addEventListener("click", function () {
    // alert("prueba")
    //  document.getElementById("ingreso").style.display = "block"  ---- Esta propiedad oculta o muestra los botones
    //mostrar input de retiro de saldo
    document.getElementById("ingreso").style.display = "block";
    //ocultando los botones de consultar y deposito
    document.getElementById("consultar").style.display = "none";
    document.getElementById("deposito").style.display = "none";


    document.getElementById("info").style.display = "block";
    //cambiando texto a Escribe la cantidad que deseas retirar
    document.getElementById("info").innerText =
      "Escribe la cantidad que deseas retirar:";

    // Funcion para restar la cantidad ingresada en el input al saldo del usuario
    let cantidadRetiro = document.getElementById("ingreso");
    //console.log(cantidadRetiro.value);
    cuentas[posicionUsuario].saldo =
      cuentas[posicionUsuario].saldo - Number(cantidadRetiro.value);
    console.log(cantidadRetiro, "cantidadRetiro");
    console.log(cuentas[posicionUsuario]);

    // Funcion para CONSULTAR SALDO
    document.getElementById("cambio").innerText =
      "El saldo actual es de: $" + cuentas[posicionUsuario].saldo;
      document.getElementById("info").style.display = "block";


    //------------PRUEBA DE IDEA
      //--------Primero hacer la suma y después la funcion para mostrar el saldo para evitar errores
    let botonRetiro = document.getElementById("retiro");
    botonRetiro.addEventListener("click", function () {
      document.getElementById("cambio").style.display = "block";
    });

    //------------------BOTON REGRESAR
    document.getElementById("regresar").style.display = "inline-block";
    //----Agregando funcionalidad al boton regresar; se muestran de nuevo los botones de consultar y deposito
    let botonregresar = document.getElementById("regresar");
    botonregresar.addEventListener("click", function () {
      document.getElementById("deposito").style.display = "inline-block";
      document.getElementById("ingreso").style.display = "none";
      document.getElementById("retiro").style.display = "inline-block";
      document.getElementById("consultar").style.display = "inline-block";
      document.getElementById("regresar").style.display = "none";
      document.getElementById("info").style.display = "none";
      document.getElementById("cambio").style.display = "none";
    });
  });

  //--------------------------------------------------------------------------------------------------------------
  //Funcion para DEPOSITAR saldo
  document.getElementById("deposito").addEventListener("click", function () {
    //mostar input de deposito de saldo
    document.getElementById("depositar").style.display = "block";

    document.getElementById("deposito").style.display = "inline-block";

    document.getElementById("consultar").style.display = "none";

    document.getElementById("ingreso").style.display = "none";

    document.getElementById("retiro").style.display = "none";

    document.getElementById("info").style.display = "block";

    document.getElementById("cambio").style.display = "block";

    document.getElementById("info").innerText =
      "Ingrese la cantidad que desea depositar";

    // Funcion para CONSULTAR SALDO
    document.getElementById("cambio").innerText =
      "El saldo actual es de: $" + cuentas[posicionUsuario].saldo;

    //------------------BOTON REGRESAR
    document.getElementById("regresar").style.display = "inline-block";
    //----Agregando funcionalidad al boton regresar; se muestran de nuevo los botones de retiro y deposito (REVISAR)
    let botonregresar = document.getElementById("regresar");
    botonregresar.addEventListener("click", function () {
      document.getElementById("depositar").style.display = "none";
      document.getElementById("consultar").style.display = "inline-block";
      document.getElementById("deposito").style.display = "inline-block";
      document.getElementById("retiro").style.display = "inline-block";
      document.getElementById("regresar").style.display = "none";
      document.getElementById("info").style.display = "none";
      document.getElementById("cambio").style.display = "none";
    });

    // Funcion para sumar la cantidad depositada en el input al saldo del usuario
    let cantidadDepositada = document.getElementById("depositar");
    //console.log(cantidadDepositada.value);
    cuentas[posicionUsuario].saldo =
      cuentas[posicionUsuario].saldo + Number(cantidadDepositada.value);
      console.log(cantidadDepositada, "cantidadDepositada");
      console.log(cuentas[posicionUsuario]);
      
       // Funcion para CONSULTAR SALDO
       document.getElementById("cambio").innerText =
       "El saldo actual es de: $" + cuentas[posicionUsuario].saldo;
 
     //------------PRUEBA DE IDEA
       //--------Primero hacer la suma y después la funcion para mostrar el saldo para evitar errores
     let botonDeposito = document.getElementById("deposito");
     botonDeposito.addEventListener("click", function () {
       document.getElementById("cambio").style.display = "inline-block";
     });

  });

}

//-------------------Codigo que no se usa, fue sustituido por otras funciones---------------------------------
// En lugar de usar esta función se construyó con un addEventListener
// function consultarSaldoHTML(posicionUsuario) {
//     alert('El saldo actual es de: $' + cuentas[posicionUsuario].saldo);
// }

// function retirarSaldoHTML(posicionUsuario) {
// Limpiar el texto info
// document.getElementById("info").innerText = '';
//  alert('retirar de saldo');
// }

/*
//  function ingresarSaldoHTML(posicionUsuario) {
//  alert('ingresar de saldo');
// }
*/
