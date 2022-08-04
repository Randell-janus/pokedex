import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import { PokemonProvider } from "./contexts/PokemonContext";
import Homepage from "./pages/Homepage";
import PokemonPage from "./pages/PokemonPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <PokemonProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/pokemon/:name" element={<PokemonPage />} />
          </Routes>
        </PokemonProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
