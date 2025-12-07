import "./App.css";
import { ConfigProvider, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
