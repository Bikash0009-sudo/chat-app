function Footer() {
  return (
    <footer className="w-full bg-[#020617] text-gray-400 border-t border-gray-800 mt-10">
      
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo + About */}
        <div>
          <h2 className="text-white text-2xl font-serif font-semibold">
            ChatOn
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Connect instantly. Chat one-on-one or create rooms and start conversations effortlessly.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">Features</li>
            <li className="hover:text-white cursor-pointer transition">About</li>
            <li className="hover:text-white cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-sm">
            <span className="hover:text-white cursor-pointer transition">Instagram</span>
            <span className="hover:text-white cursor-pointer transition">Twitter</span>
            <span className="hover:text-white cursor-pointer transition">GitHub</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} ChatOn. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;