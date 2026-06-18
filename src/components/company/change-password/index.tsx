import { useState } from "react";
import TopBar from "../../common/topbar/TopBar";
import TextField from "../../common/text-field/TextField";
import Button from "../../common/button/Button";
import { changePasswordApi } from "../../../apis/auth/auth.api";
import SuccessPassword from "./SuccessPassword";

interface IPasswordState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<IPasswordState>(initialState);

  const [errors, setErrors] = useState<IPasswordState>(initialState);

  // handle change form values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // form validation for password
  const validateForm = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  // handle submit for password change
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const payload = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    const response = await changePasswordApi(payload);

    if (response.success) {
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setUpdated(true);
    }

    setLoading(false);
  };
  return (
    <>
      <TopBar title="Change Password" />
      {updated ? <SuccessPassword setUpdated={setUpdated}/> : <div className="max-w-md p-8">
        <form method="POST" className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="grid grid-cols-[1fr] items-center gap-5">
            <TextField
              label="Password"
              id="password"
              name="currentPassword"
              type={showCurrent ? "text" : "password"}
              placeholder="Enter your Password"
              value={formData.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
              icon={
                <span
                  className="fieldicon"
                  onClick={() => setShowCurrent((prev) => !prev)}
                >
                  <i
                    className={`fa-solid ${showCurrent ? "fa-eye" : "fa-eye-slash"}`}
                  ></i>
                </span>
              }
            />
          </div>

          {/* Forgot Password */}
          {/* <div className="grid grid-cols-[1fr] mb-5">
            <button
              type="button"
              className="w-fit text-[16px] text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div> */}

          {/* New Password */}
          <div className="grid grid-cols-[1fr] items-center gap-5">
            <TextField
              label="New Password"
              id="password"
              name="newPassword"
              type={showNew ? "text" : "password"}
              placeholder="Enter your Password"
              value={formData.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              icon={
                <span
                  className="fieldicon"
                  onClick={() => setShowNew((prev) => !prev)}
                >
                  <i
                    className={`fa-solid ${showNew ? "fa-eye" : "fa-eye-slash"}`}
                  ></i>
                </span>
              }
            />
          </div>

          {/* Confirm Password */}
          <div className="grid grid-cols-[1fr] items-center gap-5">
            <TextField
              label="Confirm Password"
              id="password"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Enter your Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={
                <span
                  className="fieldicon"
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  <i
                    className={`fa-solid ${showConfirm ? "fa-eye" : "fa-eye-slash"}`}
                  ></i>
                </span>
              }
            />
          </div>

          {/* Submit Button */}
          <div className="grid grid-cols-[1fr] gap-5">
            <div />
            <Button type="submit" fullWidth name="Update Password" loading={loading} />
          </div>
        </form>
      </div>}
    </>
  );
};

export default ChangePassword;
