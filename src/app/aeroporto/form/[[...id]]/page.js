'use client'

import Pagina from "@/app/components/Pagina"
import apiLocalidade from "@/app/service/apiLocalidade";
import AeroportoValidator from "@/validators/AeroportoValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { v4 } from 'uuid';
import * as Yup from 'yup';

export default function Page({ params }) {

    const route = useRouter();

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || [];
    const dados = aeroportos.find(item => item.id == params.id); // Busca pelo ID
    const aeroporto = dados || { nome: '', sigla: '', uf: '', cidade: '', pais: 'Brasil' }; // Dados padrão se for um novo aeroporto

    const [paises, setPaises] = useState([])
    const [ufs, setUfs] = useState([])
    const [cidades, setCidades] = useState([])
    const [camposBrasil, setCamposBrasil] = useState(false)


    useEffect(() => {

        apiLocalidade.get(`paises`).then(resultado => {
            setPaises(resultado.data)
        })

        apiLocalidade.get(`estados?orderBy=nome`).then(resultado => {
            setUfs(resultado.data)
        })

    }, [])

    function salvar(dados) {
        if (aeroporto.id) {
            // Se o aeroporto já tem um ID, atualize os dados
            Object.assign(aeroporto, dados);
        } else {
            // Se o aeroporto não tem um ID, gere um novo
            dados.id = v4();
            aeroportos.push(dados); // Adiciona o novo aeroporto à lista
        }

        // Salva a lista atualizada no localStorage
        localStorage.setItem('aeroportos', JSON.stringify(aeroportos));

        // Redireciona para a página de aeroportos
        return route.push('/aeroporto');
    }


    return (
        <Pagina titulo="Aeroporto">
            <Formik
                initialValues={aeroporto}
                validationSchema={AeroportoValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors
                }) => {

                    useEffect(() => {

                        setCamposBrasil(values.pais == 'Brasil')

                    }, [values.pais])

                    useEffect(() => {

                        apiLocalidade.get(`estados/${values.uf}/municipios`).then(resultado => {
                            setCidades(resultado.data)
                        })


                    }, [values.uf])


                    return (

                        <Form >
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')} // Atualiza os valores diretamente
                                    isInvalid={errors.nome}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nome}
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="sigla">
                                <Form.Label>Sigla</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sigla"
                                    value={values.sigla}
                                    onChange={handleChange('sigla')}
                                    isInvalid={errors.sigla}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.sigla}
                                    </Form.Control.Feedback>
                            </Form.Group>
                            {camposBrasil &&
                                <>
                                    <Form.Group className="mb-3" controlId="uf">
                                        <Form.Label>UF</Form.Label>
                                        <Form.Select
                                            name="uf"
                                            value={values.uf}
                                            onChange={handleChange('uf')}
                                            
                                        >
                                            <option value=''>Selecione</option>
                                            {ufs.map(item => (
                                                <option key={item.sigla} value={item.sigla}>
                                                    {item.sigla} - {item.nome}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="cidade">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Select
                                            name="cidade"
                                            value={values.cidade}
                                            onChange={handleChange('cidade')}
                                        >
                                            <option value=''>Selecione</option>
                                            {cidades.map(item => (
                                                <option key={item.nome} value={item.nome}>
                                                    {item.nome}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </>
                            }

                            <Form.Group className="mb-3" controlId="pais">
                                <Form.Label>País</Form.Label>
                                <Form.Select
                                    name="pais"
                                    value={values.pais}
                                    onChange={handleChange('pais')}
                                >
                                    <option value=''>Selecione</option>
                                    {paises.map(item => (
                                        <option key={item.nome} value={item.nome}>{item.nome}</option>
                                    ))}
                                </Form.Select>
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
                    )

                }

                }
            </Formik>
        </Pagina>
    )
}