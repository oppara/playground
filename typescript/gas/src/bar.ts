export class Bar {
  private count: number = 0;
  constructor(private readonly val: string) {}
  public message() {
    console.log(`bar: ${this.val} count: ${++this.count}`);
  }
}
