import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../helpers/http-client";
import Navbar from "../components/Navbar";

function Detail() {
  const [monster, setMonster] = useState({});
  const { id } = useParams();

  const fetchMonsterById = async (id) => {
    try {
      const response = await baseURL.get(`/monster/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data, "<<< fetchMonsterById");
      setMonster(response.data.data);
    } catch (err) {
      console.log(err, "<<< err fetchMonsterById");
    }
  };

  useEffect(() => {
    if (id) {
      fetchMonsterById(id);
    }
  }, [id]);

  if (!monster) {
    return null;
  }

  return (
    <div className="app">
      <Navbar />
      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-md-4">
            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={monster.imgUrl || "https://via.placeholder.com/150"}
                alt={monster.name}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div className="col-md-8">
            <div className="d-flex flex-column h-100">
              <div
                style={{
                  backgroundColor: "#000",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                <h5 className="mb-2 text-start" style={{ color: "#fff" }}>
                  Name: {monster.name}
                </h5>
                <h5 className="mb-2" style={{ color: "#fff" }}>
                  Type: {monster.type}
                </h5>
                <h5 className="mb-2" style={{ color: "#fff" }}>
                  Species: {monster.species}
                </h5>
                <h5 className="mb-2" style={{ color: "#ccc" }}>
                  Description: {monster.description}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
