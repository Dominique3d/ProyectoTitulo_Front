import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LayoutModal from "../LayoutModal";
import { boxButton, textFields } from "../styles/stylesModals";

const Page = ({
  isOpen,
  handleOnClose,
  handleOnSubmit,
  handleInputChange,
  values,
}) => {
  return (
    <LayoutModal
      isOpen={isOpen}
      handleOnClose={handleOnClose}
      title="Editar Periodo"
    >
      {
        <form
          onSubmit={(ev) => handleOnSubmit(ev)}
          style={{ alignSelf: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginY: "20px",
            }}
          >
            <Typography
              variant="h6"
              component="h6"
              textAlign="center"
              sx={{ color: "#fff" }}
            >
              Periodo
            </Typography>
            <TextField
              required
              size="small"
              sx={textFields}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="name"
              value={values?.name}
              onChange={handleInputChange}
            />
          </Box>
          <Box mt={4} mb={3} sx={boxButton}>
          <Button
            type="submit"
            sx={{  color: "black",
            background: "white", marginX: "10px" }}
            variant="contained"
          >
            Guardar
          </Button>
          <Button
            sx={{ color: "black",
            background: "white", marginX: "10px" }}
            variant="contained"
            onClick={handleOnClose}
          >
            Cancelar
          </Button>
        </Box>
        </form>
      }
    </LayoutModal>
  );
};

export default Page;