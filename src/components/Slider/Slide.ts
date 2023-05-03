import Timeout from "./Timeout";

export default class Slide {
  container;
  slides;
  controls;
  time;
  index: number;
  slide: Element;
  timeout: Timeout | null; //então o tipo é a interface da classe 'Timeout' criada ou 'null' para o momento que ele é iniciado
  paused: boolean;
  pausedTimeout: Timeout | null;
  thumb: HTMLElement | null;
  thumbItems: HTMLElement[] | null;

  constructor(container: Element, slides: Element[], controls: Element, time: number = 5000) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;

    this.index = localStorage.getItem('activeSlide') ? Number(localStorage.getItem('activeSlide')) : 0;
    this.slide = this.slides[this.index];
    this.timeout = null; //iniciado como null
    this.paused = false;
    this.pausedTimeout = null;
    this.thumb = null;
    this.thumbItems = null;

    this.init();
  }

  hide(element: Element) {
    element.classList.remove('active');
    if(element instanceof HTMLVideoElement) {
      element.currentTime = 0;
      element.pause();
    }
  }

  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    localStorage.setItem('activeSlide', JSON.stringify(this.index));

    if(this.thumbItems) {
      this.thumb = this.thumbItems[this.index];
      this.thumbItems.forEach(item => item.classList.remove('active'));
      this.thumb.classList.add('active');
    }

    this.slides.forEach(element => this.hide(element));
    this.slide.classList.add('active');
    if(this.slide instanceof HTMLVideoElement) {
      this.autoVideo(this.slide);
    } else {
      this.auto(this.time); //só depois que é mostrada a imagem, que será chamado o 'auto'
    }
  }

  autoVideo(video:HTMLVideoElement) {
    video.muted = true;
    video.play();
    let firstPlay = true;
    video.addEventListener('playing', () => {
      if(firstPlay) this.auto(video.duration * 1000); //quando o vídeo ainda não está carregado, o retorno da propriedade 'duration' é 'NaN', por isso foi preciso colocar a execução dentro desse 'Event'
      firstPlay = false; //para que o método 'auto' não seja chamado de novo após o vídeo ser pausado
    })
  }

  auto(time: number) {
    this.timeout?.clear(); //se não for 'null', ou seja, apenas se tiver um setTimeout anterior, o tempo será resetado pelo método 'clear'
    this.timeout = new Timeout(() => this.next(), time); //a propriedade 'timeout' deixará de ser 'null' e receberá o objeto da classe Timeout, com as suas propriedades
    if(this.thumb) this.thumb.style.animationDuration = `${time}ms`;
  }

  prev() {
    if(this.paused) return;
    const prev = this.index > 0 ? this.index - 1 : this.slides.length -1;
    this.show(prev);
  }

  next() {
    if(this.paused) return;
    const next = (this.index + 1) < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }

  pause() {
    document.body.classList.add('paused');
    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pause();
      this.paused = true;
      this.thumb?.classList.add('paused');
      if(this.slide instanceof HTMLVideoElement) this.slide.pause();
    }, 300);
  }

  continue() {
    document.body.classList.remove('paused');
    this.pausedTimeout?.clear();
    if(this.paused) {
      this.paused = false;
      this.timeout?.continue(); //preciso acionar novamente um setTimeout, pois mesmo enquanto fica pausado, o 'auto' chama o 'next', mas o 'next' dá return, pq o 'paused' está 'true'. Aí não é chamado o próximo slide e pára tudo.
      this.thumb?.classList.remove('paused');
      if(this.slide instanceof HTMLVideoElement) this.slide.play();
    }
  }

  private addControls() {
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    prevButton.innerText = "Slide Anterior";
    nextButton.innerText = "Slide Seguinte";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    this.controls.addEventListener('pointerdown', () => this.pause());
    document.addEventListener('pointerup', () => this.continue()); //quando solta o mouse, o vídeo continua
    document.addEventListener('touchend', () => this.continue()); //quando solta o dedo, o vídeo continua

    prevButton.addEventListener('pointerup', () => this.prev());
    nextButton.addEventListener('pointerup', () => this.next());
  }

  addThumbItems() {
    const thumbContainer = document.createElement('div');
    thumbContainer.id = 'slide-thumb';
    for (let i = 0; i < this.slides.length; i++) {
      thumbContainer.innerHTML += `<span><span class="thumb-item"></span></span>`
    }
    this.controls.appendChild(thumbContainer);
    this.thumbItems = Array.from(document.querySelectorAll('.thumb-item'))
  }

  private init() {
    this.addControls();
    this.addThumbItems();
    this.show(this.index);
  }
}