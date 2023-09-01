"use client";

import { ChangeEvent, FormEvent, useReducer } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import ControlledRadioButtonsGroup from "../RadioElement";

interface State {
  full_name: string;
  full_name_et: string;
  nationality: string;
  gender: string;
  date_of_birth: Dayjs;
  // dateOfBirthEt: string;
  region: string;
  zone: string;
  sub_city: string;
  woreda: string;
  kebele: string;
  phone_number: string;
  phone_error: boolean;
}

type Action = {
  type: string;
  payload: string | object | boolean;
};

const reducer = (state: State, action: Action[]): State => {
  let newState = action.reduce(
    (prev: any, curr) => ({ ...prev, [curr.type]: curr.payload }),
    {}
  );
  return { ...state, ...newState };
};

export default function RegistrationForm() {
  let date = dayjs();
  let anotherDate = dayjs(
    `${date.year() - 18}-${date.month() + 1}-${date.date()}`
  );
  const [state, dispatch] = useReducer(reducer, {
    full_name: "",
    full_name_et: "",
    nationality: "Ethiopian",
    gender: "Male",
    date_of_birth: anotherDate,
    region: "",
    zone: "",
    sub_city: "",
    woreda: "",
    kebele: "",
    phone_number: "",
    phone_error: false,
  });

  const onTextType = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let patt = new RegExp(/^[a-zA-Z\s]+$/g);
    if (patt.test(e.target.value) || e.target.value == "") {
      dispatch([{ type: e.target.name, payload: e.target.value.trimStart() }]);
    }
  };

  const onTextEtType = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let patt = new RegExp(/^[\u1200-\u135a ]+$/g);
    if (patt.test(e.target.value) || e.target.value == "") {
      dispatch([{ type: e.target.name, payload: e.target.value.trimStart() }]);
    }
  };

  const onPhoneType = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let patt = new RegExp(/^\d*$/g);
    if (patt.test(e.target.value) && e.target.value.length <= 10) {
      dispatch([
        { type: "phone_error", payload: false },
        { type: e.target.name, payload: e.target.value.trimStart() },
      ]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch([{ type: e.target.name, payload: e.target.value }]);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    dispatch([
      { type: "date_error", payload: "" },
      { type: "date_of_birth", payload: dateString },
    ]);
  };

  const onTypeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    let patt = new RegExp(/^[0-9]+$/g);
    if (patt.test(e.target.value) || e.target.value == "") {
      dispatch([{ type: e.target.name, payload: e.target.value.trimStart() }]);
    }
  };

  const onSubmitClicked = (e: FormEvent) => {
    e.preventDefault();
    let patt = new RegExp(/^09\d{8}$|^07\d{8}$/g);
    if (!patt.test(state.phone_number)) {
      dispatch([{ type: "phone_error", payload: true }]);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_HOST}registerUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: state.full_name,
        full_name_et: state.full_name_et,
        nationality: state.nationality,
        gender: state.gender,
        date_of_birth: dayjs(state.date_of_birth).format("YYYY-MM-DD hh:mm:ss"),
        region: state.region,
        zone: state.zone,
        sub_city: state.sub_city,
        woreda: state.woreda,
        kebele: state.kebele,
        phone_number: state.phone_number,
      }),
    }).then((result: Response) => {
      toast.success("Successfully Registered");
      dispatch([
        { type: "full_name", payload: "" },
        { type: "full_name_et", payload: "" },
        {
          type: "date_of_birth",
          payload: dayjs(anotherDate).toDate().toString(),
        },
        { type: "region", payload: "" },
        { type: "zone", payload: "" },
        { type: "sub_city", payload: "" },
        { type: "woreda", payload: "" },
        { type: "kebele", payload: "" },
        { type: "phone_number", payload: "" },
      ]);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "30rem",
        margin: "auto",
      }}
      component={"form"}
      onSubmit={onSubmitClicked}
    >
      <ToastContainer position="bottom-left" />
      <Typography variant="h4" textAlign={"center"}>
        Registration Form
      </Typography>
      <TextField
        label="Full Name"
        name="full_name"
        value={state.full_name}
        required
        sx={{ my: "1rem", width: "30rem" }}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onTextType(e)
        }
      />
      <TextField
        label="ሙሉ ስም"
        name="full_name_et"
        value={state.full_name_et}
        required
        sx={{ width: "30rem" }}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onTextEtType(e)
        }
      />
      <ControlledRadioButtonsGroup
        title="Nationality"
        choice1="Ethiopian"
        choice2="Other"
        value={state.nationality}
        handleChange={handleChange}
      />
      <ControlledRadioButtonsGroup
        title="Gender"
        choice1="Male"
        choice2="Female"
        value={state.gender}
        handleChange={handleChange}
      />
      <TextField
        label="Phone Number"
        name="phone_number"
        required
        value={state.phone_number}
        error={state.phone_error}
        sx={{ width: "30rem", my: "0.5rem" }}
        onChange={onPhoneType}
      />
      <DatePicker
        onChange={onChange}
        placeholder="Choose Birth Date"
        defaultPickerValue={anotherDate.subtract(7, "day")}
        showToday={false}
        value={dayjs(state.date_of_birth)}
        disabledDate={(currentDate: Dayjs) => {
          return currentDate.unix() >= anotherDate.unix();
        }}
      />
      <Typography variant="h5">Address</Typography>
      <TextField
        label="Region"
        name="region"
        required
        value={state.region}
        sx={{ width: "30rem", my: "0.5rem" }}
        onChange={onTextType}
      />
      <TextField
        label="Zone"
        name="zone"
        value={state.zone}
        sx={{ width: "30rem", my: "0.5rem" }}
        onChange={onTextType}
      />
      <TextField
        label="Sub City"
        name="sub_city"
        required
        value={state.sub_city}
        sx={{ width: "30rem", my: "0.5rem" }}
        onChange={onTextType}
      />
      <TextField
        label="Woreda"
        name="woreda"
        required
        value={state.woreda}
        sx={{ width: "30rem", my: "0.5rem" }}
        onChange={onTypeNumber}
      />
      <TextField
        label="Kebele"
        name="kebele"
        required
        value={state.kebele}
        sx={{ width: "30rem", my: "0.5rem" }}
        onChange={onTypeNumber}
      />
      <Button
        type="submit"
        sx={{ display: "flex", alignSelf: "center" }}
        variant="outlined"
      >
        Register
      </Button>
    </Box>
  );
}
