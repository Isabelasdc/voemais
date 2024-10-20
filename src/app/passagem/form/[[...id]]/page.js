'use client'

import Pagina from "@/app/components/Pagina"
import PassagemValidator from "@/validators/PassagemValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { v4 } from 'uuid';

export default function Page({ params }) {

    const route = useRouter();

    const passagens = JSON.parse(localStorage.getItem('passagens')) || []; // Corrigi a chave para 'passagens'
    const dados = passagens.find(item => item.id == params.id);
    const passagem = dados || { voo: '', passageiro: '', assento: '', preco: '' };

    const [voos, setVoos] = useState([]);
    const [passageiros, setPassageiros] = useState([]);

    useEffect(() => {
        setVoos(JSON.parse(localStorage.getItem('voos')) || []);
        setPassageiros(JSON.parse(localStorage.getItem('passageiros')) || []);
    }, []);

    function salvar(dados) {
        if (passagem.id) {
            Object.assign(passagem, dados);
        } else {
            dados.id = v4();
            passagens.push(dados);
        }

        localStorage.setItem('passagens', JSON.stringify(passagens));

        // Redireciona para a página principal de passagens
        return route.push('/passagem');
    }

    return (
        <Pagina titulo="Passagem">
            <Formik
                initialValues={passagem}
                validationSchema={PassagemValidator} // Validação aplicada aqui
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors  // Captura de erros
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="voo">
                            <Form.Label>Voo</Form.Label>
                            <Form.Select
                                name="voo"
                                value={values.voo}
                                onChange={handleChange('voo')}
                                isInvalid={errors.voo}  // Verifica se há erro no campo 'voo'
                            >
                                <option value=''>Selecione</option>
                                {voos.map(item => (
                                    <option key={item.identificador} value={item.identificador}>{item.identificador}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.voo} {/* Exibe o erro de validação para voo */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="passageiro">
                            <Form.Label>Passageiro</Form.Label>
                            <Form.Select
                                name="passageiro"
                                value={values.passageiro}
                                onChange={handleChange('passageiro')}
                                isInvalid={errors.passageiro}  // Verifica erro no campo 'passageiro'
                            >
                                <option value=''>Selecione</option>
                                {passageiros.map(item => (
                                    <option key={item.nome} value={item.nome}>{item.nome}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.passageiro} {/* Exibe o erro de validação para passageiro */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="assento">
                            <Form.Label>Assento</Form.Label>
                            <Form.Control
                                type="number"
                                name="assento"
                                value={values.assento}
                                onChange={handleChange('assento')}
                                isInvalid={errors.assento}  // Verifica erro no campo 'assento'
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.assento} {/* Exibe o erro de validação para assento */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                type="number"
                                name="preco"
                                value={values.preco}
                                onChange={handleChange('preco')}
                                isInvalid={errors.preco}  // Verifica erro no campo 'preco'
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.preco} {/* Exibe o erro de validação para preço */}
                            </Form.Control.Feedback>
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
