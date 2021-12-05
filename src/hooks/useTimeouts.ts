import { useEffect, useRef } from 'react';

type TimeoutFn = () => void;
type TimeoutDelay = number;

type AddTimeoutArgs = [TimeoutFn, TimeoutDelay];

type AddTimeoutFn = (...args: AddTimeoutArgs) => void;
type ClearTimeoutsFn = () => void;

type UseTimeoutsOutput = [AddTimeoutFn, ClearTimeoutsFn];

const useTimeouts = (): UseTimeoutsOutput => {
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = () => {
    if (timeouts?.current) {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    }
  };

  const addTimeout = (...args: AddTimeoutArgs) => {
    if (timeouts?.current) {
      timeouts.current.push(setTimeout(...args));
    }
  };

  useEffect(() => {
    return clearTimeouts;
  }, []);

  return [addTimeout, clearTimeouts];
};

export { useTimeouts };
