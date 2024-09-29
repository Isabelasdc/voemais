'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";

export default function Page() {

    const passageiro = JSON.parse(localStorage.getItem('passageiro')) || []
    // let empresas = localStorage.getItem('empresas')

    // if(empresas){
    //     empresas = JSON.parse(empresas)

       
    // } else {
    //     empresas = []
    // }

    return (
        <Pagina titulo="Passageiros">
            <Link
                href="/passageiros/create"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Tipo Documento</th>
                        <th>Documento</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>

                    </tr>
                </thead>
                <tbody>
                    {passageiro.map(item => (
                        <tr>
                            <td>1</td>
                            <td>{item.nome}</td>
                            <td>{item.tipo}</td>
                            <td>{item.documento}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                            <td>{item.nascimento}</td>


                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}

