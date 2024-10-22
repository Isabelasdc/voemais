'use client'

import Pagina from "@/app/components/Pagina"
import PassageirosValidator from "@/validators/PassageirosValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from 'uuid';

export default function Page({ params }) {

    const route = useRouter();

    const passageiros = JSON.parse(localStorage.getItem('passageiros')) || [];
    const dados = passageiros.find(item => item.id == params.id); // Busca pelo ID
    const passageiro = dados || { nome: '', tipo: '', documento: '', email: '', telefone: '', nascimento: '' }; // Dados padrão se for um novo passageiros

    function salvar(dados) {
        if (passageiro.id) {
            // Se o passageiros já tem um ID, atualize os dados
            Object.assign(passageiro, dados);
        } else {
            // Se o passageiros não tem um ID, gere um novo
            dados.id = v4();
            passageiros.push(dados); // Adiciona o novo passageiros à lista
        }

        // Salva a lista atualizada no localStorage
        localStorage.setItem('passageiros', JSON.stringify(passageiros));

        // Redireciona para a página de passageiros
        return route.push('/passageiros');
    }


    return (
        <Pagina titulo="Passageiros">
            <Formik
                initialValues={passageiro}
                validationSchema={PassageirosValidator}
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

                        switch (values.tipo) {
                            case 'CPF':
                                values.documento = mask(values.documento, '999.999.999-99');
                                break;
                            case 'CNPJ':
                                values.documento = mask(values.documento, '99.999.999/9999-99');
                                break;
                            case 'RG':
                                values.documento = mask(values.documento, '9.999.998');
                                break;
                            case 'Passaporte':
                                values.documento = mask(values.documento, 'AAA9999');
                                break;


                        }
                    }, [values.documento])

                    useEffect(() => {
                        values.documento = ''
                    }, [values.tipo])

                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                    isInvalid={errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tipo">
                                <Form.Label>Tipo de Documento</Form.Label>
                                <Form.Select
                                    type="text"
                                    name="tipo"
                                    value={values.tipo}
                                    onChange={handleChange('tipo')}
                                    isInvalid={errors.tipo}
                                >
                                    <option value=''>Selecione</option>
                                    <option value='CPF'>CPF</option>
                                    <option value='CNPJ'>CNPJ</option>
                                    <option value='Passaporte'>Passaporte</option>
                                    <option value='RG'>RG</option>
                                    <option value='Outro'>Outro</option>
                                </Form.Select>

                                <Form.Control.Feedback type="invalid">
                                    {errors.tipo}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="documento">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="documento"
                                    value={values.documento}
                                    onChange={handleChange('documento')}
                                    isInvalid={errors.documento}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.documento}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(value) => {
                                        setFieldValue('telefone', mask(value.target.value, '(99) 99999-9999'))
                                    }}
                                    isInvalid={errors.telefone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefone}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="nascimento">
                                <Form.Label>Nascimento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nascimento"
                                    value={values.nascimento}
                                    onChange={(value) => {
                                        setFieldValue('nascimento', mask(value.target.value, '99/99/9999'))
                                    }}
                                    isInvalid={errors.nascimento}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nascimento}
                                </Form.Control.Feedback>
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
                    )
                }
                }
            </Formik>
        </Pagina>
    )
}
