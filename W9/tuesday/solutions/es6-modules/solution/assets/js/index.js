//!!START SILENT
import Game from './game.js';
import { hello as myWord } from './game.js';



//!!END
window.onload = () => {
    console.log(myWord);
    const game = new Game();
    game.start();
};
