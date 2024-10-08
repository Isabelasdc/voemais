'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Page() {
    const [aeroportos, setAeroportos] = useState([])

    useEffect(() => {
        setAeroportos(JSON.parse(localStorage.getItem('aeroportos')) || [])
    }, [])
    
    
    function excluir(id){
        if(confirm('Deseja realmente excluir o registro?')){

            const dados = aeroportos.filter(item=>item.id  != id)
            localStorage.setItem('aeroportos' , JSON.stringify(dados))
            setAeroportos(dados)
            
        }

    }

    return (
        <Pagina titulo="Aeroporto">
            <Link
                href="/aeroporto/form"
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
                    {aeroportos.map(item => (
                        <tr key={item.id}>
                              <td>
                                <Link href={`/aeroporto/form/${item.id}`}>
                                <FaRegEdit className="text-primary" />
                                </Link>
                                <MdDelete 
                                title="Excluir" 
                                className="text-danger" 
                                onClick={()=>excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.sigla}</td>
                            <td>{item.uf}</td>
                            <td>{item.cidade}</td>
                            <td>{item.pais}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}

