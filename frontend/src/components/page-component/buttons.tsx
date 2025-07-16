import { Button } from "../ui/button"
import Link from "next/link"

export default function HeaderButtons (){

    return (
        <div className="flex justify-center mb-4 font-sans">
            <Link href="/login">
                <Button className="bg-blue-500 hover:bg-blue-600 text-gray-200 font-bold py-2 px-4 rounded cursor-pointer">
                    Login
                </Button>
            </Link>
            <Link href="/register">
                <Button className="bg-green-500 hover:bg-green-600 text-gray-200 font-bold py-2 px-4 rounded ml-2 cursor-pointer">
                    Registrar
                </Button>
            </Link>

        </div>
    )
}