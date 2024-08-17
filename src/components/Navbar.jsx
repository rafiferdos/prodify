import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext)
    const blankUser = 'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg'

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Prodify</a>
                </div>
                {
                    user &&
                    <div className="flex-none gap-2">
                        <div className="form-control">
                            <input type="text" placeholder="Type to search" className="input rounded-3xl input-bordered w-24 md:w-auto" />
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL || blankUser}
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li className="p-3">{user?.displayName}</li>
                                <hr />
                                <li onClick={logOut} className="my-1"><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Navbar;