import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import CircularProgress from '@mui/material/CircularProgress';

export const OutCome = () => {
    const user = JSON.parse(localStorage.getItem("okta-token-storage"))
    const projectdetails = useSelector((state) => state.projectReducers.projectDetails)
    const id = projectdetails.Id
    const token = user?.accessToken?.accessToken
    const [outComesUrl, setOutComesUrl] = useState([])
    const [emptyoutComesMsg, setEmptyOutComestMsg] = useState(false)
    const [loadingOutComesUrl, setLoadingOutComesUrl] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoadingOutComesUrl(true)
            const response = await axios.get(`${process.env.REACT_APP_VIS_SERVICE_URL}/projects/${id}/outcome/info`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            // console.log(response)
            if (response.status === 200) {
                setLoadingOutComesUrl(false)
                setOutComesUrl(response.data.outcomes)
            } else {
                setLoadingOutComesUrl(false)
            }
            if (response.data === 'Error Occured') {
                setOutComesUrl(response.data.outcomes)
                setEmptyOutComestMsg(true)
            }
        }
        getData()

    }, [id, token])
    // console.log('ress--', outComesUrl)

    return (
        <div >
            {emptyoutComesMsg ? "No image available" :
                <div className="wrapper">

                    {loadingOutComesUrl ? <CircularProgress color="success" /> :
                        outComesUrl?.map((item) => {
                            return (
                                <div className="column" key={item}>
                                    <img className="img" src={item} alt="" />
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}