'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Page() {

    const [voos, setVoos] = useState([])

    useEffect(() => {
        setVoos(JSON.parse(localStorage.getItem('voos')) || [])
    }, [])


    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {

            const dados = voos.filter(item => item.id != id)
            localStorage.setItem('voos', JSON.stringify(dados))
            setVoos(dados)

        }
    }

    return (
        <Pagina titulo="Voo">
            <Link
                href="/voo/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Internacional</th>
                        <th>Identificador</th>
                        <th>Checkin</th>
                        <th>Embarque</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Empresa</th>
                        <th>Preço</th>

                    </tr>
                </thead>
                <tbody>
                    {voos.map(item => (

                        <tr key={item.id}>
                            <td>
                                <Link href={`/voo/form/${item.id}`}>
                                    <FaRegEdit className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.internacional}</td>
                            <td>{item.identificador}</td>
                            <td>{item.checkin}</td>
                            <td>{item.embarque}</td>
                            <td>{item.origem}</td>
                            <td>{item.destino}</td>
                            <td>{item.empresa}</td>
                            <td>{item.preco}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}

