import React, { useEffect, useState } from "react";
import { regex } from "../../../constants/validation-regex";
import Modal from "../../common/modal/Modal";
import TextField from "../../common/text-field/TextField";
import ImageUpload from "../../common/image-upload";
import TextAreaField from "../../common/text-area/TextAreaField";
import { updateCompanyDetails } from "../../../apis/company/company.api";
import { ICompanyDetails } from ".";

interface CompanyDetailEditModelData {
  companyLogo: File | string | null;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  gstin: string;
  companyAddress: string;
}

type CompanyDetailEditModelErrors = Partial<
  Record<keyof CompanyDetailEditModelData, string>
>;

interface ICompanyDetailEditModelProps {
  isOpen: boolean;
  companyDetails: ICompanyDetails;
  fetchCompanyDetails: () => void;
  handleCompanyClose: () => void;
}
const CompanyDetailEditModel: React.FC<ICompanyDetailEditModelProps> = ({
  isOpen,
  companyDetails,
  fetchCompanyDetails,
  handleCompanyClose,
}) => {
  const [loading, setLoading] = useState(false);

  const initialState: CompanyDetailEditModelData = {
    companyLogo: null,
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    gstin: "",
    companyAddress: "",
  };

  const [formData, setFormData] =
    useState<CompanyDetailEditModelData>(initialState);

  const [errors, setErrors] = useState<CompanyDetailEditModelErrors>({});

  useEffect(() => {
    if (companyDetails._id) {
      setFormData({
        companyLogo: companyDetails.companyLogo,
        companyName: companyDetails.companyName,
        companyEmail: companyDetails.companyEmail,
        companyPhone: companyDetails.companyPhone.toString(),
        gstin: companyDetails.gstin,
        companyAddress: companyDetails.companyAddress,
      });
    }
  }, [companyDetails]);

  const handleChange = (
    name: keyof CompanyDetailEditModelData,
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
    const newErrors: CompanyDetailEditModelErrors = {};

    if (!formData.companyLogo) {
      newErrors.companyLogo = "Company logo is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = "Company email is required";
    } else if (!regex.email.test(formData.companyEmail)) {
      newErrors.companyEmail = "Invalid email address";
    }

    if (!formData.companyPhone.trim()) {
      newErrors.companyPhone = "Company phone is required";
    } else if (!regex.phone.test(formData.companyPhone)) {
      newErrors.companyPhone = "Invalid phone number";
    }

    if (formData.gstin && !regex.gstRegex.test(formData.gstin)) {
      newErrors.gstin = "Invalid GST number";
    }

    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = "Company address is required";
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
    if(response.success){
      setLoading(false);
      handleClose();
      fetchCompanyDetails();
    }
  };

  // handle close modal
  const handleClose = () => {
    // setFormData(initialState);
    handleCompanyClose();
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
          {/* Logo */}

          <ImageUpload
            required
            name="companyLogo"
            label="Company Logo"
            value={formData.companyLogo}
            onChange={(e) => handleChange("companyLogo", e)}
            error={errors.companyLogo}
          />

          <div />

          {/* Company Name */}
          <TextField
            required
            name="companyName"
            label="Company Name"
            value={formData.companyName}
            error={errors.companyName}
            placeholder="Enter company name"
            onChange={(e) => handleChange("companyName", e.target.value)}
          />

          {/* Company Email */}
          <TextField
            required
            name="companyEmail"
            label="Company Email"
            value={formData.companyEmail}
            error={errors.companyEmail}
            placeholder="Enter company email"
            onChange={(e) => handleChange("companyEmail", e.target.value)}
          />

          {/* Phone */}
          <TextField
            required
            name="companyPhone"
            label="Company Phone"
            type="number"
            value={formData.companyPhone}
            error={errors.companyPhone}
            placeholder="Enter company phone"
            onChange={(e) => handleChange("companyPhone", e.target.value)}
          />

          {/* GST */}
          <TextField
            required
            name="gstin"
            label="GST IN No."
            value={formData.gstin}
            error={errors.gstin}
            placeholder="Enter GST IN number"
            onChange={(e) => handleChange("gstin", e.target.value)}
          />

          {/* Address */}
          <TextAreaField
            required
            rows={3}
            label="Company Address"
            name={"companyAddress"}
            value={formData.companyAddress}
            onChange={(e) => handleChange("companyAddress", e.target.value)}
            error={errors.companyAddress}
            placeholder="Enter company address"
          />
        </div>
      </form>
    </Modal>
  );
};

export default CompanyDetailEditModel;
