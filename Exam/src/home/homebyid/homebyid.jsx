import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Homebyid = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  async function getuser() {
    try {
      let response = await fetch(`https://to-dos-api.softclub.tj/api/to-dos/${id}`);
      let elem = await response.json();
      setUser(elem.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getuser();
  }, [id]);
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>{user?.name}</h1>
      <p>{user?.description}</p>

      {user?.images?.map((img) => (
        <img
          key={img.id}
          src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
          alt="User"
          width={200}
          style={{ borderRadius: "10px", margin: "10px" }}
        />
      ))}
    </div>
  );
};

export default Homebyid;
