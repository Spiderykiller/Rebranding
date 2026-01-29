
export default function Footer() {
  return (
    <footer className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        <div>
          <h3 className="text-xl font-bold tracking-wide">
            PUMA REDESIGN
          </h3>
          <p className="text-white/60 text-sm mt-4 leading-relaxed">
            A modern reimagining of performance footwear, engineered through AI-assisted design and full-stack innovation.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="hover:text-white cursor-pointer">New Arrivals</li>
            <li className="hover:text-white cursor-pointer">Best Sellers</li>
            <li className="hover:text-white cursor-pointer">Collections</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Stay Updated</h4>
          <div className="flex gap-3 mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/40 outline-none"
            />
            <button className="px-5 py-3 bg-white text-black rounded-lg font-medium hover:scale-105 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-white/10 pt-8 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} Puma Redesign. All rights reserved.
      </div>
    </footer>
  );
}
