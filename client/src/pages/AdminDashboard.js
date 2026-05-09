import { useEffect, useState, useRef } from "react";
import API from "../api/axios";

function AdminDashboard() {
    const [news, setNews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [loading, setLoading] = useState(true);
    const formRef = useRef(null);
    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "General",
        status: "draft",
        image: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchNews();
    }, []);

    //  Fetch News
    const fetchNews = async () => {
        try {
            const res = await API.get("/news");
            setNews(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    //  Create News
    const createNews = async () => {
        try {
            await API.post("/news", form, {
                headers: token ? { Authorization: token } : {},
            });

            alert("News created");
            resetForm();
            fetchNews();
        } catch (err) {
            console.log(err);
        }
    };

    // 🔹 Update News
    const updateNews = async () => {
        try {
            await API.put(`/news/${editingId}`, form, {
                headers: token ? { Authorization: token } : {},
            });

            alert("News updated");
            resetForm();
            fetchNews();
        } catch (err) {
            console.log(err);
        }
    };

    // 🔹 Delete News
    const deleteNews = async (id) => {
        await API.delete(`/news/${id}`, {
            headers: token ? { Authorization: token } : {},
        });
        setNews(news.filter((n) => n._id !== id));
    };

    // 🔹 Edit Handler
    const handleEdit = (item) => {
        setForm({
            title: item.title,
            content: item.content,
            category: item.category,
            status: item.status,
            image: item.image,
        });
        setEditingId(item._id);
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    //  Reset Form
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
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Admin Dashboard</h2>

            {/*  Form */}
            <div ref={formRef} className="card p-4 mb-4 shadow">
                <h4>{editingId ? "Edit News" : "Add News"}</h4>

                <input
                    className="form-control mb-2"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />
                <input
                    className="form-control mb-2"
                    placeholder="Image URL (optional)"
                    value={form.image}
                    onChange={(e) =>
                        setForm({ ...form, image: e.target.value })
                    }
                />
                <textarea
                    className="form-control mb-2"
                    placeholder="Content"
                    rows="3"
                    value={form.content}
                    onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                    }
                />

                <select
                    className="form-control mb-3"
                    value={form.category}
                    onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                    }
                >
                    <option value="General">General</option>
                    <option value="Tech">Tech</option>
                    <option value="Business">Business</option>
                    <option value="Sports">Sports</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Politics">Politics</option>
                    <option value="Health">Health</option>
                </select>

                <select
                    className="form-control mb-3"
                    value={form.status}
                    onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                    }
                >
                    <option value="draft">Draft</option>
                    <option value="in-review">In Review</option>
                    <option value="published">Published</option>
                </select>

                <div className="d-flex gap-2">
                    <button
                        className={`btn ${editingId ? "btn-success" : "btn-primary"}`}
                        onClick={editingId ? updateNews : createNews}
                    >
                        {editingId ? "Update News" : "Add News"}
                    </button>

                    {editingId && (
                        <button className="btn btn-secondary" onClick={resetForm}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>
            <ul className="nav nav-tabs mb-4">

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                        onClick={() => setActiveTab("all")}
                    >
                        All
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "draft" ? "active" : ""}`}
                        onClick={() => setActiveTab("draft")}
                    >
                        Draft
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "in-review" ? "active" : ""}`}
                        onClick={() => setActiveTab("in-review")}
                    >
                        In-review
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "published" ? "active" : ""}`}
                        onClick={() => setActiveTab("published")}
                    >
                        Published
                    </button>
                </li>

            </ul>
            {loading && <div className="d-flex flex-column justify-content-center align-items-center vh-100">

                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                ></div>

                <p className="text-muted">
                    Loading news...
                </p>

            </div>}
            {/*  News List */}
            <div className="card p-4 shadow">
                <h4>All News</h4>

                {news
                    .filter((n) => {
                        if (activeTab === "all") return true;
                        return n.status === activeTab;
                    })
                    .map((n) => (
                        <div
                            key={n._id}
                            className="d-flex justify-content-between align-items-center border-bottom py-2"
                        >
                            <div>
                                <h6 className="mb-1">{n.title}</h6>
                                <small className="text-muted">
                                    {n.category} | {n.status}
                                </small>
                            </div>

                            <div className="d-flex gap-2">
                                {/* Edit only if NOT published */}
                                {n.status !== "published" && (
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleEdit(n)}
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteNews(n._id)}
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