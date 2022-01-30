type ScriptFn = () => Promise<any> | any;
const noop = () => undefined;
type NodeScriptConfig = {
  description: string,
  fnToDo: ScriptFn,
  maxRunTimeMinutes: number | boolean,
  exitAtTheEnd: boolean,
};

export class NodeScript implements NodeScriptConfig {

  // defaults
  public description = 'script';
  public fnToDo = noop;
  public maxRunTimeMinutes = 30;
  public exitAtTheEnd = true;

  public constructor(conf?: Partial<NodeScriptConfig>) {
    Object.assign(this, conf);
  }

  public async run(fn: ScriptFn = this.fnToDo) {
    try {
      console.log(`script "${this.description}" started`);
      console.time(this.description);

      this.setupExitIfStuck();

      await fn();

    } catch (e) {
      console.error(e);
    } finally {
      console.timeEnd(this.description);
      if (this.exitAtTheEnd) {
        console.log('script done, exit');
        process.exit(0);
      }
    }
  }

  private setupExitIfStuck() {
    if (!this.maxRunTimeMinutes) {
      return;
    }

    const maxTimeout = Math.pow(2, 31) - 1;
    setTimeout(() => {
      console.error('script timeout for: ' + this.description);
      process.exit(1);
    }, Math.min(this.maxRunTimeMinutes * 60 * 1000, maxTimeout));
  }

}

export async function runScript(name: string, fn: ScriptFn): Promise<void> {
  const script = new NodeScript({ description: name });
  return script.run(fn);
}
