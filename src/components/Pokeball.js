import { Container, Graphics, Sprite, Text } from "pixi.js-legacy";
import gsap from "gsap";

export default class Pokeball extends Container {
    constructor() {
        super();

        this.pokemon = [];

        fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
            .then(response => response.json())
            .then(data => {
                for(let pokemon of data.results) {
                    this.pokemon.push(pokemon.name);
                }
            });

        this.name = 'pokeball';
        this.text = new Text('temp', { fontFamily: 'Arial', fontSize: 200, fill: 0xffffff, align: 'center'});
        this.text.anchor.set(0.5);
        this.isOpened = false;

        this._openingSize = 300;
        this._defaultTopY = { value: 0 };
        this._defaultBottomY = { value: 0 };

        this._openAnimDuration = 2;
        this._closeAnimDuration = 1;

        this.top = Sprite.from('ball-top');
        this._offSetFactor = this.top.height / 3.25;

        const configure = (sprite, defaultY, offset) => {
            sprite.anchor.set(0.5);
            sprite.y += offset;
            defaultY.value = sprite.y;
            this.addChild(sprite);
        }

        // Create and move top part to the right position
        configure(this.top, this.defaultY, -this._offSetFactor);

        // Create and move bottom part to the right position
        this.bottom = Sprite.from('ball-bottom')
        configure(this.bottom, this._defaultBottomY, this._offSetFactor);
    }
    /**
     * Getter for events
     * @return {Object}
     */
    static get events() {
        return {
            OPEN_START: "open_start",
            OPEN_END: "open_end",
            CLOSE_START: "close_start",
            CLOSE_END: "close_end",
        };
    }
    /**
     * @returns {Promise}
     * @private
     */
    async _shuffle() {
        let prev = 0;
        const numOfSteps = 100;
        const dummy = { value: 0 };

        const steps = gsap.to(dummy, {
            duration: 1,
            ease: `steps(${numOfSteps})`,
            value: numOfSteps,
            paused: true,
            onUpdate: () => {
                if(dummy.value !== prev) {
                    const text = this.pokemon[Math.floor(Math.random()*(numOfSteps - 1))];
                    this.text.text = text;
                    prev = dummy.value;
                }
            },
        });

        await gsap.to(steps, { duration: 5, progress: 1, ease: "circ.out"});
    }
    /**
     * Opens pokeball, emits open start and end events
     */
    open() {
        if(!this.isOpened) {
            this.addChild(this.text);
            gsap.to(this.top, {
                y: this.top.y - this._openingSize / 2,
                duration: this._openAnimDuration,
                ease: 'elastic',
                onStart: () => this.emit(Pokeball.events.OPEN_START),
                onComplete: () => this.emit(Pokeball.events.OPEN_END)
            });
            gsap.to(this.bottom, {
                y: this.bottom.y + this._openingSize / 2,
                duration: this._openAnimDuration,
                ease: 'elastic'
            });
            this.isOpened = true;

            this._shuffle().then(() => this.close());
        }
    }
    /**
     * Closes pokeball, emits close start and end events
     */
    close() {
        if(this.isOpened){
            gsap.to(this.top, {
                y: this._defaultTopY.value,
                duration: this._closeAnimDuration,
                ease: 'bounce',
                onStart: () => this.emit(Pokeball.events.CLOSE_START),
                onComplete: () => this.emit(Pokeball.events.CLOSE_END)
            });
            gsap.to(this.bottom, {
                y: this._defaultBottomY.value,
                duration: this._closeAnimDuration,
                ease: 'bounce'
            });
            this.isOpened = false;
            this.text.destroy(true);
        }
    }
}