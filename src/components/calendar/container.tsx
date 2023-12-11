import { Scheduler } from "@aldabil/react-scheduler";
// import { EVENTS } from "./events";
import { FC } from "react";
import { CalendarEvent } from "../../common/model";

type Props = {
  events: CalendarEvent[];
};

const Calendar: FC<Props> = ({ events }) => {
  return (
    <Scheduler
      events={events}
      // week={{
      //   weekDays: [0, 1, 2, 3, 4, 5, 6],
      //   weekStartOn: 6,
      //   startHour: 0,
      //   endHour: 24,
      //   step: 30
      // }}
    />
  );
};

export default Calendar;
