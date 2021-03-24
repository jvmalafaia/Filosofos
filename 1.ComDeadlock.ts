import { Thread, ThreadStart } from 'thread';
import { Dinner } from './';

export class Philo {
  private _thread: Thread;
  public _status: number = 0;
  private _spoons: number = 1;

  constructor(private _id: number, private _dinner: Dinner) {
    this._thread = new Thread(new ThreadStart(this.eat));
  }

  public start = () => {
    try {
      this._thread.start();
    } catch (error) {
      console.log(`\n ${this._id} dead`);
      throw new Error(error);
    }
  };

  private stop = () => {
    this.dropSpoon();
    this._thread.Interrupt();
  };

  private eat = () => {
    if (this._spoons < 2 && this._dinner._totalSpoons < 2) return;
    this._status = 1;
    this._dinner._totalEatingPhilos += 1;
    this._dinner._totalThinkingPhilos -= 1;

    Thread.Sleep((100 * Math.random()) / this._spoons / 10);

    this._status = 0;
    this._dinner._totalThinkingPhilos += 1;
    this._dinner._totalEatingPhilos -= 1;

    this.stop();
    this._thread = new Thread(new ThreadStart(this.eat));
  };

  public getSpoon = () => {
    this._spoons += 1;
    this._dinner._totalSpoons -= 1;
  };

  private dropSpoon = () => {
    this._spoons -= 1;
    this._dinner._totalSpoons += 1;
  };
}
