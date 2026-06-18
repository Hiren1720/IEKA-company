import React, { useEffect, useState } from "react";
import Modal from "../../common/modal/Modal";
import ImageUpload from "../../common/image-upload";
import TextField from "../../common/text-field/TextField";
import { ICompanyDetails } from ".";
import { updateProfile } from "../../../apis/admin/my-profile";
import { regex } from "../../../constants/validation-regex";
import Image from "../../common/image";
import { useAuthStore } from "../../../store/auth-store";

interface CompanyDetailsProps {
  companyDetails: ICompanyDetails;
  getAdminProfile: () => void;
}

interface CompanyDetailForm {
  companyName: string;
  companyEmail: string;
  gstin: string;
  companyLogo: File | string | null;
}

interface FormErrors {
  companyName?: string;
  companyEmail?: string;
  gstin?: string;
  companyLogo?: string;
}

const CompanyDetailsCard: React.FC<CompanyDetailsProps> = ({
  companyDetails,
  getAdminProfile
}: CompanyDetailsProps) => {

  const {setUser} = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [companyDetail, setCompanyDetail] = useState<CompanyDetailForm>({
    companyName: companyDetails?.companyName || "",
    companyEmail: companyDetails?.companyEmail || "",
    gstin: companyDetails?.gstin || "",
    companyLogo: companyDetails?.companyLogo || null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // sync when modal open
  useEffect(() => {
    if (isOpen) {
      setCompanyDetail({
        companyName: companyDetails?.companyName || "",
        companyEmail: companyDetails?.companyEmail || "",
        gstin: companyDetails?.gstin || "",
        companyLogo: companyDetails?.companyLogo || null,
      });

      setErrors({});
    }
  }, [isOpen, companyDetails]);

  // handle close edit modal
  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  // handle change values
  const handleChange = (value: any, name: keyof CompanyDetailForm) => {
    setCompanyDetail((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // validate fields
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!companyDetail.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!companyDetail.companyLogo) {
      newErrors.companyLogo = "Company Logo is required";
    }

    if (!companyDetail.companyEmail.trim()) {
      newErrors.companyEmail = "Company email is required";
    } else if (!regex.email.test(companyDetail.companyEmail)) {
      newErrors.companyEmail = "Enter a valid email";
    }
    
    if (!companyDetail.gstin.trim()) {
      newErrors.gstin = "GST IN number is required";
    } else if (
      companyDetail.gstin &&
      !regex.gstRegex.test(companyDetail.gstin.trim().toUpperCase())
    ) {
      newErrors.gstin = "Enter a valid GST IN number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // handle submit for update
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("companyName", companyDetail.companyName);

    formData.append("companyEmail", companyDetail.companyEmail);

    formData.append("gstin", companyDetail.gstin);

    if (companyDetail.companyLogo) {
      formData.append("companyLogo", companyDetail.companyLogo);
    }

    const response = await updateProfile(formData);

    if (response?.success) {
      setIsOpen(false);
      getAdminProfile();
      setUser(response?.data)      
    }

    setLoading(false);
  };

  return (
    <>
      <div className="companyDetailsCard content-card border grid-cols-1">
        <div className="companyHeader">
          <div className="employee_pic">
            <Image src={companyDetails?.companyLogo} alt="CompanyLogo" />
          </div>
          <div className="employee_name">{companyDetails?.companyName}</div>
        </div>
        <div className="employeedetail_parts">
          <div className="titlelabel">
            Company Details{" "}
            <div
              className="action_btn ml_10"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </div>
          <div className="employee_detailsitems">
            <div className="employee_detail_single">
              <div className="label">Company Email</div>
              <div className="labelvalue">{companyDetails?.companyEmail}</div>
            </div>
            <div className="employee_detail_single">
              <div className="label">GST IN No.</div>
              <div className="labelvalue">
                {companyDetails?.gstin ? companyDetails?.gstin : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        title={"Edit Company Details"}
        onClose={handleClose}
        handleOnConfirm={handleSubmit}
        confirmButtonName="Save"
        loading={loading}
      >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Logo */}
            <ImageUpload
              label="Company Logo"
              value={companyDetail?.companyLogo}
              required
              onChange={(file) => {
                handleChange(file, "companyLogo");
              }}
              error={errors.companyLogo}
            />

            {/* Empty column for alignment */}
            <div></div>

            {/* Company Name */}
            <TextField
              required
              label="Company Name"
              placeholder="Enter company name"
              value={companyDetail.companyName}
              error={errors.companyName}
              onChange={(e) => handleChange(e.target.value, "companyName")}
            />

            {/* Company Email */}
            <TextField
              required
              label="Company Email"
              placeholder="Enter company email"
              value={companyDetail.companyEmail}
              error={errors.companyEmail}
              onChange={(e) => handleChange(e.target.value, "companyEmail")}
            />

            {/* GST Number */}
            <TextField
              required
              label="GST IN Number"
              placeholder="Enter GST Number"
              value={companyDetail.gstin}
              error={errors.gstin}
              onChange={(e) => handleChange(e.target.value, "gstin")}
            />
          </div>
      </Modal>
    </>
  );
};

export default CompanyDetailsCard;
