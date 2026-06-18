import { useRef } from "react";
import "./Otp-field.css";

interface OTPInputFieldProps {
  length?: 4 | 6;
  value: string[];
  onChange: (otp: string[]) => void;
}

const OTPInputField = ({
  length = 4,
  value,
  onChange,
}: OTPInputFieldProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    inputValue: string
  ) => {
    const digit = inputValue.replace(/\D/g, "");

    const newOtp = [...value];
    newOtp[index] = digit;

    onChange(newOtp);

    if (
      digit &&
      index < length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    const otpArray = Array(length).fill("");

    pastedData
      .split("")
      .forEach((char, index) => {
        otpArray[index] = char;
      });

    onChange(otpArray);

    const focusIndex =
      Math.min(
        pastedData.length,
        length - 1
      );

    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="form-group otp-inputs">
      {Array.from({
        length,
      }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          maxLength={1}
          className="otp-input"
          value={value[index] || ""}
          onChange={(e) =>
            handleChange(
              index,
              e.target.value
            )
          }
          onKeyDown={(e) =>
            handleKeyDown(index, e)
          }
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};

export default OTPInputField;