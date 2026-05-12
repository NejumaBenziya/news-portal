import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";
import { formatDistanceToNow } from "date-fns";

function Home() {

  // Store all news data
  const [news, setNews] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch news when component loads
  useEffect(() => {

    API.get("/news?status=published")

      .then((res) => {

        // Sort news by latest updated date
        const sorted = res.data.sort(
          (a, b) =>
            new Date(b.updatedAt) -
            new Date(a.updatedAt)
        );

        // Store sorted news
        setNews(sorted);

        // Stop loading spinner
        setLoading(false);
      })

      .catch((err) => {

        console.log(err);

        // Stop loading even if request fails
        setLoading(false);
      });

  }, []);

  // Loading Spinner UI
  if (loading) {

    return (

      <div className="text-center">

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
    );
  }

  return (

    // Main container
    <div className="container mt-4">

      {/* Page Title */}
      <h2 className="fw-bold mb-4 text-center">
        📰 Latest News
      </h2>

      {/* Hero Section */}
      {news.length > 0 && (

        <div className="card mb-4 shadow border-0 overflow-hidden">

          {/* Hero Image */}
          {news[0].image && (

            <img
              src={news[0].image}
              className="card-img-top"
              style={{
                height: "350px",
                objectFit: "cover",
              }}
              alt="hero"
            />
          )}

          {/* Hero Body */}
          <div className="card-body d-flex flex-column">

            {/* Hero Title */}
            <h3 className="fw-bold">
              {news[0].title}
            </h3>

            {/* Hero Content */}
            <p
              className="text-muted"
              style={{
                maxHeight: "70px",
                overflow: "hidden",
              }}
            >
              {news[0].content}
            </p>

            {/* Hero Footer */}
            <div className="mt-auto d-flex justify-content-between align-items-center">

              {/* Relative Time */}
              <small className="text-muted">

                {news[0].updatedAt &&

                  formatDistanceToNow(
                    new Date(news[0].updatedAt),
                    { addSuffix: true }
                  ).replace("about ", "")
                }

              </small>

              {/* Read More Button */}
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

      {/* News Grid */}
      <div className="row">

        {/* Render all news except hero news */}
        {news.slice(1).map((n) => (

          <div
            key={n._id}
            className="col-md-6 col-lg-4 mb-4 d-flex"
          >

            {/* News Card Component */}
            <NewsCard news={n} />

          </div>
        ))}

      </div>

    </div>
  );
}

export default Home;