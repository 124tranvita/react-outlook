import { FC } from "react";
import GetCalendarEvent from "./get-all-event";
import AddCelendarEvent from "./add-event";

const OutlookCalendar: FC = () => {
  return (
    <>
      <GetCalendarEvent />
      <AddCelendarEvent />
    </>
  );
};

export default OutlookCalendar;
