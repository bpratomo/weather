import { FunctionComponent } from "react";

export type Reading = {
  readingTitle: string;
  readingValue: string;
  readingUnit: string;
  readingStyle?: any;
};

type WeatherCardProps = {
  cardTitle: any;
  mainReadings?: Reading[];
  secondaryReadings?: Reading[];
};

export const WeatherCardTemplate: FunctionComponent<WeatherCardProps> = ({
  cardTitle,
  mainReadings,
  secondaryReadings,
}) => {
  const miniCardStyle = {
    backgroundColor: "#b83b5e",
    border: "solid 1px black",
    width: "48%",
    height: "200px",
    borderRadius: "30px",
    padding: "0.6em",
    boxShadow: "5px 5px black",
    marginRight: "8px",
    marginBottom: "8px",
    boxSizing: "border-box" as "border-box",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    fontSize: "xx-large",
  };

  const readingBaseStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    fontSize: "large",
    textAlign: "center" as "center",
    verticalAlign: "middle",
    width: "100%",
    height: "100%",
    borderRight: "solid 1px black",
  };

  const heroStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center" as "center",
    backgroundColor: "#f9ed69",
    border: "solid 3px black",
    width: "100%",
    height: "100%",
    borderRadius: "30px",
    boxSizing: "border-box" as "border-box",
    color: "black",
    overflow: "hidden",
    marginTop: "10px",
  };

  return (
    <section
      id="weatherCard__pressure"
      className="minicard"
      style={miniCardStyle}
    >
      <header>
        {cardTitle ? (
          cardTitle
        ) : (
          <>
            <i className="fas fa-tachometer-alt"></i> Pressure
          </>
        )}
      </header>

      {mainReadings ? (
        <div className="hero" style={heroStyle}>
          {mainReadings.map((reading) => (
            <div style={{ ...readingBaseStyle, ...reading.readingStyle }}>
              <div>{reading.readingTitle}</div>
              <div>
                {reading.readingValue} {reading.readingUnit}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      {secondaryReadings ? (
        <div className="hero" style={heroStyle}>
          {secondaryReadings.map((reading) => (
            <div
              id={reading.readingTitle}
              style={{ ...readingBaseStyle, ...reading.readingStyle }}
            >
              <div>{reading.readingTitle}</div>
              <div>
                {reading.readingValue} {reading.readingUnit}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};
