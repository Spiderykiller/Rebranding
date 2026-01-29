"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { useCart } from "@/context/Cardcontext";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { items } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);

  const router = useRouter();
  const user = useUser(); // now fetches user from Clerk + Strapi

  const handleProfileClick = () => {
    if (!user) return router.push("/login");
    router.push("/profile");
  };

  const handleCartClick = () => {
    if (!user) return router.push("/login");
    router.push("/cart");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/pumaicon.png"
              alt="Puma Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <Link href="/products?tag=new">New Drops</Link>
            <Link href="/products?gender=men">Men</Link>
            <Link href="/products?gender=women">Women</Link>
            <Link href="/products?tag=collabs">Collabs</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-black/5 rounded-full transition"
            >
              <Search size={20} />
            </button>

            {/* Profile Button */}
            <button
              onClick={handleProfileClick}
              className="p-2 hover:bg-black/5 rounded-full transition"
            >
              <User size={20} />
            </button>

            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              className="relative p-2 hover:bg-black/5 rounded-full transition"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-black/5 rounded-full"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-black/5 bg-white px-6 py-3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20"
              autoFocus
            />
          </div>
        )}
      </header>

  
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-[80%] bg-white p-6 flex flex-col gap-6">

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/products" onClick={() => setMenuOpen(false)}>New Drops</Link>
              <Link href="/products" onClick={() => setMenuOpen(false)}>Men</Link>
              <Link href="/products" onClick={() => setMenuOpen(false)}>Women</Link>
              <Link href="/products" onClick={() => setMenuOpen(false)}>Collabs</Link>
              <button onClick={handleCartClick} className="text-left">Cart</button>
              <button onClick={handleProfileClick} className="text-left">Profile</button>
            </nav>

            <div className="mt-auto flex gap-4">
              <Link href="/login" className="w-full text-center py-3 border rounded-xl">
                Sign In
              </Link>
              <Link href="/signup" className="w-full text-center py-3 bg-black text-white rounded-xl">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="h-20" />
    </>
  );
}


