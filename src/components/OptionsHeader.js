import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useEffect } from 'react';
import randomColor from "randomcolor";
import { StartLogout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

import {
  openModalSearchContens,
  openModalSearchStudent,
  openModalSearchExampending,
  openModalChangePass,
  openModalSearchExamCorrected,
} from "../redux/actions/uiActions";

export const OptionsAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/")}>Perfiles</Button>
      <Button onClick={() => navigate("/careers")}>Carreras</Button>
      <Button onClick={() => navigate("/periods")}>Periodos</Button>
      <Button
        sx={{ marginLeft: "10px" }}
        variant="contained"
        onClick={() => dispatch(StartLogout())}
      >
        Cerrar Sesion
      </Button>
    </>
  );
};

export const OptionsTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/")}>Cursos</Button>
      <Button onClick={() => dispatch(openModalSearchStudent())}>
        Estudiantes
      </Button>
      <Button onClick={() => dispatch(openModalSearchContens())}>
        Contenido
      </Button>
      <Button onClick={() => dispatch(openModalSearchExampending())}>
        Corregir
      </Button>
    
      <Button onClick={() => navigate("/instructivo")}>Instructivo</Button> 
      <Button onClick={() => dispatch(openModalChangePass())}>
        Cambiar Contraseña
      </Button>
      <Button
        sx={{ marginLeft: "10px" }}
        variant="contained"
        onClick={() => dispatch(StartLogout())}
      >
        Cerrar Sesion
      </Button>
    </>
  );
};

export const OptionsStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 



  return (
    <>

      <Button onClick={() => {
      navigate("/");
     
    }}
      >Cursos</Button>

      <Button  onClick={() => {
        
        navigate("/allDocuments")
      }}
        >Material</Button>
      <Button onClick={() => navigate("/allExams")}>Evaluación</Button>
      <Button onClick={() => dispatch(openModalSearchExamCorrected())}>
        Correción
      </Button>
      <Button onClick={() => dispatch(openModalChangePass())}>
        Cambiar Contraseña
      </Button>
      <Button
        sx={{ marginLeft: "10px" }}
        variant="contained"
        onClick={() => dispatch(StartLogout())}
      >
        Cerrar Sesion
      </Button>
      
    </>
  );
};
