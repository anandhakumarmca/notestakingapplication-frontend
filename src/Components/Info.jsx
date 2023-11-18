import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

export default function Info() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 3000; // 3 seconds delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const delay = 7000; // 7 seconds delay
    const timeout = setTimeout(() => {
      navigate("/register");
    }, delay);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <>
      <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0">
        <div className="col-md-7 bg-light">
          <div className="text-center p-5">
            <img src="/notes.png" alt="Your Logo" width="350" height="350" />
            <h1 className="text-main fw-bolder">Welcome to Notes App!</h1>
            <p>
              This application is a web-based platform that allows users to
              create, edit, and organize digital notes. This application
              provides a user-friendly interface for capturing ideas, reminders,
              tasks, and important information, and it offers features such as
              categorization, search, and synchronization across multiple
              devices.
            </p>
            {loading ? (
              <div className="d-flex justify-content-center">
                <Oval
                  height={30}
                  width={30}
                  color="#fff"
                  visible={true}
                  secondaryColor="#86b7fe"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            ) : (
              <p className="text-success" style={{ fontSize: "24px" }}>
                Aspire More!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
