import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function NewsCard({ news }) {
  return (
    <div className="card news-card h-100 d-flex flex-column shadow-sm border-0">

      {/* ✅ Image (full view, no crop) */}
      {news.image && (
        <div
          className="d-flex justify-content-center align-items-center bg-light"
          style={{ height: "200px" }}
        >
          <img
            src={news.image}
            alt="news"
            className="img-fluid"
            style={{ maxHeight: "100%", objectFit: "contain" }}
          />
        </div>
      )}

      {/* Body */}
      <div className="card-body d-flex flex-column">

        {/* Title */}
        <h5 className="card-title fw-bold">
          {news.title}
        </h5>

        {/* Content (fixed height so footer stays visible) */}
        <p className="card-text text-muted content-box">
          {news.content}
        </p>

        {/* Footer (always visible) */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {formatDistanceToNow(
              new Date(news.updatedAt),
              { addSuffix: true }
            ).replace("about ", "")}
          </small>

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