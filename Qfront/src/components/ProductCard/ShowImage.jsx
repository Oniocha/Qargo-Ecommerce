import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowImage = ({ item, url, className }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fecthImage = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => {
        setImage(`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}`);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      fecthImage();
    }

    // clean up for when component unmounts
    return () => {
      isCancelled = true;
    };

    // eslint-disable-next-line
  }, []);

  const showLoading = () => {
    return (
      <div className="d-flex justify-content-center">
        <span
          className="spinner-border spinner-border-sm"
          style={{ width: "3em", height: "3em", color: "var(--main)" }}
          role="status"
          aria-hidden="true"
        >
          {" "}
        </span>
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        showLoading()
      ) : (
        <img src={image} alt={item.name} className={className} />
      )}
    </div>
  );
};

export default ShowImage;
