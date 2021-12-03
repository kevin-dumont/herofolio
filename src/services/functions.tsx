export const add = (a: number) => (b: number) => a + b;
export const sub = (a: number) => (b: number) => a - b;

export const inc = add(1);

export const dec = add(-1);

export type WhenCallback = () => any;

export const not = (value: any) => !value;

type Falsy = false | 0 | '' | null | undefined;

export const when =
  <T, U extends WhenCallback>(predicate: T) =>
  (action: U): T extends Falsy ? T : U =>
    predicate && action();

export const whenNot = (predicate: any) => when(not(predicate));

export const whenDefined = <T extends any>(value?: T) =>
  whenNot(value === undefined);

export const whenElse =
  (predicate: any) => (action: WhenCallback) => (elseAction: WhenCallback) =>
    predicate ? action() : elseAction();

export const whenNotElse = (predicate: any) => when(not(predicate));

export const or =
  <T, U>(a: T) =>
  (b: U): T | U =>
    a || b;
