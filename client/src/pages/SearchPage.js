import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";

function SearchPage() {
  const { query } = useParams();

  const [news, setNews] = useState([]);

  useEffect(() => {
    API.get("/news?status=published")
      .then((res) => {

        const filtered = res.data.filter((n) =>
          n.title.toLowerCase().includes(query.toLowerCase()) ||
          n.content.toLowerCase().includes(query.toLowerCase())
        );

        setNews(filtered);
      })
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Search Results for "{query}"
      </h2>

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

    </div>
  );
}

export default SearchPage;