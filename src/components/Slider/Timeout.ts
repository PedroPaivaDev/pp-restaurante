export default class Timeout {
  id;
  handler;
  start;
  timeLeft;

  constructor(handler: TimerHandler, time: number) {
    this.id = setTimeout(handler, time); //cada setTimeout gera um id único, que é usado para o seu 'clear'
    this.handler = handler;
    this.start = Date.now(); //salva o 'timestamp' de quando o slide começa
    this.timeLeft = time;
  }

  clear() { //esse método também é chamado na classe Slide
    clearTimeout(this.id);
  }

  pause() {
    const passed = Date.now() - this.start; //guarda a diferença de tempo entre o momento que foi pausado e o tempo de quando o slide começou
    this.timeLeft = this.timeLeft - passed; //é o tempo restante, que vai ser usado para criar um novo setTimeout
    this.clear();
  }

  continue() {
    this.clear();
    this.id = setTimeout(this.handler, this.timeLeft); //novo setTimeout com o tempo restante
    this.start = Date.now(); //para que ele grave o novo início, já que foi criado um novo setTimeout com duração do tempo restante
  }
}