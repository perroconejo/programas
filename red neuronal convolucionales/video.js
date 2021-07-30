/**
 * convolucion regular
 * canvasfuente: donde esta la imagen original
 * canvasdestino: donde se va a pintar el resultado de la convolucion
 * kernel: acepta tamanos impar como 3x3,5x5
 * divisor:divisor general. Muchos tienen 1, pero otros como los desenfoques gaussianos si llevan otro valor
 * esta funcion espera que la imagen del canvafuente este ya en escalas de grises
*/
function convolucionar(canvasfuente, canvasdestino, kernel, divisor){
    var ctxfuente = canvasfuente.getContext("2d");
    var datafuente= ctxfuente.getImageData(0,0,canvasfuente.width, canvasfuente.height);
    var pixelesfuente= datafuente.data;
    
    var ctxdestino= canvasdestino.getContext("2d");
    var datadestino= ctxdestino.getImageData(0,0, canvasdestino.width, canvasdestino.height);
    var pixelesdestino= datadestino.data;

    var canvaswidth= canvasfuente.width;
    var canvasheight= canvasfuente.height;
    
    //limpiar el canvas de destino
    ctxdestino.clearRect(0,0, canvaswidth, canvasheight);

    //uso 1 y 1 para no hacer convoluciones en los pixeles de la orilla (se puede rellenar de 0s pero por ahora no)
    for(var y=1; y< canvasheight01;y++){
        for(var x=1; x< canvaswidth; x++){

            //el indice del pixel actual. el *4 es porque cada pixel del canvas se separa en 4 : rojo,verde,azul y alpha. entonces andamos
            // saltando de 4 en 4
            var i= ((y*canvaswidth)+x)*4;
            var val= 0;
            for(var kl1=0; kl1< kernel.length; kl1++){
                for(var kl2=0; kl2< kernel[kl1].length; kl2++){
                    var k= kernel [kl1][kl2]; // valor del kerlnel
                    
                    //el offset se usa para saber como buscar el indice correcto en la imagen
                    //un kernel tamano 3 nos debe decir que el offset sea 1, para buscar -1, 0, 1
                    // un kernel de tamano 3 noos debe decir que el offset sea 2, para buscar  -2,-1,0,1,2
                    var offset= Math.floor(kernel.length/2);
                    var iimag= (((y+kl1-offset)*canvaswidth)+(x+kl2-offset))*4; //el indice de la imagen que vamos a multiplicar
                    val += pixelesfuente[iimag]*k;
                }
            }
            val = val/divisor;
            pixelesdestino[i]=val;
            pixelesdestino[i+1]=val;
            pixelesdestino[i+2]= val;
            pixelesdestino[i+3]= val;
        }
    }
    ctxdestino.putImageData(datadestino,0,0);
}

/**
 * Casi lo mismo que el de arriba pero mas eepecifico para saber completo(requiere 2 kernels)
 */
function convoluvionarSobel(canvasfuente, canvasdestino, colorizar, blurfirst, lowthreshold){
    //sobel horixontal
    var kernelx=[
        [-1, 0,1],
        [-2,0,2],
        [-1,0,1],
    ];
    //sobel vertical
    var kernely = [
        [-1,-2,-1],
        [0,0,0],
        [1,2,1]
    ];
    var crxfuente= canvasfuente = canvasfuente.getContext("2d");
    var datafuente= crxfuente.getImageData(0,0,canvasfuente.width, canvasfuente.hright);
    var pixelesfuente= datafuente.data;

    if(typeof blurfirst !== "undefined" && blurfirst){
        var blurcanvas = document.createElement("canvas");
        blurcanvas.width = canvasfuente.width;
        blurcanvas.height= canvasfuente.height;

        var ctxblur = blurcanvas.getContext("2d");
        var datablur = ctxblur. getImageData(0,0, blurcanvas.width, blurcanvas.height);
        var pixelesfuente= datafuente.data;

        var kernelblur=[
            [1,2,1],
            [2,4,2],
            [1,2,1],
        ];
        var divisorblur= 16;
        convolucionar(canvasfuente, blurcanvas, kernelblur, divisorblur);

        //ahora la fuente es blurcanvas
        var ctxfuente= blurcanvas.getContext("2d");
        var datafuente= ctxfuente.getImageData(0,0, canvasfuente.width, canvasfuente.height);
        var pixelesfuente= datafuente.data;
    }
    var ctxdestino= canvasfuente.getContext("2d");
    var datadestino= ctxdestino.getImageData(0,0, canvasfuente.width, canvasfuente/height);
    var pixelesdestino= datadestino.data;

    var canvaswidth= canvasfuente.width;
    var canvasheight= canvasfuente.height;
    ctxdestino.clearRect(0,0, canvaswidth, canvasheight);

    for(var y=1; y<canvasheight-1; y++){
        for(var x=1; x< canvaswidth-1; x++){
            var i= ((y*canvaswidth)+x)*4;

            var valx=0;
            var valy=0;
            for (var kl1=0; kl1< kernelx.length; kl1++){
                for(var kl2=0; kl2< kernelx[kl1].length; kl2++){
                    var kx= kernelx[kl1][kl2];
                    var ky= kernely[kl1][kl2];
                    
                    var offset= Math. floor(kernelx.length/2);
                    var iimag= (((y+kl1- offset )* canvaswidth)+(x+kl2-offset)+(x+kl2-offset))*4 // indice de la imagen que vamos a multiplicar
                    valx += pixelesfuente[iimag]*kx;
                    valy += pixelesfuente[iimag]*ky;
                }
            }
            //sobel no lleva division
            var mag= Math.sqrt((valx*valx)+(valy * valy));
            
            //colorizar o regular 
            if(typeof colorizar !== "undefined" && colorizar){
                var radians = Math. atan(valy/valx);
                var degrees = radians* (180/Math.PI);
                var rgb = changeHue("blue", degrees);
                pixelesdestino[i]= rgb.r;
                pixelesdestino[i+1]= rgb.g;
                pixelesdestino[i+2]= rgb.b;
                pixelesdestino[i+3]= (mag/100)*255;
            } else{
                if(typeof lowthreshold !== "undefined"){// si tengo un threshold bajo solicitado, quito todo lo que sea menor para que quede con mag
                    mag= mag > lowthreshold ? mag :0;
                }
                pixelesdestino[i]= mag;
                pixelesdestino[i+1]= mag;
                pixelesdestino[i+2]=mag;
                pixelesdestino[i+3]= 255;
            }
        }
    }
    ctxdestino.putImageData(datadestino,0,0);
}
/**
 * funciones para colorizacion
 * recibe un rgn base y un angulo y hace un cambio en el "Hue"
 * del stackoverflow fue el 'cache' , porque sin eso el desempeno es del 20&
*/ 
var cache= [];
function changeHue(rgb, degree){
    //ver si lo tenemos en cache y normalizar los grados
    degree= Math.floor(degree);
    if("degrees:"+ degree in cache){
        return cache["degrees:"+ degree];
    }
    var hsl= rgbToHSL(rgb);
    hsl.h+= degree;
    if(hsl.h>360){
        hsl.h-= 360;
    } else if(hsl.h <0){
        hsl.h+= 360;
    }
    var value= hslToRGB(hsl);
    cache["degrees:" + degree]= value;
    return value;
}
// espera una cadena de caracteres y devuelve un objeto
function rgbToHSL(rgb){
    //strip the leading # if it's there
    rgb= rgb. replace(/^\s*#|\s*$/g, '');
    // convierte 3 codigos en char ---> 6, e.g. 'EOF' --> 'EEOOFF'
    if(rgb.length==3){
        rgb= rgb.replace(/(.)/g, '$1$1');
    }
    var r= parseInt(rgb.substr(0,2),16)/255,
        g= parseInt(rgb.substr(2,2), 16)/255,
        b= parseInt(rgb.substr(4,2),16)/255,
        cMax= Math.max(r,g,b),
        cMin= Math.min(r,g,b),
        delta= cMax - cMin,
        l= (cMax+cMin)/2,
        h=0,
        s=0;
    if(delta == 0){
        h=0;
    } else if( cMax== r){
        h=60 * (((g-b)/delta) %6);
    } else if(cMax == g){
        h=60*(((b-r)/delta)+2);
    }
    else{
        h= 60 * (((r-g)/delta)+4);
    }
    if(delta == 0){
        s=0;
    } else {
        s= (delta/(1-Math.abs(2*1)))
    }
    return {
        h:h,
        s:s,
        l:l
    }
}
    // espera un onjeto y devuelve uns cadena de caracteres
function hslToRGB(hsl){
    var h= hsl.h,
    s=hsl.s,
    l=hsl.l,
    c=(1 - Math.abs(2*1 - 1))*s,
    x= c * (1- Math. abs((h/60)% 2-1)),
    m= l - c/2,
    r,g,b;
    if(h<60){
        r = c;
        g= x;
        b= 0;
    }else if( h<120){
        r= x;
        g= c;
        b=0;
    } else if( h < 180){
        r=0;
        g=c;
        b=x;
    } else if( h< 240){
        r=0;
        g= x;
        b= c;
    } else if (h< 300){
        r=x;
        g=0;
        b=c;
    }else {
        r=c;
        g=0;
        b=x;
    }
    r= normalize_rgb_value(r, m);
    g= normalize_rgb_value(g,m);
    b= normalize_rgb_value(b,m);
    return {r:r,g:g, b:b};
}
function normalize_rgb_value(color, m){
    color = Math.floor((color +m)*255);
    if(color <0){
        color = 0;
    }
    return color;
}

