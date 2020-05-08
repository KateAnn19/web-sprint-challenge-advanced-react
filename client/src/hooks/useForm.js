// write your custom hook here to control your checkout form
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
// export const useForm = () => {
//   const [username, setUsername] = useState("");
//   return [username, setUsername];
// };

export const useForm = (key, initialValue) => {
  //const [values, setValues] = useState(initialValue);
  const [values, setValues] = useLocalStorage(key, initialValue);
  //useState hooks can be replaced by useLocalStorage

  const handleChanges = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = e => {
    e.preventDefault();
    setValues(initialValue);
  };

  return [values, handleChanges, clearForm];
};
