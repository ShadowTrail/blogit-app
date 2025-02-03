// components/ui/NewsletterSubscriptionForm.tsx

"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import emailjs from "@emailjs/browser";

const NewsletterSubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    } else if (!emailRegex.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null); // Clear previous messages

    try {
      const response = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );

      if (response.status === 200) {
        setEmail("");
        setMessage({ type: "success", text: "Subscription successful!" });
      } else {
        setMessage({
          type: "error",
          text: "Failed to subscribe. Please try again later.",
        });
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="flex space-x-2">
        <Input
          type="email"
          name="user_email" // Must match EmailJS template variable
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" disabled={isSubmitting || !email}>
          {isSubmitting ? "Subscribing..." : "Subscribe!"}
        </Button>
      </div>
      {message && (
        <p
          className={`mt-2 text-sm ${
            message.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
};

export default NewsletterSubscriptionForm;
