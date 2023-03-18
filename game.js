const canvas = document.querySelector('#game');//seleccionar
//para acceder a los metodos de ese elemento
const game = canvas.getContext('2d');//juego en 2d

let canvasSize;
let elementsSize;

window.addEventListener('load',setCanvasSize);//apenas cargue el html, para evitar que nos genere problemas a futuro
window.addEventListener('resize',setCanvasSize);//para tomar el elemento de cambio de pantalla



function setCanvasSize() {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    }
    else {
        canvasSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute('Width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    //para hacer responsive, lo usamos dentro del canvas, pero hace efecto cuando se recarga
    //windows.innerHeight
    //windows.innerWidth
    //no tener en cuenta el conenido del html sino de la ventana
    
    //como calcular el ancho y el alto del elemento apartir de ese ancho y alto de nuestro canvas, si tenemos 100px respect necesitamos cada medida de 10px
    elementsSize = canvasSize / 10;

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


    console.log ({canvasSize, elementsSize});
    
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
    const map = maps[0];
    const mapRows = maps[0].trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));//crea un array apartir de otro array
    console.log ({map, mapRows, mapRowCols});

    //crear un ciclo for con los metodos de los arrays
    mapRowCols.forEach((row, rowI) => {//row es un array y col es un caracter
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            //console.log(emojis[col]);//esta variable col ya es la letra
            //console.log({row, col});
            const posX = elementsSize * (colI + 1);//para que no se nos salga del canvas
            const posY = elementsSize * (rowI + 1);
            game.fillText(emoji, posX, posY);
            console.log({row, rowI, col, colI});
            
        });
    });//array bidimensional es un array de filas y adentro tiene un arreglo de las columnas haciendo un doble forEach


    // for(let row = 1; row <= 10; row++){
    //     for(let col = 1; col <= 10; col++){
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col , elementsSize * row);
    //     }    
    // }
}