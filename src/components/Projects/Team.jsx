import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

export const Team = () => {
  const user = JSON.parse(localStorage.getItem("okta-token-storage"));
  const projectdetails = useSelector(
    (state) => state.projectReducers.projectDetails
  );
  const id = projectdetails.Id;
  const token = user?.accessToken?.accessToken;
  const [teamUrl, setTeamUrl] = useState("");
  const [emptyTeamUrlMsg, setEmptyTeamUrlMsg] = useState(false);
  const [loadingTeamUrl, setLoadingTeamUrl] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoadingTeamUrl(true);
    const response = await axios.get(
      `${process.env.REACT_APP_VIS_SERVICE_URL}/projects/${id}/team/info`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("get==", response.data.url);
    if (response.status === 200) {
      setLoadingTeamUrl(false);
      setTeamUrl(response.data.url);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } else {
      setLoadingTeamUrl(false);
    }
    if (response.data === "Error Occured") {
      setEmptyTeamUrlMsg(true);
    }
  };

  // console.log('ress--', teamUrl)

  const [teamImageUrl, setTeamImageUrl] = useState();
  const [success, setSuccess] = useState(false);
  const handleAssignTeamUrl = async () => {
    // const payload = {
    //   teams: teamImageUrl?.team
    // }
    var formData = new FormData();
    formData.append("file", teamImageUrl);
    const result = await axios.post(
      `${process.env.REACT_APP_VIS_SERVICE_URL}/projects/${id}/team/info`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    if (result.status === 200) {
      getData();
      setSuccess(true);
    }
  };

  return (
    <div style={{ marginTop: "3px" }}>
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

      {emptyTeamUrlMsg ? (
        "No image available"
      ) : (
        <div>
          {loadingTeamUrl ? (
            <CircularProgress color="success" />
          ) : (
            <img height={"800px"} width={"1024px"} alt="" src={teamUrl} />
          )}
        </div>
      )}
    </div>
  );
};
