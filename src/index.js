import React, { useState } from "react";
import ReactDOM from "react-dom";
import { LeftPanel } from "./LeftPanel.js";
import { RightPanel } from "./RightPanel.js";
import { Message } from "./Message.js";

function App() {
  const [people, setPeople] = useState([]);

  const [current, setCurrent] = useState(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setBirthday] = useState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "fixed",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        background: "rgba(51,51,51,0.7)"
      }}
    >
      <LeftPanel
        name={name}
        setName={setName}
        surname={surname}
        setSurname={setSurname}
        country={country}
        setCountry={setCountry}
        birthday={birthday}
        setBirthday={setBirthday}
        people={people}
        setPeople={setPeople}
        setCurrent={setCurrent}
      >
        {current !== null ? (
          <Message
            name={people[current].name}
            country={people[current].country}
            birthday={people[current].birthday.timestamp}
          />
        ) : (
          <span />
        )}
      </LeftPanel>

      <RightPanel people={people} setCurrent={setCurrent} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("container"));
