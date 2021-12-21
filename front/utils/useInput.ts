import {
  useCallback,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';

type useInputHook<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  Dispatch<SetStateAction<T>>
];

function useInput<T>(initialValue: T): useInputHook<T> {
  const [value, setValue] = useState<typeof initialValue>(initialValue);
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, onChange, setValue];
}

export default useInput;
