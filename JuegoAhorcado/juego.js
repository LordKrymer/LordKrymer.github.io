corazon="fa-heart";
noCorazon= "fa-heart-broken"


diccionario=["tanque", "hipopotamo", "automovil","murcielago", "persona", "astronauta", "bicicleta", "taller", "tortuga", "periodico", "perro", "gato", "loro", "termo", "termometro", "astronomia", "astrologia", "francotirador", "libreria", "compresor", "silla", "puerta"];
palabraActual=diccionario[Math.floor(Math.random() * (diccionario.length))];
palabra=[];
abecedario=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];
vidas=5;
Gvidas=[corazon,corazon,corazon,corazon,corazon];
juegoTerminado= false;

document.addEventListener('DOMContentLoaded', (event) => {
    crearLetras();
    palabraVacia();
    mostrarPalabra();
    crearVidas();
});

function palabraVacia(){
    for (let i=0;i<palabraActual.length;i++){
        palabra.push("_");
    }
}

function palabraRandom(){
    antiguo = palabraActual;
    while (palabraActual === antiguo){
        palabraActual=diccionario[Math.floor(Math.random() * (diccionario.length))];
    }
}

function tagLetra(dato){
    let tag = document.createElement("span");
    let texto = document.createTextNode(dato);
    tag.appendChild(texto);
    return tag;
}

function crearLetras(){
    for(let i=0;i<abecedario.length;i++){
        elemento=tagLetra(abecedario[i].toUpperCase());
        elemento.dataset.id=abecedario[i];
        elemento.classList.add("letra")
        elemento.addEventListener("click",verificar);
        document.getElementById("letras").appendChild(elemento);
    }
}

function mostrarPalabra(){
    for (let i=0;i<palabra.length;i++){
        elemento=tagLetra(palabra[i]);
        elemento.dataset.slot=i;
        document.getElementById("slots").appendChild(elemento);
    }
}

function verificar(){
    letra=this.dataset.id;
    if (palabraActual.indexOf(letra) != -1) {
        for(let i=0;i<palabraActual.length;i++){
            if (palabraActual[i] == letra){
                palabra[i]=letra;
                let espacio = document.querySelector("#slots > span:nth-child("+(i+1)+")");
                espacio.innerHTML = letra.toUpperCase();
            }
        }
        let boton = document.querySelectorAll('[data-id =' + letra +']');
        boton[0].removeEventListener("click",verificar);
        boton[0].style.backgroundColor="green";
    }
    else {
        perderVida();
    }
    verificarVictoria();
}

function botonRestart(){
    let tag = document.createElement("button");
    let texto = document.createTextNode("Play again");
    tag.appendChild(texto);
    tag.classList.add("button1");
    tag.classList.add("bouncy");
    tag.addEventListener("click",reiniciar);
    return tag;
}

function perderVida(){
    Gvidas[Gvidas.indexOf(corazon)] = noCorazon;
    crearVidas();
    vidas--;
    if (vidas != 0){
        let boton = document.querySelectorAll('[data-id =' + letra +']');
        boton[0].removeEventListener("click",verificar);
        boton[0].style.backgroundColor="red";
    }
    else{
        revelarPalabra();
        let tag = document.createElement("p");
        let texto = document.createTextNode("GAME OVER");
        tag.appendChild(texto);
        document.getElementById('letras').innerHTML ="";
        document.getElementById('letras').appendChild(tag)
        document.getElementById('letras').appendChild(botonRestart());
    }
}


function verificarVictoria(){
    if (palabra.indexOf("_") == -1 && vidas>0){
        let tag = document.createElement("p");
        let texto = document.createTextNode("Felicidades!!!");
        tag.appendChild(texto);
        document.getElementById('letras').innerHTML=""
        document.getElementById("letras").appendChild(tag);
        document.getElementById('letras').appendChild(botonRestart());
    }
}


function crearVidas(){
    let vidas = document.getElementById("vidas");
    vidas.innerHTML = "";
    for (let i=0; i<Gvidas.length;i++){
        let tag= document.createElement("i");
        tag.classList.add("fas");
        tag.classList.add(Gvidas[i]);
        tag.dataset.id = i;
        vidas.appendChild(tag);
    }
}

function reiniciar (){
    document.getElementById("palabra").innerHTML = '<p id="slots" class="col-12"></p>';
    document.getElementById("letras").innerHTML = '';
    document.getElementById("slots").innerHTML = "";
    palabra=[];
    palabraRandom();
    crearLetras();
    palabraVacia();
    mostrarPalabra();
    Gvidas=[corazon,corazon,corazon,corazon,corazon];
    vidas=5;
    crearVidas();
}

function revelarPalabra(){
    palabra = [];
    for (let i=0;i<palabraActual.length;i++){
        palabra.push(palabraActual[i].toUpperCase());
    }
    document.getElementById("slots").innerHTML = "";
    mostrarPalabra();
}



