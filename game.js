const canvas = document.querySelector('#game');//seleccionar
//para acceder a los metodos de ese elemento
const game = canvas.getContext('2d');//juego en 2d

window.addEventListener('load',startGame);//apenas cargue el html, para evitar que nos genere problemas a futuro

//primero que todo crear una funcion para encapsular el codigo que vamos a llamar
//para inicializar
function startGame() {
    //game.fillRect(0,50,100,100);//define el lugar donde va a iniciar, el trazo, la linea y donde va a terminar, xi,yi,xf,yf
    //game.clearRect(50,50,50,50);//borrador

    //la ubicacion en nuestro canvas;
    game.font = '25px Verdana';//el tama;o que va a usar
    //no los llamamos metodos, sino valores, son atributos
    game.fillStyle = 'white';
    game.textAlign = 'start';//podemos decirle que en esas cordenadas va a iniciar en o terminar en
    //insercion de texto
    game.fillText('Platzi', 25, 25);
}
