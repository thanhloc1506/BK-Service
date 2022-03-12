import React from "react";
import UserTable from "../admin/UserTable";

const ManageService = () => {
  return (
    <div>
      <div className="h-12 bg-white py-8 pb-20 pl-10 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-xl">
          Doanh nghiep sua chua dien thoai - Danh sach user
        </p>
      </div>
      <div>
        <UserTable />
      </div>
    </div>
  );
};

export default ManageService;
