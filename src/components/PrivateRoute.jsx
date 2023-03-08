import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const PrivateRoute = (props) => {
    const { Component } = props
    const navigate = useNavigate()

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("okta-token-storage"))
        if (token?.accessToken?.accessToken === undefined) {
            navigate("/")
        }
    }, [navigate])
    return (
        <div>
            <Component />
        </div>
    )

}