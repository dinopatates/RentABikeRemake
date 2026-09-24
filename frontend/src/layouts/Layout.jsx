import Navbar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <SiteFooter />
        </>
    );
}