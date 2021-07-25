
//VARIABLES

let total = 0;
const PREFIJO = "productoID";
const CARRITO = [];
const carritoStorage = [];
let listaDatos = [];
let almacenados = "";
let cantidades = 0;
let totalcantidad = 0;


//MUESTRO LOS PRUDUCTOS POR DOM
//elijo el sector del html
let contenedorProduct = document.getElementById("container-productos");
//EJECUTO METODO READY PARA CARGAR UNA VEZ ME DIGA QUE ESTA TODO OK
$(document).ready(function () {

    //OBTENGO DATOS DESDE JSON - PETISION ASINCRONICA
    $.getJSON("data/data.json", function (respuesta, estado) {
        console.log(respuesta);
        console.log(estado);
        if (estado === "success") {
            listaDatos = respuesta;

            //ARRAY DE OBJETOS INSTANCIADOS
            /* const productos = [];
            for (const objeto of listaDatos) {
                productos.push(new Lentes(objeto));
            } */

            //AGREGAMOS UN NUEVO ELEMENTO AL HTML POR CADA REGISTRO DE DATO ESTATICO
            for (const bici of listaDatos) {
                $("container-productos").append(crearElemento(bici));

            }
            //DETECTAR EVENTOS DE COMPRA
           /*  let botones = document.getElementsByClassName("btnCompra");
            console.log(botones);
            for (const boton of botones) {
                boton.onclick = manejadorCompra;
            } */
            

            //CAMBIO DE TEXTO EN BOTON AL COMPRAR Y ANIMACION
           /*  $(".btnCompra").click(function (e) {
                console.log(e.target.id);
                $(this).text("EN CARRITO")
                    .css("background", "#ccc");

                $(this).prev(".product__notification").fadeIn("slow")
                    .animate({ top: "80px" }, "slow")
                    .animate({ left: "1300px" }, "fast", function () { $(this).removeAttr('style'); });
            }); */

        }
    }
    );
});

//EVENTO AL HACER CLICK A COMPRAR
/* function manejadorCompra(evento) {
    //determino el id del seleccionado
    //let seleccionado = evento.target.id;
    //Chequeo que no este en el carrito sino lo agrego al carrito
    let seleccionado = CARRITO.find(objeto => objeto.id == evento.target.id);
    if (seleccionado != undefined) {
        seleccionado.vender();
    } else {
        //encuentro la informacion del producto relacionado a ese ID
        let producto = new Lentes(listaDatos.find(objeto => objeto.id == evento.target.id));
        producto.vender();
        console.log(producto);
        //Incluyo en el carrito los productos seleccionados
        CARRITO.push(producto);
        console.log(CARRITO);
        //guardarLocal(CARRITO);
        saveToLocal("productoCarro", CARRITO);
        getFromLocal("productoCarro");
        console.log(carritoStorage);
        //genero salida a traves del localStorage
        generarSalida(carritoStorage);
        // Calculamos  el precio
        calcularTotal();
        calcularTotalCantidad();
        ImporteTotalDom(total, totalcantidad);

        //envioAjax(carritoStorage);
        //puedo usar los metodos de la clase ya una vez hecho el new Lentes:
        //CARRITO[0].estaDisponible();
        //console.log(CARRITO[0].vendido);
    }

}; */


/* function manejadorEliminar(evento) {

    //determino el id del seleccionado
    seleccionadox = evento.target.id;
    console.log(seleccionadox);
    //encuentro el producto relacionado a ese id
    let productox = carritoStorage.find(objeto => objeto.id == seleccionadox);
    let producto = CARRITO.find(objeto => objeto.id == seleccionadox);
    //busco la posicion de ese id en el array
    let posicion = carritoStorage.findIndex(numero => numero == productox);
    console.log(posicion);
    let posicionx = CARRITO.findIndex(numero => numero == producto);
    console.log(posicionx);
    //lo borro del array
    carritoStorage.splice(posicion, 1);
    CARRITO.splice(posicionx, 1);
    //vuelvo a recargar el localStorage
    saveToLocal("productoCarro", CARRITO);
    //vuelvo a cargar carrito
    generarSalida(carritoStorage);
    // Calculamos  el precio
    calcularTotal();
    calcularTotalCantidad();
    ImporteTotalDom(total, totalcantidad);
}; */

//IMPRIMO EN EL SECTOR CARRITO LOS PRODUCTOS SELECCIONADOS
function generarSalida(productos) {
    let body = document.getElementById("tabla").children[1];

    let inner = "";
    let padreUl = document.getElementById("listaImporte");

    //vacio todo el contenedor
    padreUl.textContent = "";
    let lista = "";

    for (const producto of productos) {
        inner += `<tr><td>${producto.id}</td><td><img src="${producto.img}" alt="lente 1" class="product__imgTabla" /></td><td>${producto.nombre}</td><td>${producto.precio}</td><td><input type="number" id="${producto.id}" class="inputCantidad"  value="${producto.cantidad}" min="1" max="5"></td><td><button id="${producto.id}" class="btnEliminar">X</button></td></tr>`;
        /* listado en detalle */
        lista += ` <li id="${producto.id}" class="lista">Producto -> ${producto.nombre}
       <span id="${producto.id}">$ ${producto.precio * producto.cantidad}</span></li>
        `;
    }
    body.innerHTML = inner;
    padreUl.innerHTML = lista;
    

    
};

//funcion para crear en elemento del DOM
function crearElemento(dato) {
    let nuevoElemento = "";
    
    //creo la plantilla del contenido
    nuevoElemento.innerHTML = `
    <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="product-item">
                  <div class="pi-img-wrapper">
                    <img src="${dato.img}" class="img-responsive" alt="${dato.nombre}">
                    <div>
                        <a href="${dato.img}" class="btn btn-default fancybox-button">Zoom</a>
                        <a href="#product-pop-up" class="btn btn-default fancybox-fast-view">View</a>
                    </div>
                  </div>
                  <h3><a href="shop-item.html">${dato.nombre}</a></h3>
                  <div class="pi-price">$ ${dato.precio}</div>
                  <a href="javascript:;" class="btn btn-default add2cart">Add to cart</a>
                </div>
              </div> `;
    //agrego cada nodo creado al padre
    contenedorProduct.appendChild(nuevoElemento);
}


