export const add = (a: number) => (b: number) => a + b

export const inc = add(1);

export const dec = add(-1);