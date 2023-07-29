import "./App.css";
import PaymentBrick from "./components/PaymentBrick";
import StatusScreenBrick from "./components/StatusScreenBrick";
import WalletBrick from "./components/WalletBrick";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaymentBrick />} />
        <Route
          path="/screen_status/:statusId"
          element={<StatusScreenBrick />}
        />
        <Route path="/wallet" element={<WalletBrick />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
