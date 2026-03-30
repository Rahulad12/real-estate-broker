import Navbar from "./navbar";
import { Outlet } from "react-router";
// import Footer from "./footer";

const Layout= () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b border-border sticky top-0 z-40">
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