import { useFormContext } from "react-hook-form";
import { type InputHTMLAttributes, type SelectHTMLAttributes, useState, useEffect } from "react";
import type { RegisterOptions } from "react-hook-form";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useGetFlags } from "../mock";
type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: RegisterOptions;
  loading?: boolean;
};

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;
type SelectProps = BaseProps & SelectHTMLAttributes<HTMLSelectElement>;

type Props = InputProps | SelectProps;

const FormInput = ({ label, name, required, options, loading, ...rest }: Props) => {
  const { register, setValue, formState } = useFormContext();
  const { errors } = formState;
  const isSelect = Array.isArray(options);
  return (
    <div className={`form-input ${errors[name] ? "error" : ""}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && "*"} {loading ? "Loading ..." : ""}
        </label>
      )}

      {isSelect ? (
        <Dropdown options={options} onChange={(value) => setValue(name, value)} placeholder="Select an option" />
      ) : (
        <input id={name} {...(rest as InputProps)} {...register(name, { required, ...rest.validation })} />
      )}
    </div>
  );
};

type TelInputComponentProps = {
  handleChange: (phoneNumber: string) => void;
};
export const TelInputComponent = ({ handleChange }: TelInputComponentProps) => {
  const { data: flags, loading: flagsLoading } = useGetFlags();

  const [inputValue, setInputValue] = useState({ prefix: "", carrier: "068", number: "" });

  useEffect(() => {
    if (!inputValue.prefix && flags?.length) {
      setInputValue({ ...inputValue, prefix: flags[0].prefix });
    }
  }, [flags, inputValue]);

  useEffect(() => {
    handleChange(`${inputValue.prefix}${inputValue.carrier}${inputValue.number}`);
  }, [inputValue]);

  return (
    <div className="telComponent">
      <Dropdown
        className="countries"
        placeholder={""}
        value={inputValue.prefix}
        options={(flags || []).map((flag) => ({ label: flag.flag, value: flag.prefix }))}
        onChange={(op) => setInputValue({ ...inputValue, prefix: op.value })}
      />
      <span style={{ marginRight: "5px" }}>{inputValue.prefix}</span>
      (
      <input
        id="tel1"
        type="text"
        value={inputValue.carrier}
        onChange={(e) => setInputValue({ ...inputValue, carrier: e.target.value })}
        className="Inputcarrier"
      />
      ) -
      <input
        id="tel2"
        type="text"
        value={inputValue.number}
        onChange={(e) => setInputValue({ ...inputValue, number: e.target.value })}
        className="Inputnumber"
      />
    </div>
  );
};

export default FormInput;
