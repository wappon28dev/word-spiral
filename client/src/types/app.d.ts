/* eslint-disable @typescript-eslint/consistent-type-definitions */

export interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => undefined;
}

declare global {
  interface Document {
    startViewTransition?: (skipTransition) => ViewTransition;
  }
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
