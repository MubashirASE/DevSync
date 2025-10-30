import { Link } from "react-router-dom";



const Navbar = () => {
    return (
        <div className="flex flex-row justify-between m-6">
            <div className="text-2xl font-bold text-blue-600">
                <Link to="/" >
                    DevSync
                </Link>
            </div>

            <div className="space-x-6">
                <button className="rounded-xl bg-blue-500 text-white px-7 py-2"><Link to="/signup">
                    SignUp
                </Link></button>
                <button className="rounded-xl bg-blue-500 text-white px-7 py-2 "><Link to="/login">
                    Login
                </Link></button>




            </div>

        </div>
    )
}
export default Navbar