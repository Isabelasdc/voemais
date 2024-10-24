'use client'

import Pagina from "@/app/components/Pagina"
import VooValidator from "@/validators/VooValidator"; 
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
    
        return route.push('/voo'); 
    }

    return (
        <Pagina titulo="Voo">
            <Formik
                initialValues={voo}
                validationSchema={VooValidator} 
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
                        values.preco = mask(values.preco, 'R$ 9999,99');
                        values.checkin = mask(values.checkin, '99/99/9999');
                        values.embarque = mask(values.embarque, '99/99/9999');
                    }, [values.preco, values.checkin, values.embarque])

                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="internacional">
                                <Form.Label>Internacional</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="internacional"
                                    value={values.internacional}
                                    onChange={handleChange('internacional')}
                                    isInvalid={errors.internacional}  
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.internacional} 
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="identificador">
                                <Form.Label>Identificador</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="identificador"
                                    value={values.identificador}
                                    onChange={handleChange('identificador')}
                                    isInvalid={errors.identificador} 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.identificador} 
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="checkin">
                                <Form.Label>Data Checkin</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="checkin"
                                    value={values.checkin}
                                    onChange={(value) => {
                                        setFieldValue('checkin', mask(value.target.value, '99/99/9999'))
                                    }}
                                    isInvalid={errors.checkin} 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.checkin} 
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="embarque">
                                <Form.Label>Data Embarque</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="embarque"
                                    value={values.embarque}
                                    onChange={(value) => {
                                        setFieldValue('embarque', mask(value.target.value, '99/99/9999'))
                                    }}
                                    isInvalid={errors.embarque}  
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.embarque} 
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="origem">
                                <Form.Label>Origem</Form.Label>
                                <Form.Select
                                    name="origem"
                                    value={values.origem}
                                    onChange={handleChange('origem')}
                                    isInvalid={errors.origem} 
                                >
                                    <option value=''>Selecione</option>
                                    {aeroportos.map(item => (
                                        <option key={item.sigla} value={item.sigla}>{item.nome}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.origem} 
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="destino">
                                <Form.Label>Destino</Form.Label>
                                <Form.Select
                                    name="destino"
                                    value={values.destino}
                                    onChange={handleChange('destino')}
                                    isInvalid={errors.destino} 
                                >
                                    <option value=''>Selecione</option>
                                    {aeroportos.map(item => (
                                        <option key={item.sigla} value={item.sigla}>{item.nome} - {item.sigla}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.destino} 
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="empresa">
                                <Form.Label>Empresa</Form.Label>
                                <Form.Select
                                    name="empresa"
                                    value={values.empresa}
                                    onChange={handleChange('empresa')}
                                    isInvalid={errors.empresa}  
                                >
                                    <option value=''>Selecione</option>
                                    {empresas.map(item => (
                                        <option key={item.nome} value={item.nome}>{item.nome}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.empresa} 
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
                                    href="/voo"
                                    className="btn btn-danger ms-3"
                                >
                                    <MdArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )
                } }
            </Formik>
        </Pagina>
    )
}
