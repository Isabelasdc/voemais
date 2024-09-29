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
        const passagem = JSON.parse(localStorage.getItem('passagem')) || []
        passagem.push(dados)
        localStorage.setItem('passagem' , JSON.stringify(passagem))
        return route.push('/passagem')
    }


    return (
        <Pagina titulo="Passagem">
            <Formik
                initialValues={{ voo: '', passageiro: '', assento: '' , preco: '' }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="voo">
                            <Form.Label>Voo</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="voo"
                            value={values.voo}
                            onChange={handleChange('voo')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="passageiro">
                            <Form.Label>Passageiro</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="passageiro"
                            value={values.passageiro}
                            onChange={handleChange('passageiro')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="assento">
                            <Form.Label>Assento</Form.Label>
                            <Form.Control 
                            type="number" 
                            name="assento"
                            value={values.assento}
                            onChange={handleChange('assento')}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control 
                            type="number" 
                            name="preco"
                            value={values.preco}
                            onChange={handleChange('preco')}
                             />
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/passagem"
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

