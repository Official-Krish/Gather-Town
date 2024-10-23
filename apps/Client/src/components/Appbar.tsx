import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

const Appbar = () => {
    return <div className="bg-gradient-to-b from-gray-900 to-black text-white">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Link className="flex items-center justify-center" to="">
          <Gamepad2 className="h-6 w-6 text-indigo-400" />
          <span className="ml-2 text-xl font-bold">GatherClone</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" to="">Features</Link>
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" to="">Pricing</Link>
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" to="">About</Link>
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" to="">Contact</Link>
        </nav>
      </header>
    </div>
}

export default Appbar;