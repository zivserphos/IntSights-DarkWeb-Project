/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "./styles.scss";
import { useRecoilState } from "recoil";
import { Notyf } from "notyf";
import Paste from "./Paste/Paste";
import NavBar from "./navbar/NavBar";
import Dashboard from "./dashbaord";
import searchInput from "../recoil/atoms";
import filterPastes from "../utils/filterPastes";
import initalStats from "../utils/initialStats";
import "notyf/notyf.min.css";

const HomePage = function () {
  const [allPastes, setAllPastes] = useState<PasteI[]>([]);
  const [filteredPastes, setFilteredPastes] = useState<PasteI[]>([]);
  const [stats, setStats] = useState<Percentage>(initalStats);
  const [inputState] = useRecoilState(searchInput);
  const notyf = new Notyf();

  useEffect(() => {
    setTimeout(
      () => setFilteredPastes(filterPastes(inputState, allPastes)),
      1500
    );
  }, [inputState, allPastes]);

  useEffect(() => {
    const source = new EventSource(`http://localhost:3001/dashboard`);

    source.addEventListener("open", () => {
      notyf.success("SSE OPENED");
    });

    source.addEventListener("message", (e) => {
      console.log(e.data);
      notyf.success("pastes has been updated");
      // const { pastes, stats }: { pastes: PasteI[]; stats: Percentage } = e;
      const updatedPastes = JSON.parse(e.data).pastes;
      const updatedStats = JSON.parse(e.data).stats;
      console.log(updatedStats);
      setStats(updatedStats);
      setAllPastes(updatedPastes);
    });

    source.addEventListener("error", () => {
      notyf.error("SSE ERROR");
    });

    return () => {
      source.close();
    };
  }, []);
  return (
    <div className="home">
      <NavBar />
      <Dashboard percentage={stats} />
      <h1>The site I would not show to my mom</h1>
      <Grid
        container
        direction="row"
        spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }}
        alignItems="streach"
        style={{ height: "100%", width: "100%", minHeight: "280px" }}
      >
        {filteredPastes.length
          ? filteredPastes.map((paste) => (
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <Paste paste={paste} />
              </Grid>
            ))
          : ""}
      </Grid>
    </div>
  );
};

export default HomePage;
