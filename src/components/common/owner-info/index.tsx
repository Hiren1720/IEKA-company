import Image from "../image";

export interface IOwnerInfo {
  profileImage: string;
  firstName: string;
  lastName: string;
}

interface IOwnerInfoProps {
  ownerInfo: IOwnerInfo;
  onClick?: () => void;
}

const OwnerInfo: React.FC<IOwnerInfoProps> = ({
  ownerInfo,
  onClick = () => {},
}: IOwnerInfoProps) => {
  return (
    <div className="flex gap-3 items-center" onClick={onClick}>
      <Image
        src={ownerInfo.profileImage}
        alt={ownerInfo.firstName}
        className="w-9 h-9 object-cover rounded-full ring-1 ring-gray-200"
      />
      <div className="flex flex-col">
        <span className="text-primary font-medium text-sm cursor-pointer">
          {ownerInfo.firstName} {ownerInfo.lastName}
        </span>
        {/* <span className="text-gray-400 text-xs">{row.ownerId}</span> */}
      </div>
    </div>
  );
};

export default OwnerInfo;
