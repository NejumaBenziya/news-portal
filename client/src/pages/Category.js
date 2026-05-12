import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";

function Category() {

  // Get category name from URL
  const { name } = useParams();

  // Store news data
  const [news, setNews] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch category news whenever category changes
  useEffect(() => {

    API.get("/news")

      .then((res) => {

        // Filter only matching category
        // and published news
        const filtered = res.data

          .filter(
            (n) =>
              n.category === name &&
              n.status === "published"
          )

          // Sort newest first
          .sort(
            (a, b) =>
              new Date(b.updatedAt) -
              new Date(a.updatedAt)
          );

        // Store filtered news
        setNews(filtered);

        // Stop loading
        setLoading(false);
      })

      .catch((err) => {

        console.log(err);

        // Stop loading even if error occurs
        setLoading(false);
      });

  }, [name]);

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

      {/* Page Title */}
      <h2 className="fw-bold mb-4 text-uppercase">
        {name} News
      </h2>

      {/* Loading State */}
      {loading ? (

        <div className="text-center mt-5">

          {/* Spinner */}
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          ></div>

          {/* Loading Text */}
          <p className="text-muted">
            Loading latest news...
          </p>

        </div>

      ) : news.length === 0 ? (

        // Empty State
        <div className="text-center mt-5">

          <h5>
            No news found in this category
          </h5>

        </div>

      ) : (

        // News Grid
        <div className="row">

          {news.map((n) => (

            <div
              key={n._id}
              className="col-md-6 col-lg-4 mb-4 d-flex"
            >

              {/* News Card Component */}
              <NewsCard news={n} />

            </div>
          ))}

        </div>

      )}

    </div>
  );
}

export default Category;