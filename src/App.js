import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import { PokemonProvider } from "./contexts/PokemonContext";
import Homepage from "./pages/Homepage";
import PokemonPage from "./pages/PokemonPage";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <PokemonProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/pokemon/:name" element={<PokemonPage />} />
          </Routes>
        </PokemonProvider>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
