import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function MenuHeader(){
    return(
        <aside className="m-4 flex flex-col items-center">
                {/* Mobile menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="sm:hidden">
                        <Menu className="w-7 h-7 text-gray-800" />
                    </DropdownMenuTrigger>
                        <DropdownMenuContent className="ml-5 w-40 text-gray-100 font-bold">
                            <DropdownMenuLabel className="text-center text-lg font-bold">Menu</DropdownMenuLabel>
                            <DropdownMenuItem asChild className="focus:bg-blue-500 text-white">
                                <Link href="/user">Home</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="focus:bg-blue-500">
                                <Link href="/user/systems">Sistemas</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="focus:bg-blue-500">
                                <Link href="/user/genres">Gêneros</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="focus:bg-blue-500">
                                <Link href="/user/types">Tipos</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="focus:bg-blue-500">
                                <Link href="/user/series">Séries</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="focus:bg-blue-500">
                                <Link href="/user/dashboard">Estatísticas</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Desktop menu */}
                <ul className="hidden sm:flex gap-0.5 justify-center mt-2 max-w-4xl text-gray-100">
                    <li className="hover:bg-blue-500 w-30 h-7 flex justify-center items-center rounded-2xl"><Link href="/user">Home</Link></li>
                    <li className="hover:bg-blue-500 w-30 h-7 flex justify-center items-center rounded-2xl"><Link href="/user/systems">Sistemas</Link></li>
                    <li className="hover:bg-blue-500 w-30 h-7 flex justify-center items-center rounded-2xl"><Link href="/user/genres">Gêneros</Link></li>
                    <li className="hover:bg-blue-500 w-30 h-7 flex justify-center items-center rounded-2xl"><Link href="/user/types">Tipos</Link></li>
                    <li className="hover:bg-blue-500 w-30 h-7 flex justify-center items-center rounded-2xl"><Link href="/user/series">Séries</Link></li>
                    <li className="hover:bg-blue-500 w-30 h-7 flex justify-center items-center rounded-2xl"><Link href="/user/dashboard">Estatísticas</Link></li>
                </ul>
            </aside>
    )
}