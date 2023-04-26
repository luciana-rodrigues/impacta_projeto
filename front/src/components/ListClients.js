import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClientService from "../client/client.service";
import { useState, useEffect } from 'react';
import { set } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';


const getData = async () => {
    const clients = await ClientService.getAll()
    return clients.data
}

export default function DenseTable() {
    const [rows, setRows] = useState([{}, {}]);
    useEffect(() => {
        getData().then(
            result => setRows(result)
        )
    }, []);
    return (
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
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <TableContainer component={Paper} spacing={2}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a  table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right"><b>Nome</b></TableCell>
                                    <TableCell align="right"><b>Sobrenome</b></TableCell>
                                    <TableCell align="right"><b>Data Nasc.</b></TableCell>
                                    <TableCell align="right"><b>Telefone</b></TableCell>
                                    <TableCell align="right"><b>E-mail</b></TableCell>
                                    <TableCell align="right"><b>Data IR</b></TableCell>
                                    <TableCell align="right"><b>Editar</b></TableCell>
                                    <TableCell align="right"><b>Excluir</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.nome}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.nome}
                                        </TableCell>
                                        <TableCell align="right">{row.sobrenome}</TableCell>
                                        <TableCell align="right">{row.data_nasc}</TableCell>
                                        <TableCell align="right">{row.telefone}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.data_ir}</TableCell>
                                        <TableCell align="right">Editar</TableCell>
                                        <TableCell align="right">Excluir</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item>
                    <Button component={Link} to={'/add'} variant="contained" color="primary" spacing={2} margin={2}>Adicionar Cliente</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}