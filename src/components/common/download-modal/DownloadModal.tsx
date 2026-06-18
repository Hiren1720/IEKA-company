import React, { useState } from "react";
import "./DownloadModal.css";
import * as XLSX from "xlsx";
// import { jsPDF } from "jspdf";
import TextField from "../text-field/TextField";
import Note from "../note-area/Note";
import DownloadExcelIcon from "../../../assets/images/downloadexcell.png"
import Modal from "../modal/Modal";
import { FileType } from "../../../types/common-types";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataToExport: any[]; // The data you want to put inside the file
  fileName?: string;
  type?: FileType;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  type = "xlsx",
  onClose,
  dataToExport,
  fileName = "exported_data",
}) => {
  const [isPasswordProtected, setIsPasswordProtected] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordProtected(e.target.checked);
    if (!e.target.checked) {
      setPassword(""); // Reset password if unchecked
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    if (isPasswordProtected && password) {
      // NOTE: Standard sheet protection in xlsx locks editing, it doesn't encrypt the file opening.
      // Full workbook encryption requires xlsx-populate or a backend service.
      worksheet["!protect"] = {
        password: password,
        selectLockedCells: true,
        selectUnlockedCells: true,
      };
      setPassword("");
    } else {
      setError("Password is required.")
    }

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const downloadPDF = () => {
    // const doc = new jsPDF();
    // // Simple data rendering for the PDF
    // doc.text("Exported Document Data", 10, 10);
    // dataToExport.forEach((item, index) => {
    //   const rowText = Object.entries(item).map(([key, val]) => `${key}: ${val}`).join(', ');
    //   doc.text(rowText, 10, 20 + (index * 10));
    // });
    // if (isPasswordProtected && password) {
    //   // jsPDF supports native document open encryption
    //   doc.encrypt(password, password, {
    //     userPermissions: ['print', 'modify', 'copy', 'annot-modify']
    //   });
    // }
    // doc.save(`${fileName}.pdf`);
  };

  const handleOnConfirm = () => {
    if(type === "pdf"){
      downloadPDF();
    } else {
      downloadExcel();
    }
  }

  return (
    <Modal
        isOpen={isOpen}
        title="Download"
        onClose={onClose}
        confirmButtonName={"Download"}
        handleOnConfirm={handleOnConfirm}
      >
    <>
      <div className="popcontent">
        <div className="downloadicon">
          <img src={DownloadExcelIcon} alt="download"/>
        </div>
        <div className="message">Are u sure want to Download ?</div>
      </div>
      <div className="passprotected mt_15">
        <input
          type="checkbox"
          id="passwordToggle"
          onChange={handleCheckboxChange}
        />
        <div className="message">
          Do you want the downloaded file to be password protected?
        </div>
      </div>

      {isPasswordProtected && <div className="field_items mt_15" id="passwordField">
        <div className="column_two">
          <TextField
            label="Create Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
            error={error}
            icon={
              <span
                className="fieldicon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i
                  className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </span>
            }
          />
        </div>
      </div>}
      {isPasswordProtected && <Note
        variant="danger"
        message="This file is password protected and can only be accessed by entering the above-mentioned password."
      />}
    </>
    </Modal>
  );
};

export default DownloadModal;
