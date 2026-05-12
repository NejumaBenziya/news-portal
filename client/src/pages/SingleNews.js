import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function SingleNews() {

  // Get news id from URL
  const { id } = useParams();

  // Store single news data
  const [news, setNews] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch news whenever id changes
  useEffect(() => {

    API.get(`/news/${id}`)

      .then(res => {

        // Store fetched news
        setNews(res.data);

        // Stop loading
        setLoading(false);
      })

      .catch((err) => {

        console.log(err);

        // Stop loading even if request fails
        setLoading(false);
      });

  }, [id]);

  // Loading UI
  if (loading) {

    return (

      <div className="d-flex flex-column justify-content-center align-items-center vh-100">

        {/* Spinner */}
        <div
          className="spinner-border text-primary mb-3"
          role="status"
        ></div>

        {/* Loading Text */}
        <p className="text-muted">
          Loading news...
        </p>

      </div>
    );
  }

  // News not found UI
  if (!news) {

    return (

      <div className="text-center mt-5">

        <h4>
          News not found
        </h4>

      </div>
    );
  }

  return (

    // Main container
    <div className="container mt-4">

      {/* Back Button */}
      <Link
        to="/"
        className="btn btn-outline-secondary mb-3"
      >
        ← Back to Home
      </Link>

      {/* News Card */}
      <div className="card shadow border-0 rounded-3">

        {/* News Image */}
        {news.image && (

          <div
            className="bg-light d-flex justify-content-center align-items-center"
            style={{ maxHeight: "400px" }}
          >

            <img
              src={news.image}
              alt="news"
              className="img-fluid"
              style={{
                objectFit: "contain",
                maxHeight: "400px"
              }}
            />

          </div>
        )}

        {/* News Body */}
        <div className="card-body p-4">

          {/* News Title */}
          <h2 className="fw-bold mb-3">
            {news.title}
          </h2>

          {/* Updated Date */}
          <p className="text-muted mb-4">

            {new Date(
              news.updatedAt
            ).toLocaleString()}

          </p>

          {/* News Content */}
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