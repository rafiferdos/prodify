import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Main = () => {
    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Main;