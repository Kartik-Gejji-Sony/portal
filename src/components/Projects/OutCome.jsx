import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

export const OutCome = () => {
  const user = JSON.parse(localStorage.getItem("okta-token-storage"));
  const projectdetails = useSelector(
    (state) => state.projectReducers.projectDetails
  );
  const id = projectdetails.Id;
  const token = user?.accessToken?.accessToken;
  const [outComesUrl, setOutComesUrl] = useState([]);
  const [emptyoutComesMsg, setEmptyOutComestMsg] = useState(false);
  const [loadingOutComesUrl, setLoadingOutComesUrl] = useState(false);

  useEffect(() => {
    getData();
  }, [id, token]);
  const getData = async () => {
    setLoadingOutComesUrl(true);
    const response = await axios.get(
      `${process.env.REACT_APP_VIS_SERVICE_URL}/projects/${id}/outcome/info`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("getdata==>", response);
    if (response.status === 200) {
      setLoadingOutComesUrl(false);
      setOutComesUrl(response.data.outcomes);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } else {
      setLoadingOutComesUrl(false);
    }
    if (response.data === "Error Occured") {
      setOutComesUrl(response.data.outcomes);
      setEmptyOutComestMsg(true);
    }
  };
  // console.log('ress--', outComesUrl)

  const [teamImageUrl, setTeamImageUrl] = useState();
  const [success, setSuccess] = useState(false);
  const handleAssignTeamUrl = async () => {
    // const payload = {
    //   teams: teamImageUrl?.team
    // }
    var formData = new FormData();
    formData.append("file", teamImageUrl);
    console.log("form==>", formData);
    const result = await axios.post(
      `${process.env.REACT_APP_VIS_SERVICE_URL}/projects/${id}/outcome/info`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("upload==>", result);
    if (result.status === 200) {
      getData();
      setSuccess(true);
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="teamImageUrl/*"
        onChange={(e) => setTeamImageUrl(e.target.files[0])}
      />
      <Button variant="contained" onClick={handleAssignTeamUrl}>
        Upload
      </Button>
      {success ? (
        <span style={{ color: "green" }}>Image Uploded SuccessFully...</span>
      ) : null}
      {emptyoutComesMsg ? (
        "No image available"
      ) : (
        <div className="wrapper">
          {loadingOutComesUrl ? (
            <CircularProgress color="success" />
          ) : (
            outComesUrl?.map((item) => {
              return (
                <div className="column" key={item}>
                  <img className="img" src={item} alt="" />
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
