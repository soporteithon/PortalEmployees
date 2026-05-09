import { Link } from "react-router";



export const CustomLogo = () => {
    return (
        <Link to="/" className="flex items-center whitespace-nowrap">
            <span className="font-roboto font-bold text-xl whitespace-nowrap">
                <img src="/logo.png" alt="Logo" />
            </span>
        </Link>
    )
}