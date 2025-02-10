// frontend/src/components/ui/forms/CreatePostForm.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost } from "@/hooks/useCreatePost";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { useCategories } from "@/hooks/useCategories";
import Link from "next/link";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categorySelection, setCategorySelection] = useState(""); // Tracks dropdown selection
  const [newCategoryName, setNewCategoryName] = useState(""); // Holds new category name
  const {
    categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();
  const { trigger, isMutating, error, data } = useCreatePost();
  const [postCreated, setPostCreated] = useState(false);
  const [err, setErrorMsg] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // New state for image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreview(objectUrl);

      // Cleanup the object URL when component or imageFile changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null); // Clear any previous errors

    // Basic validation
    if (!title.trim() || !content.trim()) {
      setErrorMsg("Title and content are required.");
      return;
    }

    // Determine the category name to send
    const categoryName =
      categorySelection === "new" ? newCategoryName.trim() : categorySelection;

    if (categorySelection === "new" && categoryName.length === 0) {
      setErrorMsg("Please enter a valid category name.");
      return;
    }

    // Optional: Validate image type and size
    if (imageFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(imageFile.type)) {
        setErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (imageFile.size > maxSizeInBytes) {
        setErrorMsg("Image size should be less than 5 MB.");
        return;
      }
    }

    try {
      const post = await trigger({
        title,
        content,
        categoryName: categoryName,
        imageUrl: imageFile || undefined,
      });

      if (post) {
        //console.log("Post created:", post);
        setPostCreated(true); // Flag successful post creation
        setTitle(""); // Clear form fields after success
        setContent("");
        setCategorySelection("");
        setNewCategoryName("");
        setImageFile(null);
        setIsDialogOpen(true); // Open the dialog
      } else {
        setErrorMsg("Failed to create post.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-4 border rounded shadow-sm"
      >
        <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
        {err && <div className="mb-4 text-red-500">{err}</div>}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="title">
            Title:
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter post title"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="content">
            Content:
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Enter post content"
            rows={6}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="category">
            Category (optional):
          </label>
          {categoriesLoading ? (
            <p>Loading categories...</p>
          ) : categoriesError ? (
            <p className="text-red-500">Error loading categories.</p>
          ) : (
            <select
              id="category"
              value={categorySelection}
              onChange={(e) => {
                setCategorySelection(e.target.value);
                // Reset newCategoryName if user switches back to existing category
                if (e.target.value !== "new") {
                  setNewCategoryName("");
                }
              }}
              className="w-full p-2 border rounded"
            >
              <option value=""> Select a category </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              <option value="new"> Add New Category </option>
              <option value="none"> None </option>
            </select>
          )}
          {categorySelection === "new" && (
            <Input
              type="text"
              placeholder="Enter new category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mt-2"
              required
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="image">
            Upload Image (optional):
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
            className="w-full p-2 border rounded"
          />
          {imageFile && imagePreview && (
            <div className="mt-2">
              <p className="text-sm">Selected file: {imageFile.name}</p>
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-2 max-h-48"
              />
            </div>
          )}
        </div>
        <Button type="submit" disabled={isMutating}>
          {isMutating ? "Creating..." : "Create Post"}
        </Button>
      </form>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Post Created Successfully!</DialogTitle>
          <DialogDescription>
            Your post has been created successfully.
          </DialogDescription>
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={() => setIsDialogOpen(false)} variant="secondary">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
