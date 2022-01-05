import Button from '../components/Button';
import Pokeball from '../components/Pokeball';
import Scene from "./Scene";
import gsap from 'gsap';

export default class Play extends Scene {
  async onCreated() {
    const pokeball = new Pokeball();
    this.addChild(pokeball);

    const button = new Button();
    button.x -= button.width / 2;
    button.y = 250;
    this.addChild(button);
    button.onclick = () => { 
      pokeball.open(); 
    };

    pokeball.on(Pokeball.events.OPEN_START, () => button.hide());
    pokeball.on(Pokeball.events.CLOSE_END, () => button.show());
  }
}
