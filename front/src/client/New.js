import { Grid, Button, Paper, Avatar, Stack, FormControl, InputLabel, Input, FormLabel } from "@mui/material";

import ClientService from "./client.service";
import { useForm } from "react-hook-form";

const avatarStyle = {
  backgroundColor: "#4133a6",
};

export function New(props) {
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  
  const onSubmit = data => {
    ClientService.insert(data)
      .then(() => {
        props.onSuccess({ text: "Cliente cadastrado com sucesso!", color: 'green'});
      })
      .catch(e => {
        props.onSuccess({ text: "Erro ao cadastrar cliente!", color: 'red'})
      });
  }

    return (
      <Grid container spacing={3}>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <FormControl>
                  <InputLabel htmlFor="nome">Nome</InputLabel>
                  <Input {...register("nome", { required: true })} id="nome" aria-describedby="nome-helper" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.nome && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>  
              </Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <FormControl>
                  <InputLabel htmlFor="sobrenome">Sobrenome</InputLabel>  
                  <Input {...register("sobrenome", { required: true })} id="sobrenome" aria-describedby="sobrenome-helper" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.sobrenome && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <FormControl>
                  <InputLabel htmlFor="telefone">Telefone</InputLabel>
                  <Input {...register("telefone", { required: true })} id="telefone" aria-describedby="telefone-helper"/>
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.telefone && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <FormControl>
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <Input {...register("email", { required: true })} id="email" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.email && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <FormControl>
                  <FormLabel htmlFor="data_nasc">Nasc.</FormLabel>
                  <Input {...register("data_nasc", { required: true })} type="date" id="data_nasc" aria-describedby="data_nasc-helper" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.data_nasc && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <FormControl>
                  <FormLabel htmlFor="data-irpf">Data IRPF</FormLabel>
                  <Input {...register("data_ir", { required: true })} type="date" id="data-irpf" aria-describedby="data-irp-helper" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.data_ir && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Stack>
              <Button type="submit" variant="contained" color="primary">
                  Salvar 
              </Button>
          </form>
        </Paper>
      </Grid>
    )
  }