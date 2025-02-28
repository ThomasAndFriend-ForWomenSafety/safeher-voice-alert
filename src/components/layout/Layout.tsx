
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { PageTransition } from "./PageTransition";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export function Layout() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Layout;
