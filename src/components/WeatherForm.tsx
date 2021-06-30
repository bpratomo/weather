import { ChangeEventHandler, FC, SyntheticEvent, useState } from "react";

// STYLES
const formStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "space-between",
  height: "100px",
};

const baseStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "space-between",
};

const textStyle = {
  backgroundColor: "white",
  color: "black",
  borderRadius: "10px",
  height: "40px",
  paddingLeft: "5px",
  fontSize: "x-large",
  fontFamily: "Itim",
};

const buttonStyle = {
  backgroundColor: "#6A2C70",
  color: "white",
  borderRadius: "10px",
  height: "40px",
  border: "none",
  fontSize: "x-large",
  fontFamily: "Itim",
};

const headerStyle = {
  fontSize: "xx-large",
  marginBottom: "20px",
};

///Styles for Mini WeatherForm
const miniFormStyle={
  display: "flex",
  justifyContent: "space-between",
  height: "100px",
  boxSizing: "border-box" as "border-box"



}

const miniTextStyle = {
  backgroundColor: "white",
  color: "black",
  borderRadius: "10px",
  height: "40px",
  paddingLeft: "5px",
  fontFamily: "Itim",
  marginRight:"5px",
  marginLeft:"5px",
  boxSizing: "border-box" as "border-box"

};


const miniButtonStyle = {
  backgroundColor: "#6A2C70",
  color: "white",
  borderRadius: "10px",
  height: "40px",
  border: "none",
  fontFamily: "Itim",
};







// MINIWEATHERFORM
type WeatherFormProps = {
  updateWeather: (cityName: string) => void;
};

export const MiniWeatherForm: FC<WeatherFormProps> = ({ updateWeather }) => {
  const [formValue, setFormValue] =
    useState<string | undefined>("Search for more cities...");

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (formValue) {
      updateWeather(formValue);
    }
  }
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValue(e.currentTarget.value);
  };

  function clearValue() {
    setFormValue("");
  }

  return (
    <div className="WeatherForm" style={baseStyle}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        style={miniFormStyle}
      >
        <input
          type="text"
          value={formValue}
          onChange={handleChange}
          onFocus={clearValue}
          style={miniTextStyle}
        />

        <button onClick={handleSubmit} style={miniButtonStyle}>
          Go
        </button>
      </form>
    </div>
  );
};

export const WeatherForm: FC<WeatherFormProps> = ({ updateWeather }) => {
  const [formValue, setFormValue] =
    useState<string | undefined>("Where do you live?");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValue(e.currentTarget.value);
  };

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (formValue) {
      updateWeather(formValue);
    }
  }

  function clearValue() {
    setFormValue("");
  }

  return (
    <div className="WeatherForm" style={baseStyle}>
      <header style={headerStyle}>Welcome to Sunrise!</header>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        style={formStyle}
      >
        <input
          type="text"
          value={formValue}
          onChange={handleChange}
          onFocus={clearValue}
          style={textStyle}
        />
        <button onClick={handleSubmit} style={buttonStyle}>
          Go
        </button>
      </form>
    </div>
  );
};
