import { Grid, Button, Avatar, FormControl, InputLabel, Input, FormLabel } from "@mui/material";

import ClientService from "../client/client.service";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const avatarStyle = {
  backgroundColor: "#4133a6",
};

export function Editar(props) {
  const navigate = useNavigate();
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState({ nome: "" });
  const { register, handleSubmit, formState: { errors } } = useForm({

  });

  useEffect(() => {
    ClientService.getById(id).then(r => {
      console.log(r.data)
      setUser(r.data)
      setLoaded(true)
    }
    )
  }, []);


  const onSubmit = data => {
    ClientService.updateById(id, data)
      .then(() => {
        props.onSuccess({ text: "Cliente editado com sucesso!", color: 'green' });
        ClientService.getAll().then(r => props.setRows(r.data))
      })
      .catch(e => {
        props.onSuccess({ text: "Erro ao editar cliente!", color: 'red' })
      });
      navigate("/")
  }


  return (
    <>
      {loaded ?
        <>
          <Avatar style={avatarStyle}></Avatar>
          <h1>Editar Cliente <strong>{user.nome} <br /></strong></h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} >
              <Grid item xs={12} md={4}>
                <FormControl fullWidth >
                  <InputLabel htmlFor="nome" >Nome</InputLabel>
                  <Input defaultValue={user.nome} {...register("nome", { required: true })} id="nome" aria-describedby="nome-helper" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.nome && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="sobrenome">Sobrenome</InputLabel>
                  <Input defaultValue={user.sobrenome} {...register("sobrenome", { required: true })} id="sobrenome" aria-describedby="sobrenome-helper" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.sobrenome && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="telefone">Telefone</InputLabel>
                  <Input defaultValue={user.telefone} {...register("telefone", { required: true })} id="telefone" aria-describedby="telefone-helper" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.telefone && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <Input defaultValue={user.email} {...register("email", { required: true })} id="email" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.email && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="data_nasc" >Data de nascimento</FormLabel>
                  <Input defaultValue={user.data_nasc} {...register("data_nasc", { required: true })} type="date" id="data_nasc" aria-describedby="data_nasc-helper" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.data_nasc && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="data-irpf">Data IRPF</FormLabel>
                  <Input defaultValue={user.data_ir} {...register("data_ir", { required: true })} type="date" id="data-irpf" aria-describedby="data-irp-helper" />
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
                    {errors.data_ir && <span>Este campo é obrigatório</span>}
                  </span>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Button size="large" component={Link} to={'/'} variant="contained" color="secondary" spacing={2} margin={2}>Voltar</Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" variant="contained" size="large" color="primary" >
                  Salvar
                </Button>
              </Grid>
            </Grid>

          </form>
        </> : ""
      }</>
  )
}