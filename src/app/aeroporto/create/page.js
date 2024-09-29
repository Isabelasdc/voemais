'use client'

import Pagina from "@/app/components/Pagina"
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";



export default function Page() {

    const route = useRouter()

    function salvar(dados){
        const aeroporto = JSON.parse(localStorage.getItem('aeroporto')) || []
        aeroporto.push(dados)
        localStorage.setItem('aeroporto' , JSON.stringify(aeroporto))
        return route.push('/aeroporto')
    }


    return (
        <Pagina titulo="Empresa">
            <Formik
                initialValues={{ nome: '', sigla: '', site: '' , uf: '' , cidade: '' , País: ''}}
                onSubmit={values=>salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="nome"
                            value={values.nome}
                            onChange={handleChange('nome')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sigla">
                            <Form.Label>Sigla</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="sigla"
                            value={values.sigla}
                            onChange={handleChange('sigla')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="uf">
                            <Form.Label>UF</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="uf"
                            value={values.uf}
                            onChange={handleChange('uf')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="cidade"
                            value={values.cidade}
                            onChange={handleChange('cidade')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="País">
                            <Form.Label>País</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="País"
                            value={values.País}
                            onChange={handleChange('País')}
                             />
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/aeroporto"
                                className="btn btn-danger ms-3"
                            >
                                <MdArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}

