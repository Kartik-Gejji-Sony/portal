import React, { useEffect, useState } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { Alert, Button, Drawer, Grid, Stack } from "@mui/material";
import './MembersCalendar.css'
import { useSelector } from "react-redux"
import axios from "axios";

export const MembersCalendar = () => {
  const user = JSON.parse(localStorage.getItem("okta-token-storage"))
  const projectData = useSelector((state) => state.projectReducers.projectDetails)
  const memberData = useSelector((state) => state.projectReducers.membersDetails)
  const [eventData, setEventData] = useState({
    type: '',
    title: '',
    start: '',
    end: '',
    description: ''
  })
  const [errorHandle, setErrorHandle] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [eventHeading, setEventHeading] = useState("")
  const [startEndDate, setStartEndDate] = useState({
    startDate: "",
    endDate: ""
  })
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (startEndDate.startDate !== "") {
      getEventsForaUser()
    }
  }, [startEndDate])

  // const handleAddEvents = (info) => {
  //   setEventHeading("Add Event")
  //   setIsOpen(true)
  //   var offset = 5.5 * 60 * 60 * 1000;
  //   var utcTime = new Date(info.date);
  //   var istTime = new Date(utcTime.getTime() + offset);
  //   var startDate = istTime.toISOString().slice(0, 16);
  //   setEventData({
  //     title: "",
  //     start: startDate,
  //     end: null,
  //     description: ""
  //   })
  // }

  const handleInitialMount = (info) => {
    const start = new Date(info.view.activeStart).toISOString()
    const end = new Date(info.view.activeEnd).toISOString()
    setStartEndDate({
      startDate: start,
      endDate: end
    })
  }

  const handleStartAndEndDate = (info) => {
    setStartEndDate({
      startDate: info?.startStr,
      endDate: info?.endStr
    })
  }


  const getEventsForaUser = async () => {
    const token = user?.accessToken?.accessToken
    const id = memberData?.Id
    const projectId = projectData?.Id
    const start = startEndDate?.startDate
    const end = startEndDate?.endDate
    const recievedEventsData = await axios.get(`https://vis-service.nicerefla.com/events/?userId=${id}&startDateTime=${start}&endDateTime=${end}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const userEvents = (recievedEventsData?.data?.map((item) => {
      return {
        type: item.type,
        title: item.name,
        start: item.start_date_time,
        end: item.end_date_time,
        description: item.description
      }
    }))
    const recievedCompanyEvents = await axios.get(`https://vis-service.nicerefla.com/companyevents/?startDateTime=${start}&endDateTime=${end}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const companyEvents = (recievedCompanyEvents?.data?.map((item) => {
      return {
        type: item.type,
        title: item.name,
        start: item.start_date_time,
        end: item.end_date_time,
        description: item.description,
        color: "green"
      }
    }))
    const recievedTeamsEvents = await axios.get(`https://vis-service.nicerefla.com/teamevents/?projectId=${projectId}&startDateTime=${start}&endDateTime=${end}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const TeamsEvents = (recievedTeamsEvents?.data?.map((item) => {
      return {
        type: item.type,
        title: item.name,
        start: item.start_date_time,
        end: item.end_date_time,
        description: item.description,
        color: "orange"
      }
    }))
    setEvents([...companyEvents, ...userEvents, ...TeamsEvents])

  }

  const handleEventSubmit = async () => {
    const token = user?.accessToken?.accessToken
    if (eventData.start === eventData.end) {
      setErrorHandle(true)
    } else {
      const payload = {
        projectId: projectData?.Id,
        createdUserId: memberData?.Id,
        targetUserId: memberData?.Id,
        name: eventData?.title,
        start_date_time: eventData?.start,
        end_date_time: eventData?.end,
        description: eventData?.description
      }
      const response = await axios.post(`https://vis-service.nicerefla.com/events`, payload, {
        headers: {
          "Authorization": `Bearer ${token}`

        }
      })
      if (response.status === 200) {
        getEventsForaUser()
        console.log(response)
        setIsOpen(false)
        setErrorHandle(false)
      }
    }
  }

  const handleShowEvent = (info) => {
    setEventHeading("Event Details")
    setIsOpen(true)
    var offset = 5.5 * 60 * 60 * 1000;

    var utcTime = new Date(info.event.start);
    var istTime = new Date(utcTime.getTime() + offset);
    var startDate = istTime.toISOString().slice(0, 16);

    var utcTime1 = new Date(info.event.end);
    var istTime1 = new Date(utcTime1.getTime() + offset);
    var endDate = istTime1.toISOString().slice(0, 16);

    setEventData({
      type: info.event.extendedProps.type,
      title: info.event.title,
      start: startDate,
      end: endDate,
      description: info.event.extendedProps.description
    })
  }


  return (
    <div>
      <div className="membersCalendar">

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          contentHeight={'auto'}
          // dateClick={handleAddEvents}
          eventClick={handleShowEvent}
          events={events}
          eventDisplay={true}
          dayMaxEvents={1}
          eventClassNames={'pointer-hover'}
          datesSet={handleStartAndEndDate}
          viewDidMount={handleInitialMount}
        />
        <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
          <Stack width={400} spacing={2} mx={2} style={{ position: 'relative', right: '10px', top: '10px' }}>
            <h4 style={{ textAlign: 'center' }}>{eventHeading}</h4>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label htmlFor="">Type</label>
              </Grid>
              <Grid item xs={7}>
                <input disabled={eventHeading === "Event Details" ? true : false} style={{ width: "100%" }} value={eventData?.type} onChange={(e) => setEventData({ ...eventData, type: e.target.value })} />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <label htmlFor="">Title</label>
              </Grid>
              <Grid item xs={7}>
                <input disabled={eventHeading === "Event Details" ? true : false} style={{ width: "100%" }} value={eventData?.title} onChange={(e) => setEventData({ ...eventData, title: e.target.value })} />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <label htmlFor="">Start Date</label>
              </Grid>
              <Grid item xs={7}>
                <input disabled={eventHeading === "Event Details" ? true : false} style={{ width: "100%" }} value={eventData?.start} onChange={(e) => setEventData({ ...eventData, start: e.target.value })} type="datetime-local" />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <label htmlFor="">End Date</label>
              </Grid>
              <Grid item xs={7}>
                <input disabled={eventHeading === "Event Details" ? true : false} style={{ width: "100%" }} value={eventData?.end || ""} onChange={(e) => setEventData({ ...eventData, end: e.target.value })} type="datetime-local" />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <label htmlFor="">Discription</label>
              </Grid>
              <Grid item xs={7}>
                <textarea rows={5} cols='25' style={{ width: "100%" }}
                  value={eventData?.description} disabled={eventHeading === "Event Details" ? true : false}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                ></textarea>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}></Grid>
              {eventHeading === "Event Details" ? "" :
                <Grid item xs={4}>
                  <Button variant="contained" onClick={handleEventSubmit}>Submit</Button>
                </Grid>}
              <Grid item xs={4}></Grid>
              <Grid item >
                {errorHandle && <Alert severity="error">Enter Valid Details</Alert>}
              </Grid>
            </Grid>
          </Stack>
        </Drawer>

      </div>
    </div>
  )
}