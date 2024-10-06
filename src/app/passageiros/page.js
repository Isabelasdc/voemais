'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Page() {
    const [passageiros, setPassageiros] = useState([])

    useEffect(() => {
        setPassageiros(JSON.parse(localStorage.getItem('passageiros')) || [])
    }, [])
    
    
    function excluir(id){
        if(confirm('Deseja realmente excluir o registro?')){

            const dados = passageiros.filter(item=>item.id  != id)
            localStorage.setItem('passageiros' , JSON.stringify(dados))
            setAeroportos(dados)
            
        }
    }
    return (
        <Pagina titulo="Passageiros">
            <Link
                href="/passageiros/form"
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
                    {passageiros.map(item => (
                        <tr key={item.id}>
                        <td>
                          <Link href={`/passageiros/form/${item.id}`}>
                          <FaRegEdit className="text-primary" />
                          </Link>
                          <MdDelete 
                          title="Excluir" 
                          className="text-danger" 
                          onClick={()=>excluir(item.id)}
                          />
                      </td>
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

