import React, { useEffect, useState } from "react";
import { regex } from "../../../constants/validation-regex";
import Modal from "../../common/modal/Modal";
import TextField from "../../common/text-field/TextField";
import ImageUpload from "../../common/image-upload";
import TextAreaField from "../../common/text-area/TextAreaField";
import SelectField from "../../common/select/SelectField";
import { genderOptions } from "../../../constants/constants";
import { updateCompanyDetails } from "../../../apis/company/company.api";
import { ICompanyDetails } from ".";

interface OwnerDetailEditModelData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  profileImage: File | string | null;
}

type OwnerDetailEditModelErrors = Partial<
  Record<keyof OwnerDetailEditModelData, string>
>;

interface IOwnerDetailEditModelProps {
  isOpen: boolean;
  companyDetails: ICompanyDetails;
  fetchCompanyDetails: () => void;
  handleOwnerClose: () => void;
}
const OwnerDetailEditModel: React.FC<IOwnerDetailEditModelProps> = ({
  isOpen,
  companyDetails,
  fetchCompanyDetails,
  handleOwnerClose,
}) => {
  const [loading, setLoading] = useState(false);

  const initialState: OwnerDetailEditModelData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    profileImage: null,
  };

  const [formData, setFormData] =
    useState<OwnerDetailEditModelData>(initialState);

  const [errors, setErrors] = useState<OwnerDetailEditModelErrors>({});

  useEffect(() => {
    const owner = companyDetails.companyRepresentative;
    if (owner._id) {
      setFormData({
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        phone: owner.phone,
        gender: owner.gender,
        address: owner.address,
        profileImage: owner.profileImage,
      });
    }
  }, [companyDetails.companyRepresentative]);
  console.log("formData", formData,genderOptions.find((ele) => ele.value === formData.gender)?.label)

  const handleChange = (
    name: keyof OwnerDetailEditModelData,
    value: string | File | null,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: OwnerDetailEditModelErrors = {};

    if (!formData.profileImage) {
      newErrors.profileImage = "Profile image is required";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!regex.email.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!regex.phone.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        payload.append(key, value as any);
      }
    });

    const response = await updateCompanyDetails(payload, companyDetails._id);
    if (response.success) {
      setLoading(false);
      handleClose();
      fetchCompanyDetails();
    }
  };

  // handle close modal
  const handleClose = () => {
    // setFormData(initialState);
    handleOwnerClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={"Company Details"}
      onClose={handleClose}
      handleOnConfirm={handleSubmit}
      loading={loading}
    >
      <form className="">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-4">
          {/* Person Picture */}

          <ImageUpload
            required
            name="profileImage"
            label="Person Picture"
            value={formData.profileImage}
            onChange={(e) => handleChange("profileImage", e)}
            error={errors.profileImage}
          />

          <div />

          {/* First Name */}
          <TextField
            required
            name="firstName"
            label="First Name"
            value={formData.firstName}
            error={errors.firstName}
            placeholder="Enter first name"
            onChange={(e) => handleChange("firstName", e.target.value)}
          />

          {/* Last Name */}
          <TextField
            required
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            error={errors.lastName}
            placeholder="Enter last name"
            onChange={(e) => handleChange("lastName", e.target.value)}
          />

          {/* Company Email */}
          <TextField
            required
            name="email"
            label="Email"
            value={formData.email}
            error={errors.email}
            placeholder="Enter email"
            onChange={(e) => handleChange("email", e.target.value)}
          />

          {/* Phone */}
          <TextField
            required
            name="phone"
            label="Phone No."
            type="number"
            value={formData.phone}
            error={errors.phone}
            placeholder="Enter phone number"
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          {/* Gender */}

          <SelectField
            name="gender"
            label="Gender"
            options={genderOptions}
            value={
              formData.gender
                ? genderOptions.find((ele) => ele.value === formData.gender) ?? ""
                : ""
            }
            placeholder="Select Gender"
            error={errors.gender}
            onChange={(option) => handleChange("gender", option?.value)}
          />

          {/* Address */}
          <TextAreaField
            required
            rows={3}
            label="Home Address"
            name={"address"}
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            error={errors.address}
            placeholder="Enter company address"
          />
        </div>
      </form>
    </Modal>
  );
};

export default OwnerDetailEditModel;
