import React, { useState, useEffect } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import './ProjectNames.css'
import { Button, Drawer, Grid, Stack } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from 'moment'


export const ProjectCalendar = () => {

  const user = JSON.parse(localStorage.getItem("okta-token-storage"))
  const projectData = useSelector((state) => state.projectReducers.projectDetails)

  const [events, setEvents] = useState([])
  const [startEndDate, setStartEndDate] = useState({
    startDate: "",
    endDate: ""
  })
  const [eventData, setEventData] = useState({
    type: '',
    sub_type: '',
    to: '',
    title: '',
    body_message: '',
    name: '',
    urlname: '',
    start: '',
    end: '',
    description: ''
  })
  const [isOpen, setIsOpen] = useState(false)
  const [eventHeading, setEventHeading] = useState("")




  const handleAddEvents = (info) => {
    setEventHeading("Create Events")
    setEventData("")
    setIsOpen(true)
    var offset = 5.5 * 60 * 60 * 1000;
    var utcTime = new Date(info.date);
    var istTime = new Date(utcTime.getTime() + offset);
    var startDate = istTime.toISOString().slice(0, 16);


    setEventData({
      start: startDate,
      end: null
    })
  }

  const handleEventSubmit = async () => {
    const token = user?.accessToken?.accessToken
    if (eventData.start === eventData.end) {
      // setErrorHandle(true)
    } else {
      let user_selected_event_type = eventData?.type;
      let user_selected_project_id = projectData?.Id;
      let payload;
      let response;
      if (user_selected_event_type == "PROGRAM_EVENT") {
        // debugger;
        let user_selected_local_start_datetime = eventData?.start;
        let user_selected_utc_start_datetime = moment(user_selected_local_start_datetime).utc();
        let m_user_selected_utc_start_datetime = moment(user_selected_utc_start_datetime);
        let final_start_date_utc = m_user_selected_utc_start_datetime.format("YYYY-MM-DD");
        let final_start_time_utc = m_user_selected_utc_start_datetime.format("hh:mm:ss");

        console.log("local_start_datetime:", moment(user_selected_local_start_datetime).format());
        console.log("utc_start_datetime:::", m_user_selected_utc_start_datetime.format());
        console.log("utc_start_date:::::::", final_start_date_utc);
        console.log("utc_start_time:::::::", final_start_time_utc);

        let user_selected_local_end_datetime = eventData?.end;
        let user_selected_utc_end_datetime = moment(user_selected_local_end_datetime).utc();
        let m_user_selected_utc_end_datetime = moment(user_selected_utc_end_datetime);
        let final_end_date_utc = m_user_selected_utc_end_datetime.format("YYYY-MM-DD");
        let final_end_time_utc = m_user_selected_utc_end_datetime.format("hh:mm:ss");

        console.log("local_end_datetime:", moment(user_selected_local_end_datetime).format());
        console.log("utc_end_datetime:::", m_user_selected_utc_end_datetime.format());
        console.log("utc_end_date:::::::", final_end_date_utc);
        console.log("utc_end_time:::::::", final_end_time_utc);

        let user_selected_event_sub_type = eventData?.sub_type;
        let user_selected_event_title = eventData?.title;
        let user_selected_body_message = eventData?.body_message;
        let user_selected_body_link = [
          {
            name: eventData?.name,
            url: eventData?.urlname
          }
        ]
        payload = {
          program_id: user_selected_project_id,
          type: user_selected_event_type,
          sub_type: user_selected_event_sub_type,
          title: user_selected_event_title,
          body_message: user_selected_body_message,
          body_links: user_selected_body_link,

          start_date: final_start_date_utc,
          start_time: final_start_time_utc,

          end_date: final_end_date_utc,
          end_time: final_end_time_utc,
        };
        response = await axios.post(`${process.env.REACT_APP_VIS_SERVICE_URL}/program-events/`, payload, {
          headers: {
            "Authorization": `Bearer ${token}`

          }
        });
      }
      else if (user_selected_event_type == "ASK_EVENT") {
        // debugger;
        console.log(eventData);


        let user_selected_local_start_datetime = eventData?.start;
        let user_selected_utc_start_datetime = moment(user_selected_local_start_datetime).utc();
        let m_user_selected_utc_start_datetime = moment(user_selected_utc_start_datetime);
        let final_start_date_utc = m_user_selected_utc_start_datetime.format("YYYY-MM-DD");
        let final_start_time_utc = m_user_selected_utc_start_datetime.format("hh:mm:ss");

        console.log("local_start_datetime:", moment(user_selected_local_start_datetime).format());
        console.log("utc_start_datetime:::", m_user_selected_utc_start_datetime.format());
        console.log("utc_start_date:::::::", final_start_date_utc);
        console.log("utc_start_time:::::::", final_start_time_utc);

        let user_selected_local_end_datetime = eventData?.end;
        let user_selected_utc_end_datetime = moment(user_selected_local_end_datetime).utc();
        let m_user_selected_utc_end_datetime = moment(user_selected_utc_end_datetime);
        let final_end_date_utc = m_user_selected_utc_end_datetime.format("YYYY-MM-DD");
        let final_end_time_utc = m_user_selected_utc_end_datetime.format("hh:mm:ss");

        console.log("local_end_datetime:", moment(user_selected_local_end_datetime).format());
        console.log("utc_end_datetime:::", m_user_selected_utc_end_datetime.format());
        console.log("utc_end_date:::::::", final_end_date_utc);
        console.log("utc_end_time:::::::", final_end_time_utc);

        // let user_selected_event_sub_type=eventData?.sub_type;
        let user_selected_event_title = eventData?.title;
        let user_selected_body_message = eventData?.body_message;
        let user_selected_body_link = [
          {
            name: eventData?.name,
            url: eventData?.urlname
          }
        ]
        let user_selected_event_to_address = [eventData?.to];
        payload = {
          program_id: user_selected_project_id,
          type: user_selected_event_type,
          to_address: user_selected_event_to_address,
          "from_address": "00u8fxoxicQzNAgmq5d7",
          title: user_selected_event_title,
          body_message: user_selected_body_message,
          body_links: user_selected_body_link,

          start_date: final_start_date_utc,
          start_time: final_start_time_utc,

          end_date: final_end_date_utc,
          end_time: final_end_time_utc,
        }
        response = await axios.post(`${process.env.REACT_APP_VIS_SERVICE_URL}/ask-events/`, payload, {
          headers: {
            "Authorization": `Bearer ${token}`

          }
        });
      } else {
        console.log("Unsupported Program Type")
      }
      // console.log(payload)
      // console.log(token)

      // console.log('res==>', response)
      if (response.status === 200) {
        getEventsForaProject()
        // console.log(response)
        setIsOpen(false)
        // setErrorHandle(false)
      }
    }
  }
  const handleShowEvent = (info) => {

    setEventHeading("Event Details")
    setIsOpen(true)
    // var offset = 5.5 * 60 * 60 * 1000;

    // var utcTime = new Date(info.event.start);
    // var istTime = new Date(utcTime.getTime() + offset);
    // // var options = { year: 'numeric', month: 'long', day: 'numeric' };
    // var startDate = istTime.toISOString().slice(0, 16);

    // var utcTime1 = new Date(info.event.end);
    // var istTime1 = new Date(utcTime1.getTime() + offset);
    // // var options1 = { year: 'numeric', month: 'long', day: 'numeric' };
    // var endDate = istTime1.toISOString().slice(0, 16);

    const dateString = info.event.start;
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const startDate = date.toLocaleTimeString('en-US', options);

    const dateString1 = info.event.end;
    const date1 = new Date(dateString1);
    const options1 = { year: 'numeric', month: 'long', day: 'numeric' };
    const endDate = date1.toLocaleTimeString('en-US', options1);

    setEventData({
      type: info.event.extendedProps.type,
      title: info.event.title,
      sub_type: info.event.extendedProps.sub_type,
      body_message: info.event.extendedProps.body_message,
      name: info.event.extendedProps.name,
      urlname: info.event.extendedProps.urlname,
      start: startDate,
      end: endDate,
      // description: info.event.extendedProps.description,
    })
    console.log(info)
  }

  useEffect(() => {
    if (startEndDate.startDate !== "") {
      getEventsForaProject()
    }
  }, [startEndDate])

  const token = user?.accessToken?.accessToken

  const getEventsForaProject = async () => {
    // Get Company Wide Events
    // Add to Calender
    // Get Team Events
    // Add to Calender
    // Get Program Event
    // Add to Calender
    // Get Ask Event
    // Add to Calender
    const projectId = projectData?.Id
    const start = startEndDate?.startDate
    const end = startEndDate?.endDate

    // Get Company Wide Events
    const recievedCompanyEvents = await axios.get(`${process.env.REACT_APP_VIS_SERVICE_URL}/companyevents/?startDateTime=${start}&endDateTime=${end}`, {
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




    // Get Team Events
    const recievedTeamsEvents = await axios.get(`${process.env.REACT_APP_VIS_SERVICE_URL}/teamevents/?projectId=${projectId}&startDateTime=${start}&endDateTime=${end}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const teamsEvents = (recievedTeamsEvents?.data?.map((item) => {
      return {
        type: item.type,
        title: item.name,
        start: item.start_date_time,
        end: item.end_date_time,
        description: item.description,
        color: "orange"
      }
    }))





    // Get Program Event
    const recivedProgramEvents = await axios.get(`${process.env.REACT_APP_VIS_SERVICE_URL}/program-events/?program_id=${projectId}&start_date=${start}&end_date=${end}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const programEvents = (recivedProgramEvents?.data?.map((item) => {
      return {
        type: item.type,
        sub_type: item.sub_type,
        title: item.title,
        body_message: item.body_message,
        start: `${item.start_date}T${item.start_time}`,
        end: `${item.end_date}T${item.end_time}`,
        name: item.body_links[0].name,
        urlname: item.body_links[0].url,
        description: item.description,
        // color: "#101010",
        // eventColor: '#101010',
        color: "green"
      }
    }))




    // Get Ask Event
    // https://vis-service.nicerefla.com/ask-events/?program_id=63f35b57e78b4ce7bde014e8&to_address=00u8fxoxicQzNAgmq5d7&from_address=00u8fxoxicQzNAgmq5d7&end_date=2024-01-01
    let logged_in_user_id = user.idToken.claims.sub;

    let url_ask_events = process.env.REACT_APP_VIS_SERVICE_URL + "/ask-events/" + "?program_id=" + projectId + 
      "&to_address=" + logged_in_user_id + 
      "&from_address=" + logged_in_user_id + 
      "&start_date" + start + 
      "&end_date=" + end
    let headers = {
      "Authorization": `Bearer ${token}`
    }
    debugger;
    const server_response = await axios.get(url_ask_events, {
      headers: headers
    })

    let listOfAskEvents = server_response.data;

    const askEvents = listOfAskEvents.map((each_ask_event) => {
      debugger;
      let utc_start_date = each_ask_event.start_date
      let utc_start_time = each_ask_event.start_time

      let local_start_date_time = moment(utc_start_date+"T"+utc_start_time+"Z").format()

      let utc_end_date = each_ask_event.end_date
      let utc_end_time = each_ask_event.end_time

      let local_end_date_time = moment(utc_end_date+"T"+utc_end_time+"Z").format()

      return {
        type: each_ask_event.type,
        to: each_ask_event.to,
        title: each_ask_event.title,
        body_message: each_ask_event.body_message,
        start: local_start_date_time,
        end: local_end_date_time,
        name: each_ask_event.body_links[0].name,
        urlname: each_ask_event.body_links[0].url,
        description: each_ask_event.description,
        color: "purple"
      }
    })




    // console.log("programEvents", programEvents)
    setEvents([...companyEvents, ...teamsEvents, ...programEvents, ...askEvents])

  }

  // const handleStartAndEndDate = (info) => {
  //   setStartEndDate({
  //     startDate: info?.startStr,
  //     endDate: info?.endStr
  //   })
  //   console.log("info=", info)

  // }
  const handleInitialMount = (info) => {
    // debugger;

    const start = new Date(info.view.activeStart).toLocaleString();
    const end = new Date(info.view.activeEnd).toLocaleString();

    const calender_start_date_utc = moment(info.view.activeStart.toLocaleString()).utc().format("YYYY-MM-DD");
    const calender_end_date_utc = moment(info.view.activeEnd.toLocaleString()).utc().format("YYYY-MM-DD");

    console.log("calender_start_date_utc:", calender_start_date_utc);
    console.log("calender_end_date_utc:::", calender_end_date_utc);

    setStartEndDate({
      startDate: calender_start_date_utc,
      endDate: calender_end_date_utc
    })
  }
  const [showsubType, setShowsubType] = useState("")
  // const [showaskEvent,setshowAskEvent]=useState(false)
  useEffect(() => {
    if (eventData.type === "ASK_EVENT") {
      setShowsubType("To")
    } else {
      setShowsubType("Sub Type")
    }
    // if(eventData.type=="Ask_Events"){
    //   setshowAskEvent(true)
    // }
  }, [eventData.type])

  useEffect(() => {
    getUserData()
  }, [])
  const [userList, setuserList] = useState([])
  const getUserData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_VIS_SERVICE_URL}/users`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    setuserList(response.data)
  }
  const [disableSubmit, setDisableSubmit] = useState(false)
  useEffect(() => {
    const type = eventData?.type || null
    const to = eventData?.to || null
    const sub_type = eventData?.sub_type || null
    const title = eventData?.title || null
    const body_message = eventData?.body_message || null
    const name = eventData?.name || null
    const urlname = eventData?.urlname || null
    const start = eventData?.start || null
    const end = eventData?.end || null
    setDisableSubmit((type !== null && type.length !== "") && (sub_type != null && sub_type.length !== "") && (title !== null && title.length >= 3) && (body_message !== null && body_message.length >= 3) && (name !== null && name.length >= 3) && (urlname !== null && urlname.length >= 3) && (start !== null && start.length !== "") && (end !== null && end.length !== ""))
  }, [eventData])
  console.log("disableSubmit", disableSubmit)
  return (
    <div>
      <div className="projectCalendar">

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}

          contentHeight={'77vh'}
          dateClick={handleAddEvents}
          eventClick={handleShowEvent}
          events={events}
          eventDisplay={true}
          dayMaxEvents={1}
          eventClassNames={'pointer-hover'}
          // datesSet={handleStartAndEndDate}
          viewDidMount={handleInitialMount}
          dayHeaderClassNames='dayHeader'

        />

        <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
          <Stack width={500} spacing={2} mx={2} style={{ position: 'relative', right: '10px', top: '10px' }}>
            <h4 style={{ border: '1px solid #808080', backgroundColor: '#B8B8B8' }}>{eventHeading}</h4>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <label htmlFor="">Type</label>
              </Grid>
              <Grid item xs={7}>
                <select disabled={eventHeading === "Event Details" ? true : false} style={{ width: '100%' }} value={eventData?.type} onChange={(e) => setEventData({ ...eventData, type: e.target.value })} name="" id="">
                  <option value="">Select Event</option>
                  <option value="PROGRAM_EVENT">PROGRAM_EVENT</option>
                  <option value="ASK_EVENT">ASK_EVENT</option>
                </select>
              </Grid>
              <Grid item xs={2}></Grid>

              <Grid item xs={3}>
                <label htmlFor="">{showsubType}</label>
              </Grid>
              <Grid item xs={7}>
                {
                  showsubType === "To" ?
                    <select disabled={eventHeading === "Event Details" ? true : false} style={{ width: '100%' }} value={eventData?.to} onChange={(e) => setEventData({ ...eventData, to: e.target.value })} name="" id="">
                      <option value="">Select User</option>
                      {
                        userList.map((item, i) => {
                          return (
                            <option key={item.Id} value={item.Id}>{item.FirstName}</option>

                          )
                        })
                      }
                    </select>
                    :
                    <select disabled={eventHeading === "Event Details" ? true : false} style={{ width: '100%' }} value={eventData?.sub_type} onChange={(e) => setEventData({ ...eventData, sub_type: e.target.value })} name="" id="">
                      <option value="">Select Sub Type</option>
                      <option value="MEETING">MEETING</option>
                      <option value="REPORT">REPORT</option>
                      <option value="REQUIREMENT">REQUIREMENT</option>
                      <option value="RELEASE">RELEASE</option>
                      <option value="PRODUCT_DEMO">PRODUCT_DEMO</option>
                    </select>

                }
              </Grid>

              <Grid item xs={2}></Grid>
              <Grid item xs={3}>
                <label htmlFor="">Title</label>
              </Grid>
              <Grid item xs={7}>
                <input disabled={eventHeading === "Event Details" ? true : false} placeholder='Enter Title' style={{ width: '100%' }} value={eventData?.title} onChange={(e) => setEventData({ ...eventData, title: e.target.value })} />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={3}>
                <label htmlFor="">Body</label>
              </Grid>
              <Grid item xs={7}>
                <textarea cols={25} disabled={eventHeading === "Event Details" ? true : false} placeholder='Enter Body Message' style={{ width: '100%' }} value={eventData?.body_message} onChange={(e) => setEventData({ ...eventData, body_message: e.target.value })} />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}><label htmlFor="">Body Links</label></Grid>
              <Grid item xs={0.5}></Grid>
              <Grid item xs={2.5}>
                <label htmlFor="">Name</label>
              </Grid>
              <Grid item xs={7}>
                <input disabled={eventHeading === "Event Details" ? true : false} placeholder='Enter Name' style={{ width: '100%' }} value={eventData?.name} onChange={(e) => setEventData({ ...eventData, name: e.target.value })} />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={0.5}>
              </Grid>
              <Grid item xs={2.5}>
                <label htmlFor="">url</label>
              </Grid>
              <Grid item xs={7}>
                <input disabled={eventHeading === "Event Details" ? true : false} placeholder='Enter url' style={{ width: '100%' }} value={eventData?.urlname} onChange={(e) => setEventData({ ...eventData, urlname: e.target.value })} />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={12}><br /></Grid>
              <Grid item xs={3}>
                <label htmlFor="">Start Date</label>
              </Grid>
              <Grid item xs={7}>
                <input disabled={eventHeading === "Event Details" ? true : false} style={{ width: '100%' }} value={eventData?.start} onChange={(e) => setEventData({ ...eventData, start: e.target.value })} type={eventHeading === "Event Details" ? 'text' : 'datetime-local'} />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={3}>
                <label htmlFor="">End Date</label>
              </Grid>
              <Grid item xs={7}>
                <input disabled={eventHeading === "Event Details" ? true : false} style={{ width: '100%' }} value={eventData?.end || ""} onChange={(e) => setEventData({ ...eventData, end: e.target.value })} type={eventHeading === "Event Details" ? 'text' : 'datetime-local'} />
              </Grid>
              <Grid item xs={2}></Grid>
              {/* <Grid item xs={3}>
                <label htmlFor="">Description</label>
              </Grid>
              <Grid item xs={7}>
                <textarea rows={5} name="Description" cols={25} style={{ width: '100%' }} placeholder="Enter Description"
                  value={eventData?.description} disabled={eventHeading === "Event Details" ? true : false}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                ></textarea>
              </Grid>
              <Grid item xs={2}></Grid> */}
              <Grid item xs={4}>
              </Grid>
              {eventHeading === "Event Details" ? "" :
                <Grid item xs={2}>
                  <Button disabled={!disableSubmit} variant="contained" onClick={handleEventSubmit} fullWidth>Submit</Button>
                </Grid>}
              <Grid item xs={2}>
                <Button variant="contained" fullWidth onClick={() => setIsOpen(false)}>Cancel</Button>
              </Grid>
            </Grid>
          </Stack>
        </Drawer>
      </div>
    </div>

  )
}