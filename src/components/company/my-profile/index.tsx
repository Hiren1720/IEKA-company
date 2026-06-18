import TopBar from "../../common/topbar/TopBar";
import "./DetailsCards.css";
import CompanyDetailsCard from "./CompanyDetailsCard";
import PersonalDetailsCard from "./PersonalDetailsCard";
import { useEffect, useState } from "react";
import PageLoader from "../../common/loader/PageLoader";
import { getProfile } from "../../../apis/admin/my-profile";

export interface ICompanyDetails {
  companyName: string;
  gstin: string;
  companyEmail: string;
  companyLogo: string;
}

export interface IAdminProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  passwordChangedAt: string | null;
}

const MyProfile = () => {
  const [loading,setLoading] = useState<boolean>(true)
  const [profile, setUser] = useState<IAdminProfile>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profileImage: "",
    status: "ACTIVE",
    lastLoginAt: "",
    passwordChangedAt: null,
    createdAt: "",
    updatedAt: "",
  });

  const [companyDetails, setCompanyDetails] = useState<ICompanyDetails>({
    companyName: "",
    gstin: "",
    companyEmail: "",
    companyLogo: ""
})

  useEffect(() => {
    getAdminProfile(true);
  }, []);

  const getAdminProfile = async (loader: boolean = false) => {
    setLoading(loader);
    const response = await getProfile();
    if (response?.data) {
      setUser(response?.data);
      setCompanyDetails(response?.data?.company)
      setLoading(false);
    }
  };
  return (
    <>
    <PageLoader loading={loading}/>
      {!loading && <>
      <TopBar title={companyDetails?.companyName} />
      <div className="content-area grid grid-cols-1 sm:grid-cols-[3fr_4fr] gap-4">
        <CompanyDetailsCard companyDetails={companyDetails} getAdminProfile={getAdminProfile}/>

        <PersonalDetailsCard profile={profile} getAdminProfile={getAdminProfile}/>
      </div>
      </>}
    </>
  );
};

export default MyProfile;
