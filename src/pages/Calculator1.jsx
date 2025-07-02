import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const Calculator1 = () => {
  const [formValues, setFormValues] = useState({
    currentWaterLevel: "",
    permanentWaterLevel: 843,
    feetToMeter: 3.28,
    gateHeight: 30.76,
    hectometerFactor: 0.36,
    gatesOpened: "",
    acreFeetFactor: 0.1233,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "currentWaterLevel") {
      // Allow typing numbers or empty string
      if (value === "" || !isNaN(value)) {
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const round = (value) => Number(Number(value).toFixed(8));

  const calculateSteps = () => {
    const {
      currentWaterLevel,
      permanentWaterLevel,
      feetToMeter,
      gateHeight,
      hectometerFactor,
      gatesOpened,
      acreFeetFactor,
    } = formValues;

    const step1 = round(
      (currentWaterLevel - permanentWaterLevel) / feetToMeter
    );
    const step2 = round(Math.sqrt(step1));
    const step3 = round(
      step1 * step2 * gateHeight * hectometerFactor * gatesOpened
    );
    const step4 = round(step3 / acreFeetFactor);

    return { step1, step2, step3, step4 };
  };

  const { step1, step2, step3, step4 } = calculateSteps();

  const isButtonDisabled =
    !formValues.currentWaterLevel.trim() ||
    !formValues.gatesOpened.trim() ||
    Number(formValues.currentWaterLevel) < 843;

  const fields = [
    {
      label: "Current Water Level (ft)",
      name: "currentWaterLevel",
      editable: true,
    },
    {
      label: "Permanent Water Level (ft)",
      name: "permanentWaterLevel",
      editable: false,
    },
    {
      label: "Feet to Meter Conversion Factor",
      name: "feetToMeter",
      editable: false,
    },
    {
      label: "Constant Height of Gate (ft)",
      name: "gateHeight",
      editable: false,
    },
    {
      label: "Hectometer Conversion Factor",
      name: "hectometerFactor",
      editable: false,
    },
    {
      label: "Number of Radial Gates Opened",
      name: "gatesOpened",
      editable: true,
    },
    {
      label: "Acre-Feet Conversion Factor",
      name: "acreFeetFactor",
      editable: false,
    },
  ];

  return (
    <Box
      sx={{
        pt: "80px",
        minHeight: "100vh",
        backgroundImage: 'url("/tenughat-dam.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: 4,
          p: 4,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Radial Gate Calculator
        </Typography>

        <Grid container spacing={2} direction="column">
          {fields.map((field, idx) => (
            <Grid item key={idx}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type="number"
                value={formValues[field.name]}
                onChange={handleChange}
                InputProps={{
                  readOnly: !field.editable,
                }}
                InputLabelProps={
                  field.editable
                    ? { sx: { color: "#000", fontWeight: "bolder" } }
                    : {}
                }
                sx={{
                  backgroundColor: field.editable ? "#FF5722" : "#ffffff",
                  "& input": {
                    color: field.editable ? "#fff" : "#000",
                    fontSize: field.editable ? "1.2rem" : "1rem",
                    fontWeight: field.editable ? "bold" : "normal",
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 4,
            width: "50%",
            height: "56px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            mx: "auto",
            display: "block",
          }}
          disabled={isButtonDisabled}
          onClick={() => setDialogOpen(true)}
        >
          Calculate
        </Button>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          BackdropProps={{
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          }}
        >
          <DialogTitle>Calculation Result:</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              <strong>Step 1:</strong>
              {
                "\n(Current Water Level - Permanent Water Level) ÷ Feet to Meter\n"
              }
              = ({formValues.currentWaterLevel} -{" "}
              {formValues.permanentWaterLevel}) ÷ {formValues.feetToMeter}
              {"\n"}= <strong>{step1}</strong> meters
              {"\n\n"}
              <strong>Step 2:</strong>
              {"\nSquare root of Step 1 value\n"}= √({step1}){"\n"}={" "}
              <strong>{step2}</strong>
              {"\n\n"}
              <strong>Step 3:</strong>
              {
                "\nStep 1 × Step 2 × Constant Height × Hectometer Conversion × Gates Opened\n"
              }
              = {step1} × {step2} × {formValues.gateHeight} ×{" "}
              {formValues.hectometerFactor} × {formValues.gatesOpened}
              {"\n"}= <strong>{step3}</strong>
              {"\n\n"}
              <strong>Step 4:</strong>
              {"\nStep 3 ÷ Acre-Feet Conversion Factor\n"}= {step3} ÷{" "}
              {formValues.acreFeetFactor}
              {"\n"}= <strong>{step4}</strong>
            </Typography>

            <Typography
              fontSize={"1.2rem"}
              color="red"
              textAlign="center"
              mt={3}
            >
              <strong>{step4}</strong> acre-feet/hour
            </Typography>
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Calculator1;
