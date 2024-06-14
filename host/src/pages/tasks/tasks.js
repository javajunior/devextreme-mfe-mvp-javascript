import React from "react";

const TaskList = React.lazy(() => import("remote1/TaskList"));

export default function Task() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}>Tasks</h2>
      <React.Suspense fallback="Loading Button...">
        <TaskList />
      </React.Suspense>
    </React.Fragment>
  );
}
