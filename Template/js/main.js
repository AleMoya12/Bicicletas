
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
            //AGREGAMOS UN NUEVO ELEMENTO AL HTML POR CADA REGISTRO DE DATO ESTATICO
            for (const bici of listaDatos) {
                $(contenedorProduct).append(crearElemento(bici));
            }
        }
    }
    );
});


//funcion para crear en elemento del DOM
function crearElemento(dato) {
    let nuevoElemento = document.createElement("div");
    nuevoElemento.classList.add("col-md-4");
    nuevoElemento.classList.add("col-sm-6");
    nuevoElemento.classList.add("col-xs-12");
    //creo la plantilla del contenido
    nuevoElemento.innerHTML = `
    
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
               `;
    //agrego cada nodo creado al padre
    contenedorProduct.appendChild(nuevoElemento);
}


