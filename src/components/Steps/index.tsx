import { useFormContext } from "react-hook-form";
import InputComponent, { TelInputComponent } from "../InputComponent";
import { useEffect, useRef, useState } from "react";
import { useGetCountries } from "../../mock";

export const Step1 = () => {
  const { setValue } = useFormContext();
  const { data: countries, loading: countriesLoading } = useGetCountries();

  return (
    <>
      <div className="grouptitle">Personal Info</div>
      <div className="w-100">
        <InputComponent name="firstName" label="First Name" required placeholder="Enter first name" />
        <InputComponent name="lastName" label="Last Name" required placeholder="Enter last name" />
      </div>

      <div className="w-100">
        <InputComponent
          placeholder="Select gender"
          label="Gender"
          name="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
      </div>
      <div className="w-100">
        <InputComponent
          loading={countriesLoading}
          placeholder="Select residence country"
          label="Your residence country"
          name="countryResidence"
          options={countries?.map((country) => ({ label: country.countryName, value: country.id }))}
        />
      </div>
      <div className="grouptitle">Contact details</div>
      <div className="w-100">
        <InputComponent
          name="email"
          label="Email"
          placeholder="Enter email address.."
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          }}
        />
      </div>
      <div className="w-100">
        <TelInputComponent />
      </div>
      <div className="w-100 terms">
        <input id="terms" type="checkbox" />{" "}
        <label htmlFor="terms">
          <p className="termsLabel">
            I aggree to{" "}
            <a href="#" className="link">
              terms and conditions
            </a>{" "}
            and{" "}
            <a href="#" className="link">
              privacy policy
            </a>
            .
          </p>
        </label>
      </div>
    </>
  );
};
export const Step2 = () => {
  const { setValue, watch } = useFormContext();
  const code = watch("code");

  useEffect(() => {
    if (!code) setValue("code", { value: "Phone", label: "Phone" });
  }, [code]);

  return (
    <div className="step2Box">
      <p>OTP Verification</p>
      <div className="step2Container">
        <p className="subtitle1">Send Code</p>
        <p className="desc1">How would you like to receive the code?</p>

        <div className="checkboxContainer">
          <div className="checkbox">
            <input
              id="checkbox1"
              type="radio"
              name="code"
              checked={code?.label === "Phone"}
              onChange={(e) => setValue("code", { value: e.target.value, label: "Phone" })}
            />
            <label htmlFor="checkbox1" className="labelCheckbox">
              Send to Phone
            </label>
          </div>
          <div className="checkbox">
            <input
              id="checkbox2"
              type="radio"
              name="code"
              checked={code?.label === "Email"}
              onChange={(e) => setValue("code", { value: e.target.value, label: "Email" })}
            />
            <label htmlFor="checkbox2" className="labelCheckbox">
              Send to Email
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Step3 = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputRefs = code.map(() => useRef<HTMLInputElement>(null));
  const { watch, setValue } = useFormContext();
  const otpMode = watch("code.label");
  const formData = watch();

  useEffect(() => {
    if (inputRefs[0]?.current) {
      inputRefs[0].current.focus();
    }
  }, [inputRefs[0]]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, "");
    const newCode = [...code];

    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3 && inputRefs[index + 1]?.current) {
      inputRefs[index + 1].current?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      setValue("otpCode", newCode.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs[index - 1]?.current) {
      inputRefs[index - 1].current?.focus();
    }
  };
  const fullNumber = formData.phoneNumber?.prefix + formData.phoneNumber?.carrier + formData.phoneNumber?.number;
  return (
    <div className="step2Box">
      <p>OTP Verification</p>
      <div className="step2Container">
        <p className="subtitle1">Please check your {otpMode}</p>
        <p className="desc1">We have sent a code to {otpMode === "Email" ? formData.email : fullNumber || ""}</p>

        <div className="code-input">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={inputRefs?.[index]}
              className="otp-input"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
