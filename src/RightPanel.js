import React from "react";
import { DEFAULTCOLOR } from "./utils.js";

export function RightPanel({ people, setCurrent }) {
  function elements() {
    let els = [];
    people.forEach((p, i) => {
      els.push(
        <Row
          key={i}
          onClick={() => setCurrent(i)}
          name={p.name}
          country={p.country}
          birthday={p.birthday.display}
        />
      );
    });
    return els;
  }

  return (
    <div
      style={{
        width: "40%",
        border: "solid 2px " + DEFAULTCOLOR,
        height: "200px",
        display: "flex",
        flexDirection: "column",
        margin: "5% 10%"
      }}
    >
      <Row name="Name" country="Country" birthday="Birthday" />
      {elements()}
    </div>
  );
}

function Row({ name, country, birthday, onClick }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "30px",
        borderBottom: "1px solid #4f4e4b",
        justifyContent: "center",
        alignItems: "center"
      }}
      onClick={onClick}
    >
      <div style={{ flex: 3 }}>{name}</div>
      <div style={{ flex: 3 }}>{country}</div>
      <div style={{ flex: 3 }}>{birthday}</div>
    </div>
  );
}
