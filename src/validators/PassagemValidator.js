import * as Yup from 'yup';

const PassagemValidator = Yup.object().shape({
    voo: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    passageiro: Yup.string()  // Nome do passageiro
        .min(2, 'O mínimo de caracteres é 2')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    assento: Yup.string()  // Número do assento
        .min(1, 'O mínimo de caracteres é 1')
        .max(5, 'O máximo de caracteres é 5')
        .required('Campo Obrigatório'),
    preco: Yup.number()  // Preço da passagem
        .min(1, 'O preço deve ser maior que zero')
        .required('Campo Obrigatório'),
});

export default PassagemValidator;
