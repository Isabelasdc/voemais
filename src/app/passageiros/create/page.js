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
        const passageiros = JSON.parse(localStorage.getItem('passageiros')) || []
        passageiros.push(dados)
        localStorage.setItem('passageiros' , JSON.stringify(passageiros))
        return route.push('/passageiros')
    }


    return (
        <Pagina titulo="Passageiro">
            <Formik
                initialValues={{ nome: '', tipo: '', documento: '' , email: '' , telefone: '' , nascimento: ''}}
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
                        <Form.Group className="mb-3" controlId="tipo">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="tipo"
                            value={values.tipo}
                            onChange={handleChange('tipo')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="documento">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="documento"
                            value={values.documento}
                            onChange={handleChange('documento')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="email"
                            value={values.email}
                            onChange={handleChange('email')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="telefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control 
                            type="number" 
                            name="telefone"
                            value={values.telefone}
                            onChange={handleChange('telefone')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nascimento">
                            <Form.Label>Nascimento</Form.Label>
                            <Form.Control 
                            type="date" 
                            name="nascimento"
                            value={values.nascimento}
                            onChange={handleChange('nascimento')}
                             />
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/passageiros"
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

