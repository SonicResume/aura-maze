
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#090708] text-white">
      <Navbar />

      <main className="min-h-[calc(100vh-80px)]">
        {children}
      </main>

      <Footer />
    </div>
  );
}
