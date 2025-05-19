import type { FC } from "react";
import useLeadListRequests from "./hooks/useLeadListRequests";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Outlet } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import useLeadListActions from "./hooks/useLeadListActions";
import { Menubar } from "primereact/menubar";

const LeadList: FC = () => {
  const { requests } = useLeadListRequests();
  const { actions, selection } = useLeadListActions();

  const header = () => {
    return (
      <div className="flex align-items-center gap-2">
        <InputText
          value={requests.filter || ""}
          placeholder="Search"
          onChange={requests.handleFilterChange}
        />
        <Button
          type="button"
          icon="pi pi-filter-slash"
          outlined
          onClick={requests.handleFilterClear}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <Menubar model={actions} end={header}/>
      <DataTable
        //header={header}
        value={requests.items}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        totalRecords={requests.totalElements}
        rows={requests.pageSize}
        lazy
        paginator
        onPage={requests.handleNextPageItems}
        first={requests.first}
        loading={requests.isLoading}
        selection={selection.selected}
        onSelectionChange={selection.setSelected}
      >
        <Column selectionMode="multiple" />
        <Column
          field="name"
          header="Name"
          style={{ width: "25%" }}
          body={(item) => item.name}
        />
        <Column
          field="email"
          header="E-mail"
          style={{ width: "25%" }}
          body={(item) => item.email}
        />
        <Column
          field="phone"
          header="Phone"
          style={{ width: "25%" }}
          body={(item) => item.phone}
        />
        <Column
          field="amount"
          header="Amount"
          style={{ width: "25%" }}
          body={(item) => item.amount}
        />        
      </DataTable>
      <Outlet />
    </div>
  );
};

export default LeadList;
