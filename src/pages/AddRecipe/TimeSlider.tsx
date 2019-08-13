import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { Field } from "formik";

const marks = [
  {
    value: 10,
    label: "10 min"
  },
  {
    value: 30,
    label: "30 min"
  },
  {
    value: 60,
    label: "60 min"
  },
  {
    value: 90,
    label: "90 min"
  },
  {
    value: 120,
    label: "120+ min"
  }
];
function valuetext(value: number) {
  return `${value} minutter`;
}

interface InnerSliderProps {
  onChange?: ChangeEventHandler<{}>;
  onBlur?: ChangeEventHandler<{}>;
  value: number;
  name: string;
  className?: string;
}
function InnerSlider({
  onChange,
  onBlur,
  value,
  name,
  className
}: InnerSliderProps) {
  return (
    <Slider
      onChange={onChange}
      onChangeCommitted={onBlur}
      value={value}
      name={name}
      defaultValue={30}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="auto"
      step={10}
      marks={marks}
      min={10}
      max={120}
      className={className}
    />
  );
}

interface TimeSliderProps {
  className?: string;
}
const Wrapper = styled.div`
  margin: 0 2rem 1rem;
`;
function TimeSlider({ className }: TimeSliderProps) {
  return (
    <Wrapper>
      <Field component={InnerSlider} className={className} />
    </Wrapper>
  );
}

export { TimeSlider };
