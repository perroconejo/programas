function dni_valido(dni){
  var numero
  var letr
  var letra
  var correcto=false;
  var expresion= /^\d{8}[a-zA-Z]$/;

  if(expresion.test (dni)== true){
    numero =dni.substr(0,dni.length-1);
    letr=dni.substr(dni.length-1,1);
    numero= numero % 23;
    letra='TRWAGMYFPDXBNJZSOVHLCKET';
    letra=letra.substring(numero,numero+1);
    if(letra == letr.toUpperCase()){
      correcto = true;
    }
  }
  return correcto;
}