import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 pt-20 pb-10">
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white">TaskMaster</h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Organize your tasks, manage your team, and achieve more every day.
            A smarter way to stay productive.
          </p>


          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-white transition duration-300"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition duration-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition duration-300"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition duration-300"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-6">Product</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-6">Company</h3>
          <ul className="space-y-4">
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-6">Subscribe</h3>
          <p className="text-gray-400 mb-4">
            Get productivity tips & updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 rounded-l-lg bg-slate-700 text-white focus:outline-none"
            />
            <button className="bg-blue-600 px-5 py-3 rounded-r-lg hover:bg-blue-700 transition">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 mt-16 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TaskMaster. All rights reserved.
      </div>

    </footer>
  );
}