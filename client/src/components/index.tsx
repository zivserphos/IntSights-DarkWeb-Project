/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "./styles.scss";
import Paste from "./Paste/Paste";

const HomePage = function () {
  const [pastes, setPastes] = useState<any>([]);

  useEffect(() => {
    const source = new EventSource(`http://localhost:3001/dashboard`);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("message", (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data);

      setPastes(data);
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    return () => {
      source.close();
    };
  }, []);
  return (
    <div className="home">
      <h1>Full stack web quizzes</h1>
      <Grid
        container
        direction="row"
        // justifyContent="space-between"
        spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }}
        alignItems="streach"
        style={{ height: "100%", width: "100%", minHeight: "280px" }}
      >
        {pastes.map(() => (
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Paste
            //   logoImg={quizInfo.img}
            //   subject={quizInfo.subject}
            //   description="lurem ipsum lurm ipsum"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
