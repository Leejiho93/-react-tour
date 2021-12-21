import { useState, useCallback } from 'react';

type useToggleHook = [boolean, () => void];

function useToggle(initialValue: boolean): useToggleHook {
  const [value, setValue] = useState<typeof initialValue>(initialValue);
  const onToggle = useCallback(() => {
    setValue((value) => !value);
  }, []);
  return [value, onToggle];
}

export default useToggle;
