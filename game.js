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
    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'],elementsSize,elementsSize * i);//el elemento 0 queda por fuera por eso le damos 1 para poder tener los 10 dentro del canvas
        
    }
}