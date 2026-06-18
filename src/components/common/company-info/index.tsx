import Image from "../image";

export interface ICompanyInfo {
     companyName: string;
  companyAddress: string;
  companyLogo: string;
}

interface ICompanyInfoProps {
    companyInfo: ICompanyInfo;
}
const CompanyInfo: React.FC<ICompanyInfoProps> = ({companyInfo}: ICompanyInfoProps) => {
    return (
        <div className="flex gap-4 items-start">
          <Image 
            src={companyInfo.companyLogo} 
            alt="logo" 
            className="w-[70px] object-contain rounded border p-1 border-gray-100 flex-shrink-0"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-primary font-medium text-[15px] cursor-pointer hover:underline">
              {companyInfo.companyName}
            </span>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm line-clamp-2">
              {companyInfo.companyAddress}
            </p>
            <div className="flex gap-2 items-center text-xs mt-1">
              {/* <span className="font-bold text-gray-700">{row.code}</span> */}
              {/* <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{row.city}</span> */}
            </div>
          </div>
        </div>
    );
}

export default CompanyInfo;