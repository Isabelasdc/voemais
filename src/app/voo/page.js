'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";

export default function Page() {

    const voo = JSON.parse(localStorage.getItem('voo')) || []
    // let empresas = localStorage.getItem('empresas')

    // if(empresas){
    //     empresas = JSON.parse(empresas)

       
    // } else {
    //     empresas = []
    // }

    return (
        <Pagina titulo="Voo">
            <Link
                href="/Voo/create"
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
                    {voo.map(item => (
                        <tr>
                            <td>1</td>
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

