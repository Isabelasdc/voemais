'use client'

import Pagina from "@/app/components/Pagina"
import VooValidator from "@/validators/VooValidator"; // Assumindo que você tenha um validador para voo
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

    const voos = JSON.parse(localStorage.getItem('voos')) || []; 
    const dados = voos.find(item => item.id == params.id); 
    const voo = dados || { internacional: '', identificador: '', checkin: '' , embarque: '' , origem: '' , destino: '' , empresa: '' , preco: ''}; 

    const [empresas, setEmpresas] = useState([]);
    const [aeroportos, setAeroportos] = useState([]);

    useEffect(() => {
        setEmpresas(JSON.parse(localStorage.getItem('empresas')) || []);
        setAeroportos(JSON.parse(localStorage.getItem('aeroportos')) || []);
    }, []);

    function salvar(dados) {
        if (voo.id) {
            Object.assign(voo, dados);
        } else {
            dados.id = v4();
            voos.push(dados); 
        }
    
        localStorage.setItem('voos', JSON.stringify(voos));
    
        // Redireciona para a página principal de voo
        return route.push('/voo'); 
    }

    return (
        <Pagina titulo="Voo">
            <Formik
                initialValues={voo}
                validationSchema={VooValidator}  // Validação aplicada aqui
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors  // Captura de erros
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="internacional">
                            <Form.Label>Internacional</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="internacional"
                                value={values.internacional}
                                onChange={handleChange('internacional')}
                                isInvalid={errors.internacional}  // Verifica erro no campo 'internacional'
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.internacional} {/* Exibe erro de validação */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="identificador">
                            <Form.Label>Identificador</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="identificador"
                                value={values.identificador}
                                onChange={handleChange('identificador')}
                                isInvalid={errors.identificador}  // Verifica erro no campo 'identificador'
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.identificador} {/* Exibe erro de validação */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="checkin">
                            <Form.Label>Data Checkin</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="checkin"
                                value={values.checkin}
                                onChange={handleChange('checkin')}
                                isInvalid={errors.checkin}  // Verifica erro no campo 'checkin'
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.checkin} {/* Exibe erro de validação */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="embarque">
                            <Form.Label>Data Embarque</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="embarque"
                                value={values.embarque}
                                onChange={handleChange('embarque')}
                                isInvalid={errors.embarque}  // Verifica erro no campo 'embarque'
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.embarque} {/* Exibe erro de validação */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="origem">
                            <Form.Label>Origem</Form.Label>
                            <Form.Select
                                name="origem"
                                value={values.origem}
                                onChange={handleChange('origem')}
                                isInvalid={errors.origem}  // Verifica erro no campo 'origem'
                            >
                                <option value=''>Selecione</option>
                                {aeroportos.map(item => (
                                    <option key={item.sigla} value={item.sigla}>{item.nome}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.origem} {/* Exibe erro de validação */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="destino">
                            <Form.Label>Destino</Form.Label>
                            <Form.Select
                                name="destino"
                                value={values.destino}
                                onChange={handleChange('destino')}
                                isInvalid={errors.destino}  // Verifica erro no campo 'destino'
                            >
                                <option value=''>Selecione</option>
                                {aeroportos.map(item => (
                                    <option key={item.sigla} value={item.sigla}>{item.nome} - {item.sigla}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.destino} {/* Exibe erro de validação */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="empresa">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Select
                                name="empresa"
                                value={values.empresa}
                                onChange={handleChange('empresa')}
                                isInvalid={errors.empresa}  // Verifica erro no campo 'empresa'
                            >
                                <option value=''>Selecione</option>
                                {empresas.map(item => (
                                    <option key={item.nome} value={item.nome}>{item.nome}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.empresa} {/* Exibe erro de validação */}
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
                                {errors.preco} {/* Exibe erro de validação */}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/voo"
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
