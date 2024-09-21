const JuegoAhorcado = {
    corazon: "fa-heart",
    noCorazon: "fa-heart-broken",
    diccionario: ["tanque", "hipopotamo", "automovil", "murcielago", "persona", "astronauta", "bicicleta", "taller", "tortuga", "periodico", "perro", "gato", "loro", "termo", "termometro", "astronomia", "astrologia", "francotirador", "libreria", "compresor", "silla", "puerta"],
    palabraActual: "",
    letrasUsadas: [],
    palabra: [],
    abecedario: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    vidas: 5,
    Gvidas: [],
    juegoTerminado: false,

    init: function() {
        this.palabraActual = this.diccionario[Math.floor(Math.random() * this.diccionario.length)];
        this.Gvidas = Array(5).fill(this.corazon);
        document.addEventListener('DOMContentLoaded', () => {
            this.crearLetras();
            this.palabraVacia();
            this.mostrarPalabra();
            this.crearVidas();
        });
    },

    palabraVacia: function() {
        this.palabra = Array(this.palabraActual.length).fill("_");
    },

    palabraRandom: function() {
        let antiguo = this.palabraActual;
        while (this.palabraActual === antiguo) {
            this.palabraActual = this.diccionario[Math.floor(Math.random() * this.diccionario.length)];
        }
    },

    tagLetra: function(dato) {
        let tag = document.createElement("span");
        let texto = document.createTextNode(dato);
        tag.appendChild(texto);
        return tag;
    },

    crearLetras: function() {
        for (let i = 0; i < this.abecedario.length; i++) {
            let elemento = this.tagLetra(this.abecedario[i].toUpperCase());
            elemento.dataset.id = this.abecedario[i];
            elemento.classList.add("letra");
            elemento.addEventListener("click", this.verificar.bind(this));
            document.getElementById("letras").appendChild(elemento);
        }
    },

    mostrarPalabra: function() {
        for (let i = 0; i < this.palabra.length; i++) {
            let elemento = this.tagLetra(this.palabra[i]);
            elemento.dataset.slot = i;
            document.getElementById("slots").appendChild(elemento);
        }
    },

    verificar: function(event) {
        if (!this.letrasUsadas.includes(event.target.dataset.id))
        {
        this.letrasUsadas.push(event.target.dataset.id);
        let letra = event.target.dataset.id;
        if (this.palabraActual.indexOf(letra) !== -1) {
            for (let i = 0; i < this.palabraActual.length; i++) {
                if (this.palabraActual[i] === letra) {
                    this.palabra[i] = letra;
                    let espacio = document.querySelector("#slots > span:nth-child(" + (i + 1) + ")");
                    espacio.innerHTML = letra.toUpperCase();
                }
            }
            let boton = document.querySelectorAll('[data-id =' + letra + ']');
            boton[0].removeEventListener("click", this.verificar.bind(this));
            boton[0].style.backgroundColor = "green";
        } else {
            this.perderVida(letra);
        }
        this.verificarVictoria();
        }
    },

    botonRestart: function() {
        let tag = document.createElement("button");
        let texto = document.createTextNode("Play again");
        tag.appendChild(texto);
        tag.classList.add("button1");
        tag.classList.add("bouncy");
        tag.addEventListener("click", this.reiniciar.bind(this));
        return tag;
    },

    perderVida: function(letra) {
        this.Gvidas[this.Gvidas.indexOf(this.corazon)] = this.noCorazon;
        this.crearVidas();
        this.vidas--;
        if (this.vidas !== 0) {
            let boton = document.querySelectorAll('[data-id =' + letra + ']');
            boton[0].removeEventListener("click", this.verificar.bind(this));
            boton[0].style.backgroundColor = "red";
        } else {
            this.revelarPalabra();
            let tag = document.createElement("p");
            let texto = document.createTextNode("GAME OVER");
            tag.appendChild(texto);
            document.getElementById('letras').innerHTML = "";
            document.getElementById('letras').appendChild(tag);
            document.getElementById('letras').appendChild(this.botonRestart());
        }
    },

    verificarVictoria: function() {
        if (this.palabra.indexOf("_") === -1 && this.vidas > 0) {
            let tag = document.createElement("p");
            let texto = document.createTextNode("Felicidades!!!");
            tag.appendChild(texto);
            document.getElementById('letras').innerHTML = "";
            document.getElementById("letras").appendChild(tag);
            document.getElementById('letras').appendChild(this.botonRestart());
        }
    },

    crearVidas: function() {
        let vidas = document.getElementById("vidas");
        vidas.innerHTML = "";
        for (let i = 0; i < this.Gvidas.length; i++) {
            let tag = document.createElement("i");
            tag.classList.add("fas");
            tag.classList.add(this.Gvidas[i]);
            tag.dataset.id = i;
            vidas.appendChild(tag);
        }
    },

    reiniciar: function() {
        document.getElementById("palabra").innerHTML = '<p id="slots" class="col-12"></p>';
        document.getElementById("letras").innerHTML = '';
        document.getElementById("slots").innerHTML = "";
        this.palabra = [];
        this.palabraRandom();
        this.crearLetras();
        this.palabraVacia();
        this.mostrarPalabra();
        this.Gvidas = Array(5).fill(this.corazon);
        this.vidas = 5;
        this.crearVidas();
    },

    revelarPalabra: function() {
        this.palabra = [];
        for (let i = 0; i < this.palabraActual.length; i++) {
            this.palabra.push(this.palabraActual[i].toUpperCase());
        }
        document.getElementById("slots").innerHTML = "";
        this.mostrarPalabra();
    }
};

JuegoAhorcado.init();