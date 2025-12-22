import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";


function Layout(){
    return ( 
        <div style = {{width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: '    column'}}>   
            <NavBar />
            <main style={{ 
                flex: 1, 
                width: '100%' 
            }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;