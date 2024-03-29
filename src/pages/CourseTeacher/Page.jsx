import {
  Button,
  ButtonGroup,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { FiltersByDocuments } from "../../components/ContainersFiltersForTeacher";
import EmptyListParagraph from "../../components/EmptyListParagraph";
import AddIcon from "@mui/icons-material/Add";

const Page = ({
  data,
  handleSeeMaterial,
  handleDelete,
  handleCreate,
  fragmentModals,
}) => {
  const { loading } = useSelector((s) => s?.uiReducer);
  return (
    <> <List
    sx={{
    
      color:"white"

    }}
  >
  <Button a href="javascript:history.back()" color="inherit" >
               Volver Atrás
  </Button>
  </List>
      <FiltersByDocuments />
      
      <List
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          marginY: "10px",
          overflowX: "hidden",
          overflowY: "scroll",
          height: "80%",
        }}
      >
        
        {loading ? (
          <CircularProgress />
        ) : data.length === 0 ? (
          <EmptyListParagraph emptyList={"contenido"} />
        ) : (
          data.map((data) => {
            return (
              <ListItem
                key={`${data.id}-${data.name}-${data.description}`}
                sx={{
                  borderBottom: "2px solid #DFDFDF",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                <ListItemButton
                  sx={{
                    width: "70%",
                  }}
                  dense={true}
                >
                  <Typography variant="h6" component="p">
                    {data.name}
                    
                  </Typography>
                </ListItemButton>
                <ListItemButton
                  sx={{
                    width: "70%",
                  }}
                  dense={true}
                >
                  <Typography variant="h6" component="p">
                    {data.description}
                  </Typography>
                </ListItemButton>

                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button onClick={() => handleSeeMaterial(data.link)}>
                    Ver
                  </Button>
                  <Button onClick={() => handleDelete(data)}>ELIMINAR</Button>
                </ButtonGroup>
              </ListItem>
            );
          })
        )}
      </List>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => handleCreate()}
        >
          Agregar Material
        </Button>
        {fragmentModals}
      </Box>
    </>
  );
};

export default Page;
