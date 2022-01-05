import { Container, Graphics, Sprite, Text } from 'pixi.js-legacy';
import gsap from 'gsap';

export default class Button extends Container {
    constructor() {
        super();

        this.name = 'button';
        this.interactive = true;
        this.buttonMode = true;

        this._fadeDuration = 0.2;
        this.padding = 20;

        this.onclick = () => { };

        this._createButton();
        this.on("click", () => this.onclick());

    }
    /**
     * @private 
     */
    _createButton() {
        const text = new Text('THROW BALL', {fontFamily: 'Arial', fill: 0xFFFFFF, fontSize: 20});

        const bg = new Graphics();
        bg.beginFill(0xed263a);
        bg.drawRect(-this.padding/2, -this.padding/2, text.width + this.padding, text.height + this.padding);
        bg.endFill();
        this.addChild(bg);

        this.addChild(text);
    }
    /**
     * Button fade out
     */
    hide() {
        gsap.to(this, {alpha: 0, duration: this._fadeDuration, ease: 'none'});
    }
    /**
     * Button fade in
     */
    show() {
        gsap.to(this, {alpha: 1, duration: this._fadeDuration, ease:'none'});
    }
}