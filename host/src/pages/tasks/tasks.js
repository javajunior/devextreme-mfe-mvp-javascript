import React from "react";
import LoadPanel from "devextreme-react/load-panel";
import FallbackComponent from "../../FallbackComponent";
import { ErrorBoundary } from "react-error-boundary";

const TaskList = React.lazy(() => import("remote1/TaskList"));

export default function Task() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}>Tasks</h2>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <React.Suspense fallback={<LoadPanel visible={true} />}>
          <TaskList />
        </React.Suspense>
      </ErrorBoundary>
    </React.Fragment>
  );
}
