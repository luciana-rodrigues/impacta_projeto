import React, { useState, useEffect } from "react";
import { Toaster } from './toaster'
import { Editar } from './components/'
import { New } from './components/'
import ListClients from './components/ListClients'
import CardsTotals from './components/CardsTotals'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import ClientService from "./client/client.service";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const getData = async () => {
  const clients = await ClientService.getAll()
  return clients.data
}

const deleteUser = async (id) => {
  const clients = await ClientService.deleteById(id)
}


function App() {
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: 0 })
  const [toast, setToast] = useState(false)
  const [rows, setRows] = useState([{
    id: 0,
    sobrenome: "",
    data_nasc: "",
    telefone: "",
    email: "",
    data_ir: ""
  }]);

  const handleClickDelete = (id, nome) => {
    console.log(id)
    setDeleteDialog({ open: true, id: id, nome: nome });
  };

  const handleCloseDelete = () => {
    setDeleteDialog({...deleteDialog, open: false});
  };

  const handleDeleteUser = (id) => {
    setDeleteDialog({ open: false, id: 0 });
    deleteUser(id)
      .then(() => {
        setToast({ text: "Cliente deletado com Sucesso!", color: 'green' });
        ClientService.getAll().then(r => setRows(r.data))
      })
      .catch(e => {
        setToast({ text: "Erro ao deletar cliente!", color: 'red' })
      });
  }



  useEffect(() => {
    getData().then(
      result => setRows(result)
    )
  }, []);

  return (
    <Container>
      {toast && <Toaster text={toast.text} color={toast.color} onClose={() => setToast(false)} />}
        {deleteDialog && <Dialog
          open={deleteDialog.open}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Deletar usuário"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você está prestes a deletar o usuário <strong>{deleteDialog.nome}.</strong><br></br>
              Deseja prosseguir?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() =>handleDeleteUser(deleteDialog.id)} color="error">Deletar</Button>
            <Button onClick={handleCloseDelete} color="success" autoFocus>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>}
      <Paper
        elevation={20}
        align="center"

        sx={{
          padding: 2,
          margin: 2,
          maxWidth: 1200,
          backgroundColor: "rgba(0,0,0,0.05",
        }}
      >


        <CardsTotals rows={rows} ></CardsTotals>
        <div style={{ padding: '20px', alignContent: 'center', justifyContent: "center", display: "flex" }}>
        
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="add" element={<New onSuccess={response => setToast(response)} setRows={r => setRows(r)} />} />
            <Route path="edit/:id" element={<Editar rows={rows} onSuccess={response => setToast(response)} setRows={r => setRows(r)}/>} />
            
            <Route path="/" element={<ListClients rows={rows} handleClickDelete={(id, nome) => handleClickDelete(id, nome)} user={rows[0]}></ListClients>}>

            </Route>
          </Routes>
        </BrowserRouter>
      </Paper>
    </Container>

  );
}

export default App;


