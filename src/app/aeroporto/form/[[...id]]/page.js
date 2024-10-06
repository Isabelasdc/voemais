'use client'

import Pagina from "@/app/components/Pagina"
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { v4 } from 'uuid';

export default function Page({ params }) {

    const route = useRouter();

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || [];
    const dados = aeroportos.find(item => item.id == params.id); // Busca pelo ID
    const aeroporto = dados || { nome: '', sigla: '', site: '', uf: '', cidade: '', País: '' }; // Dados padrão se for um novo aeroporto

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
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form >
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange} // Atualiza os valores diretamente
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sigla">
                            <Form.Label>Sigla</Form.Label>
                            <Form.Control
                                type="text"
                                name="sigla"
                                value={values.sigla}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="uf">
                            <Form.Label>UF</Form.Label>
                            <Form.Control
                                type="text"
                                name="uf"
                                value={values.uf}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                name="cidade"
                                value={values.cidade}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="País">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                name="País"
                                value={values.País}
                                onChange={handleChange}
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
