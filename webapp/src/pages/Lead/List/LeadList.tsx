import type { FC } from "react";
import useLeadListRequests from "./hooks/useLeadListRequests";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Outlet } from "react-router-dom";

const LeadList: FC = () => {
  const { requests } = useLeadListRequests();

  return (
    <>
      <DataTable
        value={requests.items}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        totalRecords={requests.totalElements}
        lazy
        paginator
      >
        <Column
          field="name"
          header="Name"
          style={{ width: "25%" }}
          body={(item) => item}
        />
      </DataTable>
      <Outlet />
    </>
  );
};

export default LeadList;
