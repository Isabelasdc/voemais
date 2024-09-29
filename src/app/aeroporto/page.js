'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";

export default function Page() {

    const aeroporto = JSON.parse(localStorage.getItem('aeroporto')) || []
    // let empresas = localStorage.getItem('empresas')

    // if(empresas){
    //     empresas = JSON.parse(empresas)

       
    // } else {
    //     empresas = []
    // }

    return (
        <Pagina titulo="Aeroporto">
            <Link
                href="/aeroporto/create"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>UF</th>
                        <th>Cidade</th>
                        <th>Pais</th>

                    </tr>
                </thead>
                <tbody>
                    {aeroporto.map(item => (
                        <tr>
                            <td>1</td>
                            <td>{item.nome}</td>
                            <td>{item.sigla}</td>
                            <td>{item.uf}</td>
                            <td>{item.cidade}</td>
                            <td>{item.País}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}

