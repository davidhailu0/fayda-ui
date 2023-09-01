import { ChangeEvent } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type Props = {
  title: string;
  choice1: string;
  choice2: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function ControlledRadioButtonsGroup({
  title,
  choice1,
  choice2,
  value,
  handleChange,
}: Props) {
  return (
    <FormControl required>
      <FormLabel>{title}</FormLabel>
      <RadioGroup
        value={value}
        onChange={handleChange}
        name={title.toLowerCase()}
      >
        <FormControlLabel value={choice1} control={<Radio />} label={choice1} />
        <FormControlLabel value={choice2} control={<Radio />} label={choice2} />
      </RadioGroup>
    </FormControl>
  );
}
