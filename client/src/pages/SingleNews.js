import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function SingleNews() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/news/${id}`)
      .then(res =>{
         setNews(res.data)
        setLoading(false);})
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

 if (loading) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">

      <div
        className="spinner-border text-primary mb-3"
        role="status"
      ></div>

      <p className="text-muted">
        Loading news...
      </p>

    </div>
  );
}
if (!news) {
  return (
    <div className="text-center mt-5">
      <h4>News not found</h4>
    </div>
  );
}

  return (
    <div className="container mt-4">

      {/* Back Button */}
      <Link to="/" className="btn btn-outline-secondary mb-3">
        ← Back to Home
      </Link>

      <div className="card shadow border-0 rounded-3">

        {/* Image */}
        {news.image && (
          <div
            className="bg-light d-flex justify-content-center align-items-center"
            style={{ maxHeight: "400px" }}
          >
            <img
              src={news.image}
              alt="news"
              className="img-fluid"
              style={{ objectFit: "contain", maxHeight: "400px" }}
            />
          </div>
        )}

        <div className="card-body p-4">

          {/* Title */}
          <h2 className="fw-bold mb-3">{news.title}</h2>

          {/* Date */}
          <p className="text-muted mb-4">
            {new Date(news.updatedAt).toLocaleString()}
          </p>

          {/* Content */}
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.7",
              textAlign: "justify",
            }}
          >
            {news.content}
          </p>

        </div>
      </div>
    </div>
  );
}

export default SingleNews;