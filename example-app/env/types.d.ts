type Env = Partial<Readonly<typeof import("./env.local.json")>>;

declare namespace NodeJS {
  interface ProcessEnv extends Env {
    readonly HOGE?: string;
  }
}
