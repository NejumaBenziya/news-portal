import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";

function Category() {
  const { name } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/news")
      .then((res) => {
        const filtered = res.data.filter(
          (n) => n.category === name && n.status === "published"
        );
        setNews(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [name]);

  return (
   
  <div className="container mt-4">

    {/* 🔙 Back Button */}
    <Link to="/" className="btn btn-outline-secondary mb-3">
      ← Back to Home
    </Link>

    {/* 📰 Title */}
    <h2 className="fw-bold mb-4 text-uppercase">
      {name} News
    </h2>

    {/* ⏳ Loading Spinner */}
    {loading ? (
      <div className="text-center mt-5">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
        ></div>

        <p className="text-muted">
          Loading latest news...
        </p>
      </div>
    ) : news.length === 0 ? (

      /* 📭 Empty State */
      <div className="text-center mt-5">
        <h5>No news found in this category</h5>
      </div>

    ) : (

      /* 📰 News Grid */
      <div className="row">
        {news.map((n) => (
          <div
            key={n._id}
            className="col-md-6 col-lg-4 mb-4 d-flex"
          >
            <NewsCard news={n} />
          </div>
        ))}
      </div>

    )}

  </div>

  );
}

export default Category;