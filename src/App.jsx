import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import ProtectedLayout from "./components/ProtectedLayout";
import Home from "./pages/Home";
import AppLayout from "./AppLayout";
import { MENU_ITEMS } from "./menu.config";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />

            {MENU_ITEMS.filter((item) => item.key !== "/").map((item) => (
              <Route
                key={item.key}
                path={item.key.slice(1)}
                element={item.element}
              />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
