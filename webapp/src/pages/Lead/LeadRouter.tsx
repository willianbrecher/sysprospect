import { lazy, Suspense, type FC } from "react";
import { Route, Routes } from "react-router-dom";

const LeadList = lazy(() => import("./List/LeadList"));
const LeadForm = lazy(() => import("./Form/LeadForm"));

const LeadRouter: FC = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<LeadList />}>
          <Route
            path="/detail/:id"
            element={
              <Suspense>
                <LeadForm type="detail" />
              </Suspense>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Suspense>
                <LeadForm type="edit" />
              </Suspense>
            }
          />
          <Route
            path="/new"
            element={
              <Suspense>
                <LeadForm type="new" />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default LeadRouter;
