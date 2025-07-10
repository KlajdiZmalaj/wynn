import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import Register from "../components/Register";
import "@testing-library/jest-dom";

test("renders Register and shows Step 1 by default", () => {
  render(<Register />);

  expect(screen.getByText("Registration")).toBeInTheDocument();
  expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();

  expect(screen.queryByRole("button", { name: /back/i })).not.toBeInTheDocument();
});

test("navigates to Step 2 when form is filled and Next is clicked", async () => {
  const { container } = render(<Register />);

  fillForm(container);

  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  expect(await screen.findByText("Step 2 of 3")).toBeInTheDocument();
});

test("shows Back button on Step 2 and allows navigation", async () => {
  const { container } = render(<Register />);

  fillForm(container);

  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  expect(await screen.findByText("Step 2 of 3")).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /back/i }));
  expect(await screen.getByText("Step 1 of 3")).toBeInTheDocument();
});

test("navigates to Step 3 and inputs OTP code", async () => {
  const { container } = render(<Register />);

  fillForm(container);

  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  await waitFor(() => {
    expect(screen.getByText(/send code/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  expect(await screen.findByText(/please check your/i)).toBeInTheDocument();

  const otpInputs = container.querySelectorAll(".otp-input");
  expect(otpInputs).toHaveLength(4);

  otpInputs.forEach((input, i) => {
    fireEvent.change(input, { target: { value: String(i + 1) } });
  });

  otpInputs.forEach((input, i) => {
    expect((input as HTMLInputElement).value).toBe(String(i + 1));
  });

  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

function fillForm(container: HTMLElement) {
  fireEvent.input(container.querySelector("#firstName")!, {
    target: { value: "John" },
  });
  fireEvent.input(container.querySelector("#lastName")!, {
    target: { value: "Doe" },
  });
  fireEvent.input(container.querySelector("#email")!, {
    target: { value: "john@example.com" },
  });

  const codeLabelInput = container.querySelector('[name="code.label"]') as HTMLInputElement;
  if (codeLabelInput) {
    fireEvent.change(codeLabelInput, { target: { value: "Email" } });
  }
}
