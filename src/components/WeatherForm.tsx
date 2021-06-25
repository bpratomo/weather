import { Button, TextField } from "@material-ui/core";
import { ChangeEventHandler, FC, SyntheticEvent, useState } from "react";

type WeatherFormProps = {
  updateWeather: (cityName: string) => void;
};

export const WeatherForm: FC<WeatherFormProps> = ({ updateWeather }) => {
  const [formValue, setFormValue] = useState<string | null>("Which city?");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValue(e.currentTarget.value)
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (formValue) {
      updateWeather(formValue);
    }
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={formValue}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Update
      </Button>
    </form>
  );
};
