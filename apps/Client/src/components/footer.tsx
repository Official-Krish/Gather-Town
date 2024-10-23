import { Link } from "react-router-dom";

export const Footer = () => {
    return <div className="bg-gray-900 text-white">
        <footer className="border-t border-gray-800 py-8 text-center">
        <p className="text-sm text-gray-400">© 2024 GatherClone. All rights reserved.</p>
        <nav className="mt-4 flex justify-center gap-4">
          <Link className="text-sm hover:text-indigo-400 transition-colors" to="">Terms of Service</Link>
          <Link className="text-sm hover:text-indigo-400 transition-colors" to="">Privacy Policy</Link>
          <Link className="text-sm hover:text-indigo-400 transition-colors" to="">Contact Us</Link>
        </nav>
      </footer>
    </div>
}