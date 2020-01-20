import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import { formatDate, useFetch, INPUTWIDTH, DEFAULTCOLOR } from "./utils.js";

export function LeftPanel({
  name,
  setName,
  surname,
  setSurname,
  country,
  setCountry,
  birthday,
  setBirthday,
  people,
  setPeople,
  setCurrent,
  children
}) {
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleSurnameChange(event) {
    setSurname(event.target.value);
  }
  function handleCountryChange(event) {
    console.log("event.target.value", event.target.value);
    setCountry(event.target.value);
  }

  const handleBirthdayChange = date => {
    // console.log(
    //  "Birthday",
    //  date.getMonth(),
    //  date.getFullYear(),
    //  date.getDate()
    // );
    setBirthday(date);
  };

  function handleSubmit(event) {
    let newBirthday = {
      timestamp: birthday.getTime(),
      display: formatDate(birthday)
    };

    let isValidUser =
      name !== null &&
      name !== "" &&
      surname !== null &&
      surname !== "" &&
      country !== null &&
      country !== "" &&
      birthday !== null;

    if (isValidUser) {
      setPeople([
        ...people,
        { name: name, country: country, birthday: newBirthday }
      ]);
      setCurrent(people.length); // this works because "people" is one
      // shorter than current state if deleting was allowed this would need more attention
    } else {
      //Add Snackbar here
      console.log("User is not valid!", name, surname, country, birthday);
    }
    event.preventDefault();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        margin: "5% 10%",
        color: DEFAULTCOLOR
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "10px 0" }}>
          <TextInputField
            displayName={"Name:"}
            placeholder={"name here"}
            value={name}
            changeHandler={handleNameChange}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <TextInputField
            displayName={"Surname:"}
            placeholder={"name here"}
            value={surname}
            changeHandler={handleSurnameChange}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: DEFAULTCOLOR
            }}
          >
            Country:
            <CountryMenu country={country} onChange={handleCountryChange} />
          </label>
        </div>
        <div
          style={{
            margin: "10px 0"
          }}
        >
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "inherit"
            }}
          >
            Birthday:
            <span
              style={{
                backgroundColor: "white"
              }}
            >
              <DatePicker
                format="dd/mm/yyyy"
                value={birthday}
                onChange={handleBirthdayChange}
                yearPlaceholder="yyyy"
                monthPlaceholder="mm"
                dayPlaceholder="dd"
              />
            </span>
          </label>
        </div>
        <div style={{ display: "flex", flexFlow: "row-reverse" }}>
          <input
            type="submit"
            value="SAVE"
            style={{
              display: "block",
              width: "110px",
              height: "40px",
              backgroundColor: "inherit",
              color: DEFAULTCOLOR,
              borderColor: DEFAULTCOLOR
            }}
          />
        </div>
      </form>
      {children}
    </div>
  );
}

function TextInputField({ displayName, value, placeholder, changeHandler }) {
  return (
    <label
      style={{
        display: "flex",
        justifyContent: "space-between",
        color: DEFAULTCOLOR
      }}
    >
      {displayName}
      <input
        type="text"
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
        style={{
          width: INPUTWIDTH,
          color: DEFAULTCOLOR,
          borderColor: DEFAULTCOLOR
        }}
      />
    </label>
  );
}

function CountryMenu({ country, onChange }) {
  let { countries, isLoading, error } = useCountryList();

  let countryList = isLoading === true && error !== null ? [] : countries;

  let els = [
    <option key={"default"} disabled default={true} value={""}>
      {"Countries"}
    </option>
  ];

  countryList.forEach(e => {
    els.push(
      <option key={e.alpha3Code} value={e.name}>
        {e.name}
      </option>
    );
  });

  return (
    <select
      value={country}
      onChange={onChange}
      style={{
        width: INPUTWIDTH + 5,
        color: DEFAULTCOLOR,
        borderColor: DEFAULTCOLOR
      }}
    >
      {els}}
    </select>
  );
}

function useCountryList() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // use error for snackbar message

  let [response, err] = useFetch("https://restcountries.eu/rest/v2/all", "GET");

  useEffect(() => {
    if (isLoading && response) {
      setIsLoading(false);
    }
  }, [response, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setCountries(response);
    }
  }, [response, isLoading, error]);

  return { countries, isLoading, error };
}
