import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import ProtectedRoute from "./protectedRoute";
import HomePage from "./views/home";
import DashboardPage from "./views/dashboard";
import CharacterDetailPage from "./pages/characterDetailPage";
import { FavoritesPage } from "./pages/favoritesPage";

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
        <DashboardPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ":id",
        element: <CharacterDetailPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App
