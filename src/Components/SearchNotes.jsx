import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import 'toast' from 'react-toastify'
import API_URL from "../../config/global";

const SearchNotes = ({ userId, onSearchResults }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("User is not authenticated.");
        return;
      }

      setLoading(true);

      const response = await axios.get(
        `${API_URL}/note/searchNotes/${userId}?query=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Pass the search results to the parent component
      onSearchResults(response.data.data);

      setLoading(false);

      // Redirect to Home page
      navigate(`/getAllNotes/${userId}`);
    } catch (error) {
      console.error("An error occurred while searching notes:", error);
      toast.error("No Such Notes found");
      setLoading(false);
    }
  };

  return (
    <form className="search-bar-container" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="Search Notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>

      {loading && <p>Loading...</p>}
    </form>
  );
};

export default SearchNotes;
