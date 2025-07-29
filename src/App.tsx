import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import ProtectedRoute from "./protectedRoute";

const HomePage = lazy(() => import("./views/home"));
const DashboardPage = lazy(() => import("./views/dashboard"));
const CharacterDetailPage = lazy(() => import("./pages/characterDetailPage"));
const FavoritesPage = lazy(() => import("./pages/favoritesPage"));

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <HomePage />,
	},
	{
	  path: "/sign-in/*",
	  element: (
		<SignIn
		  routing="path"
		  path="/sign-in"
		/>
	  ),
	},
	{
	  path: "/sign-up/*",
	  element: (
		<SignUp
		  routing="path"
		  path="/sign-up"
		/>
	  ),
	},
	{
    path: "/characters",
    element: (
      <ProtectedRoute allowedRoles={["admin", "user"]}>
		<Suspense fallback={<div>Loading...</div>}>
		  <DashboardPage />
		</Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: ":id",
        element: 
			<Suspense fallback={<div>Loading character details...</div>}>
				<CharacterDetailPage /> 
			</Suspense>,
      },
      {
        path: "favorites",
        element: 
			<Suspense fallback={<div>Loading favorites...</div>}>
				<FavoritesPage />
			</Suspense>,
      },
    ],
  },
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App
