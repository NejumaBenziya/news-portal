import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  API.get("/news?status=published")
    .then((res) => {
      const sorted = res.data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      setNews(sorted);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}, []);
  if (loading) {
  return (
    <div className="text-center">
  <div className="spinner-border text-primary mb-3" role="status"></div>
  <p className="text-muted">Loading latest news...</p>
</div>
  );
}
  return (
    <div className="container mt-4">

      {/* 📰 Page Title */}
      <h2 className="fw-bold mb-4 text-center">📰 Latest News</h2>

      {/* 🔥 Hero Section */}
      {news.length > 0 && (
        <div className="card mb-4 shadow border-0 overflow-hidden">

          {/* Image */}
          {news[0].image && (
            <img
              src={news[0].image}
              className="card-img-top"
              style={{ height: "350px", objectFit: "cover" }}
              alt="hero"
            />
          )}

          {/* Body */}
          <div className="card-body d-flex flex-column">

            {/* Title */}
            <h3 className="fw-bold">{news[0].title}</h3>

            {/* Content (controlled height) */}
            <p
              className="text-muted"
              style={{
                maxHeight: "70px",
                overflow: "hidden",
              }}
            >
              {news[0].content}
            </p>

            {/* Footer */}
            <div className="mt-auto d-flex justify-content-between align-items-center">

              <small className="text-muted">
                {new Date(news[0].updatedAt).toLocaleDateString()}
              </small>

              <Link
                to={`/news/${news[0]._id}`}
                className="btn btn-sm btn-outline-primary"
              >
                Read More →
              </Link>

            </div>

          </div>
        </div>
      )}

      {/* 🧱 News Grid */}
      <div className="row">
        {news.slice(1).map((n) => (
          <div key={n._id} className="col-md-6 col-lg-4 mb-4 d-flex">
            <NewsCard news={n} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;