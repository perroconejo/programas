class product{
    constructor(nombre, precio, vencimiento){
        this.nombre= nombre;
        this.precio= precio;
        this.vencimiento= vencimiento;
    }
}
class UI{
    agregaProducto( producto){
    const productlist=document. getElementById('lista-producto');
    const element=document.createElement('div');
    element.innerHTML=`
    <div class="card text-center mb-3 ">
         <div class="card-body">
            <strong>nombre del producto</strong>:${producto.nombre}
            <strong>precio del producto:</strpng>:${producto.precio}
            <strong>vencimiento del producto </strong>:${producto.vencimiento}
            <a href='#' class= "btn btn-danger" name="eliminar">Eliminar</a>
         </div>
     </div>
    `;
     productlist.appendChild(element); 
       this.resetForm(); 
    }
resetForm(){
        document.getElementById('formu-del-product').reset();
}
eliminaproducto(element){
        if(element.name==='eliminar'){
            element.parentElement.parentElement.parentElement.remove();
            this.mensaje('Producto Eliminado');
    } 
} 
mensaje(mess,css){
    const div1= document.createElement('div');
    div1.className='alert alert-info alert-${cssClass} mt-4 ';
    div1.appendChild(document.createTextNode(mess));
    const contenido=document.querySelector('.contenido');
    const apli= document.querySelector('#app');
    contenido.insertBefore(div1,apli);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2000);
    }
}
document.getElementById('formu-del-product').addEventListener('submit' ,function(e){
 const nombre=document.getElementById('nombre').value;
 const precio=document.getElementById('precio').value;
 const vencimiento=document.getElementById('vencimiento').value;
 
 const producto= new product(nombre,precio, vencimiento);
 const ui = new UI();
 if(nombre===''||precio===''||vencimiento===''){
     return ui.mensaje('completa los espacios','warning');
 }
 ui.agregaProducto(producto);
 ui.mensaje('Producto agregado');
 e.preventDefault();
});

document.getElementById('lista-producto'). addEventListener('click', function(e){
 const ui= new UI();
 ui.eliminaproducto(e.target);
});