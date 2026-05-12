import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function NewsCard({ news }) {

  return (

    // Main news card container
    <div className="card news-card h-100 d-flex flex-column shadow-sm border-0">

      {/* News Image */}
      {news.image && (

        <div
          className="d-flex justify-content-center align-items-center bg-light"
          style={{ height: "200px" }}
        >

          <img
            src={news.image}
            alt="news"
            className="img-fluid"
            style={{
              maxHeight: "100%",
              objectFit: "contain"
            }}
          />

        </div>
      )}

      {/* Card Body */}
      <div className="card-body d-flex flex-column">

        {/* News Title */}
        <h5 className="card-title fw-bold">
          {news.title}
        </h5>

        {/* Short News Content */}
        <p className="card-text text-muted content-box">
          {news.content}
        </p>

        {/* Footer Section */}
        <div className="mt-auto d-flex justify-content-between align-items-center">

          {/* Relative Time */}
          <small className="text-muted">

            {formatDistanceToNow(
              new Date(news.updatedAt),
              { addSuffix: true }
            ).replace("about ", "")}

          </small>

          {/* Read More Button */}
          <Link
            to={`/news/${news._id}`}
            className="btn btn-sm btn-outline-primary"
          >
            Read More →
          </Link>

        </div>

      </div>
    </div>
  );
}

export default NewsCard;