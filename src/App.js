import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PageLayout } from "./components/Layouts";
import { PokemonProvider } from "./utils/context"

import Homepage from "./pages/Homepage";
import PokemonPage from "./pages/PokemonPage";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <PokemonProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/pokemon/:name" element={<PokemonPage />} />
          </Routes>
        </PokemonProvider>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
