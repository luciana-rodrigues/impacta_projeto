import * as React from 'react';

import { Button, FormControl, Grid, Input, InputLabel } from '@mui/material';

import ClientService from "../client/client.service";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react'

export default function DenseTable({ rows, handleClickDelete, setRows }) {
    const [edit, toogleEdit] = useState(false)
    
    const [search, setSearch] = useState('')

    const doSearch = async () => {
        const { data: results } = await ClientService.search(search)
        setRows(results)
    }

    return (
        <>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <div style={{ display: 'flex', gap: '12px', padding: '8px', marginBottom: '24px' }}>
                        <FormControl fullWidth >
                            <InputLabel >Busca por nome e/ou sobrenome</InputLabel>
                            <Input type="search" onChange={event => setSearch(event.target.value)} value={search}  />
                        </FormControl>
                        <Button onClick={doSearch} type="submit" variant="contained" color="primary" >Buscar</Button>
                    </div>
                    <TableContainer component={Paper} spacing={2}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a  table">
                            <TableHead>
                                <TableRow key="table-header">
                                    <TableCell align="right" fontSize="small"><b>Nome</b></TableCell>
                                    <TableCell align="right"><b>Sobrenome</b></TableCell>
                                    <TableCell align="right"><b>Data Nasc.</b></TableCell>
                                    <TableCell align="right"><b>Telefone</b></TableCell>
                                    <TableCell align="right"><b>E-mail</b></TableCell>
                                    <TableCell align="right"><b>Data IR</b></TableCell>
                                    <TableCell align="center"><Button size="small" variant={edit? "outlined": "contained"} onClick={() => toogleEdit(e => !e)}>editar</Button></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.id}
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
                                        <TableCell align="center">{edit ?
                                            <>
                                                <Link to={"/edit/" + row.id}><Edit color="primary" fontSize="small"  ></Edit></Link>
                                                <DeleteForeverIcon fontSize="small" color="error" onClick={() => handleClickDelete(row.id, row.nome)}></DeleteForeverIcon>
                                            </>
                                            : ""}</TableCell>
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
        </>
    );
}