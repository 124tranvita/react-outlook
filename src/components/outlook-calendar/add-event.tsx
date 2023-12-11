import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Calendar } from "@microsoft/microsoft-graph-types";
import axios from "axios";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

const event = {
  subject: "Let's go for lunch",
  body: {
    contentType: "HTML",
    content: "Does noon work for you?",
  },
  start: {
    dateTime: "2023-12-11T19:00:00",
    timeZone: "Pacific Standard Time",
  },
  end: {
    dateTime: "2023-12-11T21:00:00",
    timeZone: "Pacific Standard Time",
  },
  location: {
    displayName: "Harry's Bar",
  },
  attendees: [
    {
      emailAddress: {
        address: "samanthab@contoso.onmicrosoft.com",
        name: "Samantha Booth",
      },
      type: "required",
    },
  ],
  allowNewTimeProposals: true,
  transactionId: "7E163156-7762-4BEB-A1C6-729EA81755A7",
};

const AddCelendarEvent: FC = () => {
  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState<Calendar>();

  console.log({ apiData });

  const accessTokenRequest = useMemo(() => {
    return {
      scopes: ["user.read", "Calendars.ReadWrite"],
      account: accounts[0],
    };
  }, [accounts]);

  useEffect(() => {
    if (!apiData && inProgress === InteractionStatus.None) {
      //
    }
  });

  const handleSubmit = useCallback(() => {
    alert(JSON.stringify(event));
    instance
      .acquireTokenSilent(accessTokenRequest)
      .then((accessTokenResponse) => {
        // Acquire token silent success
        const accessToken = accessTokenResponse.accessToken;
        // Call your API with token
        axios
          .post(
            "https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location",
            event,
            {
              method: "post",
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
              axios.post(
                "https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location",
                event,
                {
                  method: "POST",
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
  }, [instance, accessTokenRequest]);

  //   return <p>Return your protected content here: {apiData}</p>;
  return (
    <>
      <button style={{ margin: "0 12px 0 12px" }} onClick={handleSubmit}>
        Add Event
      </button>
    </>
  );
};

export default AddCelendarEvent;
