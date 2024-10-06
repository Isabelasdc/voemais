'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Page() {

    const [passagens, setPassagens] = useState([])

    useEffect(() => {
        setPassagens(JSON.parse(localStorage.getItem('passagens')) || [])
    }, [])
    
    
    function excluir(id){
        if(confirm('Deseja realmente excluir o registro?')){

            const dados = passagens.filter(item=>item.id  != id)
            localStorage.setItem('passagens' , JSON.stringify(dados))
            setPassagens(dados)
            
        }
    }

    return (
        <Pagina titulo="Passagens">
            <Link
                href="/passagem/form"
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
                    {passagens.map(item => (
                        <tr key={item.id}>
                        <td>
                          <Link href={`/passagem/form/${item.id}`}>
                          <FaRegEdit className="text-primary" />
                          </Link>
                          <MdDelete 
                          title="Excluir" 
                          className="text-danger" 
                          onClick={()=>excluir(item.id)}
                          />
                      </td>
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

