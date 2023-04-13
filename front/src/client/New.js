import {
    FormControl,
    InputLabel,
    FormHelperText,
    Input,
    Grid,
    Button,
  } from "@mui/material";

export function New() {
    return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="name">Nome</InputLabel>
            <Input id="name" aria-describedby="name-helper" />
            <FormHelperText id="name-helper">Nome:</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="surname">Sobrenome</InputLabel>
            <Input id="surname" aria-describedby="surname-helper" />
            <FormHelperText id="surname-helper">Sobrenome:</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="phone">Telefone</InputLabel>
            <Input id="phone" aria-describedby="phone-helper" />
            <FormHelperText id="phone-helper">Tel:</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="Password">E-mail</InputLabel>
            <Input id="password" aria-describedby="password-helper" />
            <FormHelperText id="email-helper">Email:</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="data-irpf">Data IRPF</InputLabel>
            <Input id="data-irp" aria-describedby="data-irp-helper" />
            <FormHelperText id="data-irp-helper">Data IRPF:</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="data-irpf">Data IRPF</InputLabel>
            <Input id="data-irp" aria-describedby="data-irp-helper" />
            <FormHelperText id="data-irp-helper">Data IRPF:</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
              Salvar
          </Button>
        </Grid>
    </Grid>
    )
    
}
