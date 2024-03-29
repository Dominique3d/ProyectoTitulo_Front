import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {
  boxPrincipal,
  boxContainer,
  modalStyle,
  boxButton,
  titleModal,
} from "./styles/stylesModals";
import { useDispatch, useSelector } from "react-redux";
import { StartDeleteStudentFromACourse } from "../redux/actions/teacherActions";

const ModalDeleteStudentFromACourse = ({ isOpen, handleOnClose }) => {
  const { jwt } = useSelector((s) => s?.authReducer);
  const { student } = useSelector((s) => s?.teacherReducer);
  const dispatch = useDispatch();

  const handleOnDelete = () => {
    dispatch(StartDeleteStudentFromACourse(jwt, student));
    handleOnClose();
  };
  return (
    <Modal open={isOpen} onClose={handleOnClose} sx={modalStyle}>
      <Box sx={boxPrincipal}>
        <Box sx={boxContainer}>
          <IconButton
            aria-label="delete"
            size="small"
            sx={{ alignSelf: "flex-end" }}
            onClick={handleOnClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <Typography
            variant="h6"
            component="h6"
            textAlign="center"
            sx={titleModal}
          >
            ¿Está seguro que desea eliminar el Estudiante del curso?
          </Typography>
          <Box mt={4} mb={3} sx={boxButton}>
          <Button
            type="submit"
            sx={{  color: "black",
            background: "white", marginX: "10px" }}
            variant="contained"
          >
           Confirmar
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
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDeleteStudentFromACourse;
