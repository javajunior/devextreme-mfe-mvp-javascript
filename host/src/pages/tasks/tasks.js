import React from "react";
import LoadPanel from "devextreme-react/load-panel";

const TaskList = React.lazy(() => import("remote1/TaskList"));

export default function Task() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}>Tasks</h2>
      <React.Suspense fallback={<LoadPanel visible={true} />}>
        <TaskList />
      </React.Suspense>
    </React.Fragment>
  );
}
