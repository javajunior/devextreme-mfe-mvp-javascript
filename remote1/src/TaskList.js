import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "./dx-styles.scss";
import React from "react";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
} from "devextreme-react/data-grid";

export default function TaskList() {
  return (
    <DataGrid
      className={"dx-card wide-card"}
      dataSource={dataSource}
      showBorders={false}
      focusedRowEnabled={true}
      defaultFocusedRowIndex={0}
      columnAutoWidth={true}
      columnHidingEnabled={true}
    >
      <Paging defaultPageSize={10} />
      <Pager showPageSizeSelector={true} showInfo={true} />
      <FilterRow visible={true} />
      <Column dataField={"Task_ID"} width={90} hidingPriority={2} />
      <Column
        dataField={"Task_Subject"}
        width={190}
        caption={"Subject"}
        hidingPriority={8}
      />
      <Column dataField={"Task_Status"} caption={"Status"} hidingPriority={6} />
      <Column
        dataField={"Task_Priority"}
        caption={"Priority"}
        hidingPriority={5}
      >
        <Lookup
          dataSource={priorities}
          valueExpr={"value"}
          displayExpr={"name"}
        />
      </Column>
      <Column
        dataField={"ResponsibleEmployee.Employee_Full_Name"}
        caption={"Assigned To"}
        allowSorting={false}
        hidingPriority={7}
      />
      <Column
        dataField={"Task_Start_Date"}
        caption={"Start Date"}
        dataType={"date"}
        hidingPriority={3}
      />
      <Column
        dataField={"Task_Due_Date"}
        caption={"Due Date"}
        dataType={"date"}
        hidingPriority={4}
      />
      <Column
        dataField={"Task_Priority"}
        caption={"Priority"}
        name={"Priority"}
        hidingPriority={1}
      />
      <Column
        dataField={"Task_Completion"}
        caption={"Completion"}
        hidingPriority={0}
      />
    </DataGrid>
  );
}

const dataSource = {
  store: {
    version: 2,
    type: "odata",
    key: "Task_ID",
    url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks",
  },
  expand: "ResponsibleEmployee",
  select: [
    "Task_ID",
    "Task_Subject",
    "Task_Start_Date",
    "Task_Due_Date",
    "Task_Status",
    "Task_Priority",
    "Task_Completion",
    "ResponsibleEmployee/Employee_Full_Name",
  ],
};

const priorities = [
  { name: "High", value: 4 },
  { name: "Urgent", value: 3 },
  { name: "Normal", value: 2 },
  { name: "Low", value: 1 },
];
