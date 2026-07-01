import { useEffect, useState } from "react";
import Button from "../../../common/button/Button";
import TopBar from "../../../common/topbar/TopBar";
import StatusCards from "./StatusCards";
import { StatusType } from "../../../../types/common-types";
import {
  getLeaveById,
  getLeaves,
  updateLeaveStatus,
} from "../../../../apis/organization/leave.api";
import { statusEnum } from "../../../../constants/constants";
import LeaveTable from "./LeaveTable";
import AddLeave from "./AddLeave";
import StatusUpdateModal from "../../../common/modal/StatusModal";
import PageLoader from "../../../common/loader/PageLoader";

export interface ILeave {
  _id: string;
  companyId: string;
  name: string;
  description: string;
  isPaid: boolean;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
}

const Leave = () => {
  const [activeCard, setActiveCard] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [statusOpen, setStatusOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(false);

  const [leaveList, setLeaves] = useState<ILeave[]>([]);
  const initialLeave: ILeave = {
    _id: "",
    companyId: "",
    name: "",
    description: "",
    isPaid: false,
    status: statusEnum.ACTIVE,
    createdAt: "",
    updatedAt: "",
  };
  const [leave, setLeave] = useState<ILeave>(initialLeave);
  // useEffect for get leave
  useEffect(() => {
    fetchLeaveList(page, limit, search, activeCard);
  }, [page, limit, search, activeCard]);

  // get leave list
  const fetchLeaveList = async (
    page: number,
    limit: number,
    search: string = "",
    status: string = "",
  ) => {
    setLoading(true);
    const response = await getLeaves({ page, limit, search, status });
    if (response.success && response.data?.leaves?.length > 0) {
      setLeaves(response.data?.leaves);
      setTotal(response.data?.total);
      setLoading(false);
    } else {
      setLeaves([]);
      setTotal(0);
      setLoading(false);
    }
  };

  // handle click add new
  const handleOnAddOpenClose = () => {
    setIsOpen((prev) => !prev);
    setLeave(initialLeave);
  };

  // handle edit leave details
  const handleEditLeaveDetails = async (leave: ILeave) => {
    setLoading(true);
    const response = await getLeaveById(leave._id);
    if (response?.success) {
      handleOnAddOpenClose();
      setLeave(response?.data);
    }
    setLoading(false);
  };

  // handle status open close
  const handleStatusOpenClose = () => {
    setStatusOpen((prev) => !prev);
    setLeave(initialLeave);
  };

  // handle update status
  const handleUpdateStatus = (leave: ILeave) => {
    handleStatusOpenClose();
    setLeave(leave);
  };

  const handleStatusSubmit = async (formData: {
    status: StatusType;
    remarks: string;
  }) => {
    setStatusLoading(true);

    const payload = {
      status: formData.status.trim(),
      remarks: formData.remarks,
    };

    const response = await updateLeaveStatus(payload, leave._id);
    if (response.success) {
      fetchLeaveList(page, limit, search);
    }
    setStatusLoading(false);
  };

  // handle search leave
  const handleOnSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  return (
    <>
      <TopBar
        title="All Leave"
        actionButtons={
          <Button
            name="Add New"
            size="sm"
            onClick={handleOnAddOpenClose}
            leftIcon={<i className="fa-solid fa-plus"></i>}
          />
        }
        isSearch
        searchPlaceholder="Search leave..."
        onSearch={handleOnSearch}
        isExcel
      />
      <div className="content-area flex flex-col gap-3">
        <PageLoader loading={loading} />
        <StatusCards activeCard={activeCard} setActiveCard={setActiveCard} />
        <LeaveTable
          leaveList={leaveList}
          handleEditLeaveDetails={handleEditLeaveDetails}
          handleUpdateStatus={handleUpdateStatus}
        />
      </div>
      <AddLeave
        isOpen={isOpen}
        handleOpenClose={handleOnAddOpenClose}
        fetchLeaveList={() => fetchLeaveList(page, limit, search, activeCard)}
        leave={leave}
      />
      <StatusUpdateModal
        title={`leave ${leave.name}`}
        isOpen={statusOpen}
        status={leave.status}
        handleOpenClose={handleStatusOpenClose}
        handleSubmit={handleStatusSubmit}
        loading={statusLoading}
      />
    </>
  );
};

export default Leave;
