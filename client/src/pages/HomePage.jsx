import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/http-client";
// import axios from "axios";

function Home() {
  const [monster, setMonster] = useState([]);
  const navigate = useNavigate();

  const fetchMonster = async () => {
    try {
      const response = await baseURL.get("/monster", {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        // },
      });

      console.log(response.data, "<<< fetchMonster");
      setMonster(response.data.data);
    } catch (err) {
      // localStorage.removeItem("access_token");
      // navigate("/login");
      console.log(err, "<<< err fetchMonster");
    }
  };

  useEffect(() => {
    fetchMonster();
  }, []);

  const handleDetail = (id) => {
    navigate(`/monster/${id}`);
  };

  const handleAddToFavorite = (id) => {
    navigate(`/favorites/${id}`);
  };

  return (
    // <>
    //   <div className="container mt-4">
    //     <div className="mb-4">
    //       <button
    //         onClick={() => navigate("/create")}
    //         className="btn btn-primary me-2"
    //       >
    //         qwe
    //       </button>
    //       <button
    //         onClick={() => navigate("/add-user")}
    //         className="btn btn-secondary"
    //       >
    //         asd
    //       </button>
    //     </div>
    //     <h2 className="mb-4">Monster List</h2>
    //     <div className="table-responsive">
    //       <table className="table table-striped table-bordered">
    //         <thead className="table-light">
    //           <tr>
    //             <th className="number-column">No.</th>
    //             <th>Name</th>
    //             <th>Action</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {monster.map((e, i) => (
    //             <tr key={i}>
    //               <td className="number-column">{i + 1}</td>
    //               <td>{e.name}</td>
    //               <td>
    //                 <button
    //                   onClick={() => handleDetail(e.id)}
    //                   className="btn btn-success btn-sm me-2"
    //                 >
    //                   Detail
    //                 </button>
    //                 <button
    //                   onClick={() => handleAddToFavorite(e.id)}
    //                   className="btn btn-primary btn-sm me-2"
    //                 >
    //                   Add to Favorite
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </>

    <div className="container mt-4">
      <div className="mb-4">
        <button
          onClick={() => navigate("/create")}
          className="btn btn-primary me-2"
        >
          qwe
        </button>
        <button
          onClick={() => navigate("/add-user")}
          className="btn btn-secondary"
        >
          asd
        </button>
      </div>
      <h2 className="mb-4">Monster List</h2>
      <div className="row">
        {monster.map((e) => (
          <div key={e.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={e.imgUrl || "https://via.placeholder.com/150"}
                alt={e.name}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => handleDetail(e.id)}
                    className="btn btn-success btn-sm me-2"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleAddToFavorite(e.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Add to Favorite
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
