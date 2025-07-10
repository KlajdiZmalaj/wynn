import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Step1, Step2, Step3 } from "./Steps/";
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  countryResidence: string;
  phoneNumber: string;
  exampleRequired: string;
};

function Register() {
  const [step, setStep] = useState(1);
  const methods = useForm<Inputs>({ mode: "onChange" });
  const { handleSubmit, formState, getValues } = methods;
  const { errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleNext = async () => {
    const isStepValid = await methods.trigger(); // Trigger validation for all fields

    if (isStepValid) {
      setStep(step + 1);
    } else {
      console.log("Validation failed. Stay on current step.", errors);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <main className="registerContainer">
      <div className="register">
        <div className="title">
          <h2>Registration</h2> <div>{`Step ${step} of 3`}</div>
        </div>
        <div className="subtitle">Please enter below information to create your account.</div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            <div className="buttonsContainer">
              {step > 1 && (
                <div className="w-100">
                  <button type="button" onClick={handleBack} className="button1">
                    Back
                  </button>
                </div>
              )}
              {step >= 1 && step < 3 && (
                <div className="w-100">
                  <button type="button" onClick={handleNext} className="button2">
                    Next
                  </button>
                </div>
              )}

              {step >= 3 && (
                <div className="w-100">
                  <button
                    type="button"
                    className="button2"
                    onClick={() => {
                      console.log("VALUES~", getValues());
                    }}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}

export default Register;
