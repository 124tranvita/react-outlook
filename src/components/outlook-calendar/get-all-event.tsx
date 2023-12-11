import { FC, useCallback, useEffect, useMemo, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Event } from "@microsoft/microsoft-graph-types";
import Calendar from "../calendar";
import { addHours } from "../../common/date-func";

const GetCalendarEvent: FC = () => {
  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState<
    AxiosResponse<{
      value: Event[];
    }>
  >();

  console.log({ apiData });

  const accessTokenRequest = useMemo(() => {
    return {
      scopes: ["user.read", "calendars.read", "Calendars.ReadWrite"],
      account: accounts[0],
    };
  }, [accounts]);

  const events = useMemo(() => {
    if (!apiData) return;
    return apiData.data.value.map((item: Event) => {
      const start = item.start ? addHours(item.start.dateTime, 7) : new Date();

      const end = item.end ? addHours(item.end.dateTime, 7) : new Date();
      return {
        event_id: item.id || "",
        title: item.subject || "",
        start,
        end,
      };
    });
  }, [apiData]);

  console.log({ events });

  useEffect(() => {
    if (!apiData && inProgress === InteractionStatus.None) {
      //
    }
  });

  const handleSubmit = useCallback(() => {
    instance
      .acquireTokenSilent(accessTokenRequest)
      .then((accessTokenResponse) => {
        // Acquire token silent success
        const accessToken = accessTokenResponse.accessToken;
        // Call your API with token
        axios
          .get(
            "https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // Prefer: 'outlook.timezone="Indochina Time"',
              },
            }
          )
          .then((response) => {
            setApiData(response);
          });
      })
      .catch((error) => {
        if (error instanceof InteractionRequiredAuthError) {
          instance
            .acquireTokenPopup(accessTokenRequest)
            .then(function (accessTokenResponse) {
              // Acquire token interactive success
              const accessToken = accessTokenResponse.accessToken;
              // Call your API with token
              axios.get(
                "https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location",
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    // Prefer: 'outlook.timezone="Indochina Time"',
                  },
                }
              );
            })
            .catch(function (error) {
              // Acquire token interactive failure
              console.log(error);
            });
        }
        console.log(error);
      });
  }, [accessTokenRequest, instance]);

  //   return <p>Return your protected content here: {apiData}</p>;
  return (
    <>
      <button style={{ margin: "0 12px 0 12px" }} onClick={handleSubmit}>
        Get Events
      </button>
      <Calendar events={events || []} />
    </>
  );
};

export default GetCalendarEvent;
