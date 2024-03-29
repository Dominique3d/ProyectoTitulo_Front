import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LayoutModal from "../LayoutModal";
import { boxButton } from "../styles/stylesModals";

const Page = ({ isOpen, handleOnClose, handleOnDelete }) => {
  return (
    <LayoutModal
      isOpen={isOpen}
      handleOnClose={handleOnClose}
      title="¿Está seguro que desea eliminar la Carrera?"
    >
      <Box mt={4} mb={3} sx={boxButton}>
        <Button
          sx={{ color: "black",
          background: "white", marginX: "10px"}}
          variant="outlined"
          onClick={handleOnDelete}
        >
          Confirmar
        </Button>
        <Button
          sx={{color: "black",
          background: "white", marginX: "10px" }}
          variant="outlined"
          onClick={handleOnClose}
        >
          Cancelar
        </Button>
      </Box>
    </LayoutModal>
  );
};

export default Page;