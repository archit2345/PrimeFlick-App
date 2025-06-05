// SignupForm.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserAccount, signInAccount } from "@/lib/appwrite/api";
import { INewUser } from "@/types";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<INewUser>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ➊ Create the Appwrite user account
      const newUser = await createUserAccount(formData);
      if (!newUser) {
        throw new Error("Failed to create user");
      }

      // ➋ Sign them in immediately
      const session = await signInAccount({
        email: formData.email,
        password: formData.password,
      });
      if (!session) {
        throw new Error("Failed to sign in");
      }

      // ➌ Check auth & redirect
      //   const isLoggedIn = await checkAuthUser();
      //   if (isLoggedIn) {
      //     navigate("/");
      //   } else {
      //     throw new Error("Auth check failed");
      //   }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Please wait…" : "Sign Up"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignupForm;
