const canvas = document.querySelector('#game');//seleccionar
//para acceder a los metodos de ese elemento
const game = canvas.getContext('2d');//juego en 2d
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 4;

let timeStart;
let timePlayer;
let timeInterval;
//setInterval //cada cierto tiempo
//setTimeout //una sola vez 

const playerPosition = {
    x:undefined,
    y:undefined, 
};
//la respuyesta a que no nos sale error por borrar una constantes es porque estamos trabajando con objetos, Se cambian las propiedades de un objeto
const giftPosition = {
    x:undefined,
    y:undefined,
};

let enemyPositions = [];

window.addEventListener('load',setCanvasSize);//apenas cargue el html, para evitar que nos genere problemas a futuro
window.addEventListener('resize',setCanvasSize);//para tomar el elemento de cambio de pantalla

function fixNumber(n) {
    return Number(n.toFixed(3));
}

function setCanvasSize() {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    }
    else {
        canvasSize = window.innerHeight * 0.7;
    }
    canvasSize = fixNumber(canvasSize);//toFixed da un string toca volverlo numero
    
    canvas.setAttribute('Width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    //para hacer responsive, lo usamos dentro del canvas, pero hace efecto cuando se recarga
    //windows.innerHeight
    //windows.innerWidth
    //no tener en cuenta el conenido del html sino de la ventana
    
    //como calcular el ancho y el alto del elemento apartir de ese ancho y alto de nuestro canvas, si tenemos 100px respect necesitamos cada medida de 10px
    elementsSize = (canvasSize / 10);

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();//para que no se borre cada vez que se cambie de pantalla
}

//primero que todo crear una funcion para encapsular el codigo que vamos a llamar
//para inicializar
function startGame() {
    //game.fillRect(0,50,100,100);//define el lugar donde va a iniciar, el trazo, la linea y donde va a terminar, xi,yi,xf,yf
    //game.clearRect(50,50,50,50);//borrador

    //la ubicacion en nuestro canvas;
    //game.font = '25px Verdana';//el tama;o que va a usar
    //no los llamamos metodos, sino valores, son atributos
    //game.fillStyle = 'white';
    //game.textAlign = 'start';//podemos decirle que en esas cordenadas va a iniciar en o terminar en
    //insercion de texto
    //game.fillText('Platzi', 25, 25);


    //console.log ({canvasSize, elementsSize});
    
    //pero para cuadrar la posicion bien porque cambia con las pantallas usamos:
    game.font = elementsSize + 'px Verdana';//no solo usar el font size sino la fuente tambien que vamos a usar
    //game.fillText(emojis['X'],100,100);//agregamos un emoji con posicion , x,y

    game.textAlign = 'end';//para que quede la posicion al inicio

    //para tener 10 elememtos vertica y horizontal
    // for (let i = 1; i <= 10; i++) {
    //     game.fillText(emojis['X'],elementsSize,elementsSize * i);//el elemento 0 queda por fuera por eso le damos 1 para poder tener los 10 dentro del canvas
        
    // }
    // for(let i = 1; i <= 10; i++){
    //     for(let j = 1; j <= 10; j++){
    //         game.fillText(emojis['X'], elementsSize * i , elementsSize * j);
    //     }//para hacerlo bidimensional    
    // }

    //para usar el mapa
    //usamos el split para volverlo todo en arreglos del salto de linea \n
    //la funcion trim nos ayuda a quitar lo espacios en blanco que tenemos en el arreglo
    //para quitarle los demas espacios de las otras filas usamos la funcion trim anidada en la funcion map
    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if(!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));//crea un array apartir de otro array
    //console.log ({map, mapRows, mapRowCols});

    showLives();

    enemyPositions =[];//limpiar el arreglo y que no lo acumule, se cambia la variable no a const sino a let
    //para borrar el emoji anterior
    game.clearRect(0,0,canvasSize,canvasSize);

    //crear un ciclo for con los metodos de los arrays
    mapRowCols.forEach((row, rowI) => {//row es un array y col es un caracter
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            //console.log(emojis[col]);//esta variable col ya es la letra
            //console.log({row, col});
            const posX = (elementsSize * (colI + 1.2));//para que no se nos salga del canvas
            const posY = (elementsSize * (rowI + 0.9));
            
            if (col == 'O') {
                //console.log('Aqui debe ir el jugador');
                //console.log({posX, posY});
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    //console.log({playerPosition});
                }//para que no repita la posicion inicial
            } else if (col == 'I'){
                    giftPosition.x = posX;
                    giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX.toFixed(3),
                    y: posY.toFixed(3),
                });                        
            }
            
            game.fillText(emoji, posX, posY);
            //console.log({row, rowI, col, colI});
            
        });
    });//array bidimensional es un array de filas y adentro tiene un arreglo de las columnas haciendo un doble forEach
    // for(let row = 1; row <= 10; row++){
    //     for(let col = 1; col <= 10; col++){
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col , elementsSize * row);
    //     }    
    // }
    // game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
    //la metemos en una funcion para poder moverla en tiempo real
    movePlayer();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision){
        levelWin();
    }


    
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y == playerPosition.y.toFixed(3);
        //console.log({enemyCollisionX, enemyCollisionY});
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
    console.log('Subiste de nivel!!!');
    level++;
    startGame();
}

function levelFail() {
    console.log('Te quemaste!'); 
    lives--;
    
    if (lives <= 0) {
        level = 0;
        lives = 4;
        timeStart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('Terminaste el Juego');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;
    
    if(recordTime){
        if(recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Superaste el record!!';
        }else {
            pResult.innerHTML = 'Lo siento, no superaste el record';
            
        }
    }else {
        localStorage.setItem('record_time', playerTime);
    }
    timeStart = undefined;//para detener el marcador
    console.log({recordTime, playerTime});
}

function showLives() {
    //Un objeto que maneja los arrays
    const heartsArray = Array(lives).fill(emojis['HEART']); //me cree un elemento con la cantidad de elementos que tiene nuestro array [1,2,3]
    //console.log(heartsArray);

    //reiniciamos el array 
    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart)); //apend para que no me borre lo anterior
    //spanLives.innerHTML = emojis['HEART'];
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}



window.addEventListener('keydown', moveByKeys);//keydown. es cuando presionamos y keyup es cuando levantamos de esa tecla
//creamos para leer el click de los controles
btnUp.addEventListener('click',moveUp);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click',moveRight);
btnDown.addEventListener('click',moveDown);

function moveByKeys(event) {
    //console.log(event);
    // if (event.key == 'ArrowUp') {
    //     moveUp();
    // }
    // else if (event.key == 'ArrowLeft') {
    //     moveLeft();
    // }
    // else if (event.key == 'ArrowRight') {
    //     moveRight();
    // }
    // else if (event.key == 'ArrowDown') {
    //     moveDown();
    // }
    //el codigo anterior es equivalente a cuando vamos a usar una sola funcion
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();

}

function moveUp() {
    //console.log('Me quiero mover hacia arriba');
    //playerPosition.y -= elementsSize;
    //la cambiamos por
    //movePlayer();
    //startGame();
    if (playerPosition.y < elementsSize) {
        console.log('Out');
    }else {//por si se sale del mapa
         playerPosition.y -= elementsSize;
         startGame();
     }

}
function moveLeft() {
    //console.log('Me quiero mover hacia la izquierda');
    // playerPosition.x -= elementsSize;
    // startGame();
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('Out');
    }else {//por si se sale del mapa
        playerPosition.x -= elementsSize;
        startGame();
    }

}
function moveRight() {
    //console.log('Me quiero mover hacia la derecha');
    // playerPosition.x += elementsSize;
    // startGame();
    if (playerPosition.x > canvasSize) {
        console.log('Out');
    }else {//por si se sale del mapa
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown() {
    //console.log('Me quiero mover hacia abajo');
    // playerPosition.y += elementsSize;
    // startGame();
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('Out');
    }else {//por si se sale del mapa
        playerPosition.y += elementsSize;
        startGame();
    }
}