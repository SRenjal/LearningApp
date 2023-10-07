import React, { useEffect, useState } from "react";
import "./App.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(1);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const response = await fetch("http://localhost:5555/courses/get");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleApply = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5555/courses/enroll/${id}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      alert(data.message);
      handleGetData();
    } catch (error) {
      console.log(error);
      if (error) {
        alert(error);
      } else if (error) {
        alert(error);
      } else {
        console.log("Error fetching data", error);
      }
    }
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleAddRating = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5555/courses/rating/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating: rating }),
        }
      );
      const data = await response.json();
      console.log(data);
      alert(data.message);
      handleGetData();
    } catch (error) {
      console.log(error);
      if (error) {
        alert(error);
      } else if (error) {
        alert(error);
      } else {
        console.log("Error fetching data", error);
      }
    }
  };

  const handleDrop = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/courses/drop/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      alert(data.message);
      handleGetData();
    } catch (error) {
      console.log(error);
      if (error) {
        alert(error);
      } else if (error) {
        alert(error);
      } else {
        console.log("Error fetching data", error);
      }
    }
  };
  return (
    <div className="home">
      <header>
        <h2>Learning App</h2>
      </header>

      <div className="cardContainer">
        {data.map((course, index) => {
          return (
            <div key={course._id} className="card">
              <ul>
                <div className="header">
                  <li>{course.courseName}</li>
                  <li>{course.courseDept} </li>
                  <li>{course.description} </li>
                  {course.isApplied && (
                    <li>
                      {!course.isRated && (
                        <li>
                          Rate:
                          <select
                            onChange={handleRating}
                            value={rating}
                            className="rating"
                            name="rating"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                          <button
                            onClick={() => handleAddRating(course._id)}
                            className="rate"
                          >
                            Add
                          </button>
                        </li>
                      )}

                      <button
                        onClick={() => handleDrop(course._id)}
                        className="drop"
                      >
                        Drop Course
                      </button>
                    </li>
                  )}
                  {!course.isApplied && (
                    <li>
                      <button
                        onClick={() => handleApply(course._id)}
                        className="btn"
                      >
                        Apply
                      </button>
                    </li>
                  )}
                </div>
                <div className="footer">
                  <li>{`${course.duration} hrs . ${course.noOfRatings} Ratings . ${course.rating}/5`}</li>
                </div>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
