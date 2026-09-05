export class TimeDuration {
  private _totalSeconds: number;

  constructor(hours: number, minutes: number, seconds: number) {
    this._totalSeconds = hours * 3600 + minutes * 60 + seconds;
  }

  private static fromSeconds(seconds: number): TimeDuration {
    const instance = Object.create(TimeDuration.prototype);
    instance._totalSeconds = seconds;
    return instance;
  }

  static fromString(time: string): TimeDuration {
    const [hours, minutes, seconds] = time.split(":").map((str) => Number(str));
    return new TimeDuration(hours, minutes, seconds);
  }

  add(other: TimeDuration): TimeDuration {
    const resultSeconds = this._totalSeconds + other._totalSeconds;
    return TimeDuration.fromSeconds(resultSeconds);
  }

  subtract(other: TimeDuration): TimeDuration {
    const resultSeconds = this._totalSeconds - other._totalSeconds;
    return TimeDuration.fromSeconds(resultSeconds);
  }

  toString(): string {
    const negative: boolean = this._totalSeconds < 0 ? true : false;
    this._totalSeconds = Math.abs(this._totalSeconds);

    const hour: number = Math.floor(this._totalSeconds / 3600);
    const minute: number = Math.floor((this._totalSeconds % 3600) / 60);
    const second: number = this._totalSeconds % 60;

    return (
      (negative ? "-" : "") +
      String(hour) +
      ":" +
      String(minute) +
      ":" +
      String(second)
    );
  }
}
