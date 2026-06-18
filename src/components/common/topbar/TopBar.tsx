
import XLSX from "../../../assets/images/xls.png";
import "./TopBar.css";

interface TopBarProps {
  title?: string;
  actionButtons?: React.ReactNode;
  handleSearchClick?: () => void;
  handleDownloadExcelClick?: () => void;
  handleDownloadPdfClick?: () => void;
  handleCloseClick?: () => void;
  isSearch?: boolean;
  isExcel?: boolean;
  isPdf?: boolean;
}

const TopBar = ({ title = "", actionButtons = <></>,isSearch = false,isExcel = false, isPdf = false, handleSearchClick = () => {}, handleDownloadExcelClick = () => {}, handleDownloadPdfClick = () => {}, handleCloseClick = () => {}}: TopBarProps) => {
  return (
    <div className="topbar">
      <div className="topbarinner">
        <div className="title_parts">
          <div className="title">
            <div className="pagename">{title}</div>
          </div>
          <div className="filterparts">
            <div className="all_events">
              {actionButtons}
              {isSearch && <div
                className="searchicon"
                onClick={handleSearchClick}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>}
              {isExcel && <div
                className="exelicon"
                onClick={handleDownloadExcelClick}
              >
                <img src={XLSX} width="25px" height={"25px"} alt="Excel" />
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
