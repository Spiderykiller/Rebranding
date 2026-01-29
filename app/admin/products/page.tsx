"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadProducts() {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function saveProduct() {
    await fetch("/api/admin/products", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editingId }),
    });
    setForm({ name: "", price: "", image: "" });
    setEditingId(null);
    loadProducts();
  }

  async function deleteProduct(id: string) {
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    loadProducts();
  }

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10 grid gap-4 max-w-xl">
        <input
          placeholder="Product name"
          className="border p-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          className="border p-3 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Image URL"
          className="border p-3 rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button
          onClick={saveProduct}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl"
        >
          <Plus size={16} /> {editingId ? "Update" : "Add"} Product
        </button>
      </div>

      {/* Products Table */}
      <div className="grid gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl p-5 shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-black/60">${p.price}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingId(p.id);
                  setForm({ name: p.name, price: String(p.price), image: p.image });
                }}
                className="p-2 rounded hover:bg-gray-100"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => deleteProduct(p.id)}
                className="p-2 rounded hover:bg-red-50 text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
