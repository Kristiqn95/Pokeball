import { Sprite } from 'pixi.js';
import Scene from './Scene';
import gsap from 'gsap';
import Button from '../components/Button';
import Pokeball from '../components/Pokeball';

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

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars

  }
}