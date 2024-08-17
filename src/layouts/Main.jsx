import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Main = () => {
    return (
        <div className='container mx-auto max-w-7xl w-11/12'>
            <Navbar />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;