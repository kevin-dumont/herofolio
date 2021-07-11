import { useState } from 'react';

export const useBoolean = (initial = false) => {
  const [value, setValue] = useState<boolean>(initial);

  return [
    value,
    () => setValue(true),
    () => setValue(false),
    () => setValue((value) => !value),
  ] as const;
};
