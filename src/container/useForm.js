import { useState } from "react";

export function useForm(initialValue) {
  const [value, setValue] = useState(initialValue);
  const getValue = e => {
    setValue({
      ...value,
      [e.target.id]: e.target.value
    });
  };

  return [value, getValue];
}
