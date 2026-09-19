"use client";

import { useState } from "react";
import { useCreateProductMutation } from "@/services/api";

export default function CreateProductPage() {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createProduct({
        title,
        price: Number(price),
        description,
        categoryId: Number(categoryId),
        images: [image],
      }).unwrap();

      console.log("Product created:", result);

      alert("Product created successfully!");

      setTitle("");
      setPrice("");
      setDescription("");
      setCategoryId("");
      setImage("");
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-5 rounded-lg bg-white p-6 shadow"
      >
        <h1 className="text-2xl font-bold">Create Product</h1>

        <div>
          <label className="mb-2 block font-medium">Product Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product name"
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Category ID</label>
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="Enter category ID"
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </main>
  );
}
