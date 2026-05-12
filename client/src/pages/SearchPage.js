import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";

function SearchPage() {

  // Get search query from URL
  const { query } = useParams();

  // Store filtered news results
  const [news, setNews] = useState([]);

  // Fetch news whenever search query changes
  useEffect(() => {

    API.get("/news?status=published")

      .then((res) => {

        // Filter news by title or content
        const filtered = res.data.filter((n) =>

          n.title
            .toLowerCase()
            .includes(query.toLowerCase())

          ||

          n.content
            .toLowerCase()
            .includes(query.toLowerCase())
        );

        // Store filtered results
        setNews(filtered);
      })

      .catch((err) =>
        console.log(err)
      );

  }, [query]);

  return (

    // Main container
    <div className="container mt-4">

      {/* Page Title */}
      <h2 className="mb-4">
        Search Results for "{query}"
      </h2>

      {/* Search Results Grid */}
      <div className="row">

        {/* Render matching news cards */}
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

    </div>
  );
}

export default SearchPage;