import { createBrowserRouter } from "react-router-dom";

import { ROUTE_PATHS } from "../common/path";
import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";
import { AppRoute, AuthRoute } from "./routePath";


// // Kiểu cho Props của ProtectedRoute
// interface ProtectedRouteProps {
//   element: React.ReactElement;
//   allowedRoles: number[];
//   redirectPath?: string;
// }

// // ProtectedRoute: kiểm tra quyền truy cập theo role
// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   element,
//   allowedRoles,
//   redirectPath = ROUTE_PATHS.ROOT,
// }) => {
//   const { user } = useSelector((state: RootState) => state.auth);

//   return user && allowedRoles.includes(user.role ?? USER_ROLES.ADMIN) ? (
//     element
//   ) : (
//     <Navigate to={redirectPath} replace />
//   );
// };

// Router chính
const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: <Layout />,
    errorElement: <Layout />,
    children: AppRoute,
  },
  {
    path: ROUTE_PATHS.ROOT,
    element: <AuthLayout />,
    errorElement: <Layout />,
    children: AuthRoute,
  },
//   {
//     path: ROUTE_PATHS.ROOT,
//     element: <ProtectedRoute element={<Layout />} allowedRoles={[1]} />,
//     errorElement: <Layout />,
//     children: adminRoute,
//   },
]);

export default router;
