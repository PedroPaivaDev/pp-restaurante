import React from "react";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
    message: "Preencha um email válido.",
  },
  contact: {
    regex: /^\(?[1-9]{2}\)? ?(?:[2-8]|9 [1-9])[0-9]{3}\-?[0-9]{4}$/,
    message: "Insira um número válido, incluindo DDD",
  }
};

interface PropsOnChange {
  target: HTMLInputElement;
  currentTarget: HTMLInputElement;
}

const useForm = (type:'email'|'contact'|null) => {
  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState<string|null>(null);

  function validate(value:string) {
    if (value.trim().length === 0) {
      setError("Preenchimento obrigatório");
      return false;
    } else if (type && types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target, currentTarget }:PropsOnChange) {
    if (error) validate(target.value);
    if (type==="contact") {
      currentTarget.maxLength = 16;
      let valueMasked = currentTarget.value;
      valueMasked = valueMasked.replace(/\D/g, "");
      valueMasked = valueMasked.replace(/^(\d{2})(\d{1})(\d{4})(\d)/, "($1) $2 $3-$4");
      setValue(valueMasked);
    } else {
      setValue(target.value);
    }
  }

  return {
    value,
    error,
    onChange,
    onBlur: () => validate(value)
  };
};

export default useForm;