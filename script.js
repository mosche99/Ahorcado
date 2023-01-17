//Este array contiene todas las palabras con las que jugaremos
const words = ['Perro','Gato','Señor','Tomate','Manzana','Computadora','Cohete','Astronauta','Musica','Cancion','Semaforo','Banana','Auto','Pistola','Estudiar','Futbol','Cantar','Fisica','Taza','Raton'];

//Estas son las variables que maneja el juego

let word, fail, letters, trys, hidden;

//Estos son todos los elementos del DOM que necesitaremos utilizar para crear el juego
const $lose = document.getElementById('lose');

const $win = document.getElementById('win');

const $trys = document.getElementById('trys');

const $restart = document.getElementById('restart')

const $letters = document.getElementById('letters');

const $word = document.getElementById('word');

const $intentar = document.getElementById('intentar');

const $guess = document.getElementById('guess');

const $start = document.getElementById('start');

const $palabraVictoria = document.getElementById('palabra-victoria');

const $palabraDerrota = document.getElementById('palabra-derrota');

const $cartelVictoria = document.getElementById('cartel-victoria');

const $cartelDerrota = document.getElementById('cartel-derrota');


//Obtenemos una palabra al azar
const getAWord = () => {
    let word = words[Math.floor(Math.random()*words.length)].toLowerCase();
    word = word.split('');
    return word;
}

//Convertimos la palabra obtenida con getAWord a un equivalente en rayas.
const hide = (word) => {
    let hide = word.map(() => '_ ');
    return hide;
}

//Establecemos el estado visual de la página al iniciar una nueva partida
const startGameRender = () => {
    $word.textContent = hidden.join('');
    let newSpan = document.createElement('span');
    let spanText = document.createTextNode(`(${word.length})`);
    newSpan.appendChild(spanText);
    $word.appendChild(newSpan);
    $start.classList.add('hide');
    $trys.textContent = `Intentos Restantes: ${trys}`;
    $lose.classList.add('hide');
    $intentar.classList.remove('hide');
    $word.classList.remove('hide');
    $guess.classList.remove('hide');
    $trys.classList.remove('hide');
    $restart.classList.add('hide');
    $start.classList.add('hide');
    $win.classList.add('hide');
    $lose.classList.add('hide');
    $palabraDerrota.classList.add('hide');
    $palabraVictoria.classList.add('hide');
    $start.classList.add('hide');
    $cartelVictoria.classList.add('hide');
    $cartelDerrota.classList.add('hide');
    $letters.textContent = '';
    $intentar.classList.remove('hide');
};

//Es la lógica principal del juego. Si la letra que escogemos forma parte de la palabra, estas letras reemplazaran las rayas en la palabra codificada. Si las letras no forman parte de la palabra, decrementaremos el contador de trys. El juego termina cuando adivinamos la palabra y todas las rayas fueron reemplazadas por sus letras correspondientes (victoria), o cuando el contador trys llega a 0 (derrota).
const guessTheWord = () =>{
    let letter = $guess.value;

    word.forEach((element,index) => {
        if (element === letter) {
            hidden[index] = letter;
            fail = false;
            $guess.value = '';
            $guess.focus();
        }
    })
    $word.textContent = hidden.join('');
    let newSpan = document.createElement('span');
    let spanText = document.createTextNode(`(${word.length})`);
    newSpan.appendChild(spanText);
    $word.appendChild(newSpan);

    if (!word.includes(letter)) {
        fail = true;
        $guess.value = '';
        $guess.focus();
        letters.push(letter);
        $letters.textContent = `[${letters}]` ;
    
    }
    if (fail) {
        trys--;
    
    }
    $trys.textContent = `Intentos Restantes: ${trys}`;
};

//Pantalla de derrota
const renderLose = () => {
    $lose.classList.remove('hide');
    $intentar.classList.add('hide');
    $word.classList.add('hide');
    $guess.classList.add('hide');
    $trys.classList.add('hide');
    $restart.classList.remove('hide');
    $palabraDerrota.textContent = word.join('');
    $palabraDerrota.classList.remove('hide');
    $cartelDerrota.classList.remove('hide')
};


// Pantalla de victoria
const renderWin = () => {
    $win.classList.remove('hide');
    $intentar.classList.add('hide');
    $word.classList.add('hide');
    $guess.classList.add('hide');
    $trys.classList.add('hide');
    $restart.classList.remove('hide');
    $palabraVictoria.textContent = word.join('');
    $palabraVictoria.classList.remove('hide');
    $cartelVictoria.classList.remove('hide');
    
    

};

//Inicializo las variables principales del juego y ejecuto la función startGameRender.
const startGame = () => {
    word = getAWord();
    hidden = hide(word);
    fail = true;
    trys = 5;
    letters = [];
    startGameRender();
}

//Manejo de Eventos en el DOM
document.addEventListener('click', e => {
    if (e.target === $start) {
        startGame();
    } else if (e.target === $intentar ) {
        guessTheWord();

        //Ejecutarse si Perdiste
        if (trys === 0) {
        renderLose();
    
        }
    
        //Ejecutarse si Ganaste
        if (hidden.join('') === word.join('')) {
        renderWin();
        }
    } else if (e.target === $restart) {
        startGame();
    }
    e.preventDefault();
});


