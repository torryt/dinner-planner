import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";

function valuetext(value: number) {
  return `${value} minutter`;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface TimeSliderProps {
  onChange: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
  onBlur: (event: React.FocusEvent<HTMLSpanElement>) => void;
  value: number;
  name: string;
}
function TimeSlider(props: TimeSliderProps) {
  const { onChange, onBlur, value, name } = props;
  return (
    <>
      <Header>
        <Typography id={name}>Tilberedningstid</Typography>
        {`${value} minutter`}
      </Header>
      <Slider
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        getAriaValueText={valuetext}
        aria-labelledby={name}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={90}
      />
    </>
  );
}

export { TimeSlider };
