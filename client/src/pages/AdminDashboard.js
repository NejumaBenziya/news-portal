import { useEffect, useState, useRef } from "react";
import API from "../api/axios";

function AdminDashboard() {

    // Store all news data
    const [news, setNews] = useState([]);

    // Store editing news id
    const [editingId, setEditingId] = useState(null);

    // Store current active tab
    const [activeTab, setActiveTab] = useState("all");

    // Loading state
    const [loading, setLoading] = useState(true);

    // Reference for form scroll
    const formRef = useRef(null);

    // Form state
    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "General",
        status: "draft",
        image: "",
    });

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Fetch news when component loads
    useEffect(() => {
        fetchNews();
    }, []);

    // Fetch all news
    const fetchNews = async () => {
        try {

            const res = await API.get("/news?admin=true");

            setNews(res.data);

            setLoading(false);

        } catch (err) {

            console.log(err);

            setLoading(false);
        }
    };

    // Create news
    const createNews = async () => {
        try {

            await API.post("/news", form, {
                headers: token
                    ? { Authorization: token }
                    : {},
            });

            alert("News created");

            resetForm();

            fetchNews();

        } catch (err) {

            console.log(err);
        }
    };

    // Update news
    const updateNews = async () => {
        try {

            await API.put(
                `/news/${editingId}`,
                form,
                {
                    headers: token
                        ? { Authorization: token }
                        : {},
                }
            );

            alert("News updated");

            resetForm();

            fetchNews();

        } catch (err) {

            console.log(err);
        }
    };

    // Delete news
    const deleteNews = async (id) => {

        await API.delete(`/news/${id}`, {
            headers: token
                ? { Authorization: token }
                : {},
        });

        // Remove deleted news from UI
        setNews(
            news.filter((n) => n._id !== id)
        );
    };

    // Handle edit button
    const handleEdit = (item) => {

        // Fill form with existing news data
        setForm({
            title: item.title,
            content: item.content,
            category: item.category,
            status: item.status,
            image: item.image,
        });

        // Set editing news id
        setEditingId(item._id);

        // Scroll form into view
        formRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // Reset form
    const resetForm = () => {

        setForm({
            title: "",
            content: "",
            category: "General",
            status: "draft",
            image: "",
        });

        setEditingId(null);
    };

    return (

        // Main container
        <div className="container mt-4">

            {/* Dashboard Title */}
            <h2 className="mb-4 text-center">
                Admin Dashboard
            </h2>

            {/* News Form */}
            <div
                ref={formRef}
                className="card p-4 mb-4 shadow"
            >

                {/* Form Title */}
                <h4>
                    {editingId
                        ? "Edit News"
                        : "Add News"}
                </h4>

                {/* News Title */}
                <input
                    className="form-control mb-2"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value,
                        })
                    }
                />

                {/* Image URL */}
                <input
                    className="form-control mb-2"
                    placeholder="Image URL (optional)"
                    value={form.image}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            image: e.target.value,
                        })
                    }
                />

                {/* News Content */}
                <textarea
                    className="form-control mb-2"
                    placeholder="Content"
                    rows="3"
                    value={form.content}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            content: e.target.value,
                        })
                    }
                />

                {/* Category Select */}
                <select
                    className="form-control mb-3"
                    value={form.category}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            category: e.target.value,
                        })
                    }
                >
                    <option value="General">
                        General
                    </option>

                    <option value="Tech">
                        Tech
                    </option>

                    <option value="Business">
                        Business
                    </option>

                    <option value="Sports">
                        Sports
                    </option>

                    <option value="Entertainment">
                        Entertainment
                    </option>

                    <option value="Politics">
                        Politics
                    </option>

                    <option value="Health">
                        Health
                    </option>
                </select>

                {/* Status Select */}
                <select
                    className="form-control mb-3"
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status: e.target.value,
                        })
                    }
                >
                    <option value="draft">
                        Draft
                    </option>

                    <option value="in-review">
                        In Review
                    </option>

                    <option value="published">
                        Published
                    </option>
                </select>

                {/* Action Buttons */}
                <div className="d-flex gap-2">

                    {/* Add / Update Button */}
                    <button
                        className={`btn ${
                            editingId
                                ? "btn-success"
                                : "btn-primary"
                        }`}
                        onClick={
                            editingId
                                ? updateNews
                                : createNews
                        }
                    >
                        {editingId
                            ? "Update News"
                            : "Add News"}
                    </button>

                    {/* Cancel Button */}
                    {editingId && (
                        <button
                            className="btn btn-secondary"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}

                </div>
            </div>

            {/* News Status Tabs */}
            <ul className="nav nav-tabs mb-4">

                {/* All Tab */}
                <li className="nav-item">
                    <button
                        className={`nav-link ${
                            activeTab === "all"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("all")
                        }
                    >
                        All
                    </button>
                </li>

                {/* Draft Tab */}
                <li className="nav-item">
                    <button
                        className={`nav-link ${
                            activeTab === "draft"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("draft")
                        }
                    >
                        Draft
                    </button>
                </li>

                {/* In-review Tab */}
                <li className="nav-item">
                    <button
                        className={`nav-link ${
                            activeTab === "in-review"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("in-review")
                        }
                    >
                        In-review
                    </button>
                </li>

                {/* Published Tab */}
                <li className="nav-item">
                    <button
                        className={`nav-link ${
                            activeTab === "published"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("published")
                        }
                    >
                        Published
                    </button>
                </li>

            </ul>

            {/* Loading Spinner */}
            {loading && (

                <div className="d-flex flex-column justify-content-center align-items-center vh-100">

                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    ></div>

                    <p className="text-muted">
                        Loading news...
                    </p>

                </div>
            )}

            {/* News List */}
            <div className="card p-4 shadow">

                <h4>All News</h4>

                {news

                    // Filter based on active tab
                    .filter((n) => {

                        if (activeTab === "all")
                            return true;

                        return (
                            n.status === activeTab
                        );
                    })

                    // Render news list
                    .map((n) => (

                        <div
                            key={n._id}
                            className="d-flex justify-content-between align-items-center border-bottom py-2"
                        >

                            {/* News Info */}
                            <div>

                                <h6 className="mb-1">
                                    {n.title}
                                </h6>

                                <small className="text-muted">
                                    {n.category}
                                    {" | "}
                                    {n.status}
                                </small>

                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex gap-2">

                                {/* Edit Button */}
                                {n.status !== "published" && (
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() =>
                                            handleEdit(n)
                                        }
                                    >
                                        Edit
                                    </button>
                                )}

                                {/* Delete Button */}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        deleteNews(n._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}
            </div>
        </div>
    );
}

export default AdminDashboard;