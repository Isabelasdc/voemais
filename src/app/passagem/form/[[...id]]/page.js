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
import { mask } from "remask";

export default function Page({ params }) {

    const route = useRouter();

    const passagens = JSON.parse(localStorage.getItem('passagens')) || [];
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
        return route.push('/passagem');
    }

    return (
        <Pagina titulo="Passagem">
            <Formik
                initialValues={passagem}
                validationSchema={PassagemValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors
                }) => {

                    useEffect(() => {
                        values.assento = mask(values.assento, '999');
                        values.preco = mask(values.preco, 'R$ 9999,99');
                    }, [values.assento, values.preco]);

                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="voo">
                                <Form.Label>Voo</Form.Label>
                                <Form.Select
                                    name="voo"
                                    value={values.voo}
                                    onChange={handleChange('voo')}
                                    isInvalid={errors.voo}
                                >
                                    <option value=''>Selecione</option>
                                    {voos.map(item => (
                                        <option key={item.identificador} value={item.identificador}>{item.identificador}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.voo}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="passageiro">
                                <Form.Label>Passageiro</Form.Label>
                                <Form.Select
                                    name="passageiro"
                                    value={values.passageiro}
                                    onChange={handleChange('passageiro')}
                                    isInvalid={errors.passageiro}
                                >
                                    <option value=''>Selecione</option>
                                    {passageiros.map(item => (
                                        <option key={item.nome} value={item.nome}>{item.nome}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.passageiro}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="assento">
                                <Form.Label>Assento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="assento"
                                    value={values.assento}
                                    onChange={(value) => {
                                        setFieldValue('assento', mask(value.target.value, '999'))
                                    }}
                                    isInvalid={errors.assento}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.assento}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="preco">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="preco"
                                    value={values.preco}
                                    onChange={(value) => {
                                        setFieldValue('preco', mask(value.target.value, 'R$ 9999,99'))
                                    }}
                                    isInvalid={errors.preco}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.preco}
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
                    );
                }}
            </Formik>
        </Pagina>
    )
}
