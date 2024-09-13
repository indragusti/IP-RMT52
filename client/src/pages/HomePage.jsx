import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/http-client";
import Navbar from "../components/Navbar";
import MonsterCard from "../components/Card";
// import axios from "axios";

function Home() {
  const [monsters, setMonsters] = useState([]);
  const [gemini, setGemini] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMonsters = async () => {
    try {
      const response = await baseURL.get("/monster", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response.data, "<<< fetchMonsters");
      setMonsters(response.data.data);
    } catch (err) {
      localStorage.removeItem("access_token");
      navigate("/login");
      console.log(err, "<<< err fetchMonsters");
    }
  };

  useEffect(() => {
    fetchMonsters();
  }, []);

  const handleSubmitGemini = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await baseURL.post(
        "/gemini",
        {
          question: gemini,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data, "<<< handleSubmitGemini");
      setGeminiResponse(response.data.data);
    } catch (err) {
      localStorage.removeItem("access_token");
      console.log(err, "<<< err handleSubmitGemini");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {/* GeminiAI */}
        <div className="row mb-4">
          <div className="col-md-6">
            <h3>Ask Gemini AI about Monster</h3>
            <form onSubmit={handleSubmitGemini}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="..."
                  value={gemini}
                  onChange={(e) => setGemini(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-info" disabled={loading}>
                {loading ? "Loading..." : "Ask"}
              </button>
            </form>

            {geminiResponse && (
              <div className="mt-4">
                <h4>Gemini AI Response:</h4>
                <p
                  style={{
                    textAlign: "justify",
                  }}
                >
                  {geminiResponse}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* End of GeminiAI */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/favorites")}
            className="btn btn-primary me-2"
          >
            See your favorite monsters
          </button>
        </div>
        <h2 className="mb-4">Monster List</h2>

        <div className="d-flex flex-wrap justify-content-between">
          {monsters.map((e) => (
            <MonsterCard
              key={e.id}
              monster={{
                id: e.id,
                name: e.name,
                imgUrl: e.imgUrl,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
