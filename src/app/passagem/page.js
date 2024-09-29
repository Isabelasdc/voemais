'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";

export default function Page() {

    const passagem = JSON.parse(localStorage.getItem('passagem')) || []
    // let empresas = localStorage.getItem('empresas')

    // if(empresas){
    //     empresas = JSON.parse(empresas)

       
    // } else {
    //     empresas = []
    // }

    return (
        <Pagina titulo="Passagens">
            <Link
                href="/passagem/create"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Voo</th>
                        <th>Passageiro</th>
                        <th>Assento</th>
                        <th>Preço</th>

                    </tr>
                </thead>
                <tbody>
                    {passagem.map(item => (
                        <tr>
                            <td>1</td>
                            <td>{item.voo}</td>
                            <td>{item.passageiro}</td>
                            <td>{item.assento}</td>
                            <td>{item.preco}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}

