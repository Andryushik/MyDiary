import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EntryCalendar.css";
import { useDateContext } from "../hooks/useDateContext";
import { usePostsContext } from "../hooks/usePostsContext";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";

const EntryCalendar = () => {
  const [value, onChange] = useState(new Date());
  const { posts } = usePostsContext();
  const { pathname } = useLocation();
  const { date, setDate } = useDateContext();

  const handleDateChange = (value) => {
    //the value of data that passing into setDate have to be in a format (Does not mater which one!)
    //this format is YYYY-MM-DD (like in mongo)
    const formattedDate = value
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    onChange(formattedDate);
    setDate(formattedDate);
  };

  const today = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const dateString = today.toLocaleDateString("en-US", options);
  const handleCalendar = () => {
    setDate(null);
  };

  //highlight the date of posts
  if (posts) {
    const tileClassName = ({ date }) => {
      const postDates = posts.map((post) => {
        const createdAt = new Date(post.createdAt);
        createdAt.setDate(createdAt.getDate() - 1); // subtract 1 day
        return `${createdAt.getFullYear()}-${padZero(
          createdAt.getMonth() + 1
        )}-${padZero(createdAt.getDate())}`;
      });
      const dateString = date.toISOString().substr(0, 10);
      const hasPost = postDates.includes(dateString);
      return hasPost && pathname !== "/feeds" && pathname !== "/moderation"
        ? "highlight"
        : null;
    };

    // Helper function to pad zero to single digit numbers
    const padZero = (num) => {
      return num < 10 ? `0${num}` : num;
    };

    return (
      <div>
        <div className="icon-container">
          <h2>{dateString}</h2>
          {date && (
            <EventRepeatIcon
              className="event-repeat"
              titleAccess="clear date"
              onClick={handleCalendar}
              fontSize="large"
            />
          )}
        </div>

        <div className="calendar-container has-loading">
          <Calendar
            calendarClassName="my-calendar"
            onChange={handleDateChange}
            value={value}
            tileClassName={tileClassName}
            locale="en"
            maxDate={new Date()} //this line disables selecting future dates
          />
        </div>
      </div>
    );
  }
};

export default EntryCalendar;
