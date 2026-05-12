import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ChangePassword() {

  // React Router navigation hook
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Success / error message state
  const [message, setMessage] = useState("");

  // Get admin token from localStorage
  const token = localStorage.getItem("token");

  // Handle form submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    // Check if passwords match
    if (
      form.newPassword !==
      form.confirmPassword
    ) {

      return setMessage(
        "Passwords do not match"
      );
    }

    try {

      // Send password update request
      const res = await API.put(
        "/auth/change-password",

        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },

        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Show success message
      setMessage(res.data.message);

      // Clear form fields
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Redirect after delay
      setTimeout(() => {
        navigate("/admin");
      }, 1500);

    } catch (err) {

      // Show backend error message
      setMessage(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (

    // Main container
    <div className="container mt-5">

      {/* Card */}
      <div
        className="card shadow border-0 p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >

        {/* Page Title */}
        <h2 className="fw-bold mb-4 text-center">
          Change Password
        </h2>

        {/* Success / Error Message */}
        {message && (
          <div className="alert alert-info">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Old Password */}
          <div className="mb-3">

            <label className="form-label">
              Old Password
            </label>

            <input
              type="password"
              className="form-control"
              value={form.oldPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  oldPassword: e.target.value,
                })
              }
              required
            />

          </div>

          {/* New Password */}
          <div className="mb-3">

            <label className="form-label">
              New Password
            </label>

            <input
              type="password"
              className="form-control"
              value={form.newPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  newPassword: e.target.value,
                })
              }
              required
            />

          </div>

          {/* Confirm Password */}
          <div className="mb-4">

            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword:
                    e.target.value,
                })
              }
              required
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-dark w-100 fw-semibold"
          >
            Update Password
          </button>

        </form>
      </div>
    </div>
  );
}

export default ChangePassword;