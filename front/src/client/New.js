import { Grid, Button, Paper, Avatar, TextField, Stack } from "@mui/material";
import React from "react";

const avatarStyle = {
  backgroundColor: "#4133a6",
};

export function New() {
  return (
    <Grid>
      <Paper
        elevation={20}
        align="center"
        sx={{
          padding: 2,
          margin: 2,
          minWidth: 800,
          backgroundColor: "rgba(0,0,0,0.05",
        }}
      >
        <Avatar style={avatarStyle}></Avatar>
        <h1>Cadastro de Clientes</h1>
        <form>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Nome"
              fullWidth
              required
            />

            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Sobrenome"
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Data de Nascimento"
              fullWidth
              required
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Telefone"
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="E-mail"
              fullWidth
              required
            />
          </Stack>
          <TextField
            type="email"
            variant="outlined"
            color="primary"
            label="Data IRPF"
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Cadastrar
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
