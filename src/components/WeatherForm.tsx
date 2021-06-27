import { ChangeEventHandler, FC, SyntheticEvent, useState } from "react";

type WeatherFormProps = {
  updateWeather: (cityName: string) => void;
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

  const formStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent:"space-between",
    height: "100px",


  };

  const baseStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent:"space-between",
    

  }

  const textStyle = {
    backgroundColor: "white",
    color: "black",
    borderRadius: "10px",
    height:"40px",
    paddingLeft:"5px",
    fontSize:"x-large",
    fontFamily:"Itim"
  };

  const buttonStyle = {
    backgroundColor: "#6A2C70",
    color:"white",
    borderRadius: "10px",
    height:"40px",
    border:"none",
    fontSize:"x-large",
    fontFamily:"Itim"
  }

  const headerStyle = {
    fontSize:"xx-large",
    marginBottom:"20px"
  }

  return (
    <div className="WeatherForm" style={baseStyle} >
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
          Update
        </button>
      </form>
    </div>
  );
};
