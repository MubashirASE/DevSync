import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../contextData/contextData";



const Navbar = () => {
    const { globalData, fetchData } = useContext(MyContext);
    const navigate=useNavigate()
    const removeData = () => {
        localStorage.clear();
        navigate('/login')
        fetchData()
    }
    useEffect(() => {
        fetchData()
    },[])

    return (
        <div className="flex flex-row justify-between m-6 ">
            <div className="text-2xl font-bold text-blue-600 ms-9">
                <Link to="/" >
                    DevSync
                </Link>
            </div>
            {
                !globalData ?
                    <div className="space-x-6">
                        <Link to="/signup">
                            <button className="rounded-xl bg-blue-500 text-white px-7 py-2">
                                SignUp
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="rounded-xl bg-blue-500 text-white px-7 py-2 ">
                                Login
                            </button>
                        </Link>
                    </div>
                    :
                    <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={removeData}>
                        Logout
                    </button>

            }


        </div>
    )
}
export default Navbar