import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts from your backend API
    axios
      .get("http://localhost:5010/")
      .then((response) => {
        console.log("Data", response.data.data);
        setPosts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred while fetching blog posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <h1>All Notes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>No Notes available.</p>
        </div>
      )}
    </Container>
  );
};

export default Home;
