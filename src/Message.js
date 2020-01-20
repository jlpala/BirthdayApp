import React from "react";

export function Message({ name, country, birthday }) {
  let date = new Date(birthday);
  let currentYear = new Date().getUTCFullYear();
  let age = currentYear - date.getUTCFullYear();

  return (
    <div style={{ color: "black", background: "darkseagreen" }}>
      Hello {name} from {country}, on day {date.getDate()} of{" "}
      {date.toLocaleString("default", { month: "long" })} you will be {age}{" "}
      years old.
    </div>
  );
}
