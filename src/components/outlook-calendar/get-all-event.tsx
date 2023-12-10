import { FC, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Calendar } from "@microsoft/microsoft-graph-types";

const GetCalendarEvent: FC = () => {
  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState<Calendar>();

  console.log({ apiData });

  const accessTokenRequest = useMemo(() => {
    return {
      scopes: ["user.read", "calendars.read", "Calendars.ReadWrite"],
      account: accounts[0],
    };
  }, [accounts]);

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
              },
            }
          )
          .then((response) => {
            setApiData(response as Calendar);
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
    </>
  );
};

export default GetCalendarEvent;
