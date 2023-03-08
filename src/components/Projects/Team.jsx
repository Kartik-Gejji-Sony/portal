import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@mui/material";


export const Team = () => {
  const user = JSON.parse(localStorage.getItem("okta-token-storage"))
  const projectdetails = useSelector((state) => state.projectReducers.projectDetails)
  const id = projectdetails.Id
  const token = user?.accessToken?.accessToken
  const [teamUrl, setTeamUrl] = useState('')
  const [emptyTeamUrlMsg, setEmptyTeamUrlMsg] = useState(false)
  const [loadingTeamUrl, setLoadingTeamUrl] = useState(false)


  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setLoadingTeamUrl(true)
    const response = await axios.get(`${process.env.REACT_APP_VIS_SERVICE_URL}/projects/${id}/team/info`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    // console.log(response)
    if (response.status === 200) {
      setLoadingTeamUrl(false)
      setTeamUrl(response.data.url)
    } else {
      setLoadingTeamUrl(false)
    }
    if (response.data === 'Error Occured') {
      setEmptyTeamUrlMsg(true)
    }
  }

  // console.log('ress--', teamUrl)

  const [teamImageUrl, setTeamImageUrl] = useState()

  const handleAssignTeamUrl = async () => {
    // const payload = {
    //   teams: teamImageUrl?.team
    // }
    var formData = new FormData()
    formData.append('teamImageUrl', teamImageUrl)
    const result = await axios.post(`${process.env.REACT_APP_VIS_SERVICE_URL}/projects/${id}/team/info`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    console.log(result.data)
    if (result.status === 200) {
      getData()
    }
  }


  return (
    <div style={{ marginTop: "3px" }}>

      <input type="file" accept="teamImageUrl/*" onChange={(e) => setTeamImageUrl(e.target.files[0])} />
      <Button variant="contained" onClick={handleAssignTeamUrl}>add</Button>

      {emptyTeamUrlMsg ? "No image available" :
        <div>
          {loadingTeamUrl ? <CircularProgress color="success" /> :
            <img height={'800px'} width={'1024px'} alt="" src={teamUrl} />}
        </div>}
    </div>

  )
}