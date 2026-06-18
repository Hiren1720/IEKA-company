import { Info } from "lucide-react";

interface IInfoProps {
  onClick?: () => void;
  className?: string;
  size?: number;
}
export default function InfoIcon({ onClick = () => {}, className = "", size = 18 }: IInfoProps) {
  return (
    <Info onClick={onClick} size={size} className={`text-gray-400 cursor-pointer hover:text-gray-500 ${className}`}/>
  );
}
