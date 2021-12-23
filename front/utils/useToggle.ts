import { useState, useCallback, Dispatch, SetStateAction } from 'react';

type useToggleHook = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

function useToggle(initialValue: boolean): useToggleHook {
  const [value, setValue] = useState<typeof initialValue>(initialValue);
  const onToggle = useCallback(() => {
    setValue((value) => !value);
  }, []);
  return [value, onToggle, setValue];
}

export default useToggle;
