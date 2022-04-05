import { Header } from "@/components/Header";
import "./index.scss";
import { Footer } from "@/components/Footer";
import { Main } from "@/components/Main";

export const App = () => {
  return (
    <div className="d-flex flex-column h-100 justify-content-center">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
