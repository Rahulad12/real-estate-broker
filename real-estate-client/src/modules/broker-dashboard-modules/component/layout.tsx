import Navbar from "./navbar";
import { Outlet } from "react-router";
// import Footer from "./footer";

const Layout= () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
};

export default Layout;