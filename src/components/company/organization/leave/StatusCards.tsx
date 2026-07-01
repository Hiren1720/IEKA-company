import { useEffect, useState } from "react";

import StatCard from "../../../common/statecard/StatCard";
import { getCompaniesCount } from "../../../../apis/company/company.api";

interface CardItem {
  id: string;
  title: string;
  count: number;
  activeColor?: string;
  textColor?: string;
  icon: React.ReactNode;
}

export interface CompanyStats {
  total: number;
  active: number;
  inactive: number;
  deleted: number;
}
interface StatusCardsProps {
    activeCard: string;
  setActiveCard: (id: string) => void;
}

const StatusCards = ({ setActiveCard, activeCard }: StatusCardsProps) => {

  const [cards,setCards] = useState<CardItem[]>([
    {
      id: "",
      title: "Total",
      count: 0,
      activeColor: "bg-info",
      textColor: "text-info",
      icon: <i className="fa-solid fa-align-justify"></i>,
    },
    {
      id: "ACTIVE",
      title: "Active",
      count: 0,
      activeColor: "bg-success",
      textColor: "text-success",
      icon: <i className="fa-solid fa-user-check"></i>,
    },
    {
      id: "INACTIVE",
      title: "Inactive",
      count: 0,
      activeColor: "bg-warning",
      textColor: "text-warning",
      icon: <i className="fa-solid fa-user-xmark"></i>,
    },
    {
      id: "DELETED",
      title: "Deleted",
      count: 0,
      activeColor: "bg-danger",
      textColor: "text-danger",
      icon: <i className="fa-solid fa-trash-can"></i>,
    },
  ]);

  useEffect(() => {
    getCompanyCounts();
  },[]);
  
  const getCompanyCounts = async () => {
    // const response = await getCompaniesCount();
    // if(response?.success){
    //   updateCards(response?.data);
    // }
  }

  // update cards
  const updateCards = (stats: CompanyStats) => {
  setCards((prev) =>
    prev.map((card) => {
      switch (card.id) {
        case "":
          return { ...card, count: stats.total };

        case "ACTIVE":
          return { ...card, count: stats.active };

        case "INACTIVE":
          return { ...card, count: stats.inactive };

        case "DELETED":
          return { ...card, count: stats.deleted };

        default:
          return card;
      }
    })
  );
};

  const handleCardClick = (
    card: CardItem
  ) => {
    setActiveCard(card.id);
  };

  return (
    <div className="flex gap-3">
      {cards.map((card) => (
        <StatCard
          key={card.id}
          count={card.count}
          title={card.title}
          icon={card.icon}
          active={activeCard === card.id}
          textColor={card.textColor}
          activeColor={card.activeColor}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
};

export default StatusCards;