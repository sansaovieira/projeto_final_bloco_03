import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import { ListarCategoria } from "./components/categorias/listacategoria/ListarCategoria";
import { FormCategoria } from "./components/categorias/formcategoria/FormCategoria";
import { DeleteCategoria } from "./components/categorias/deletecategoria/DeleteCategoria";

export const App = () => {
  return (
    <>
     <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/categorias" element={<ListarCategoria />} />
              <Route path="/cadastrarCategoria" element={<FormCategoria />} />
              <Route path="/editarCategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarCategoria/:id" element={<DeleteCategoria />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  );
};
