import * as Yup from 'yup';

const PassageirosValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    tipo: Yup.string()  // Tipo de documento (Ex: CPF, RG)
        .min(2, 'O mínimo de caracteres é 2')
        .max(5, 'O máximo de caracteres é 5')
        .required('Campo Obrigatório'),
    documento: Yup.string()  // Número do documento
        .min(2, 'O mínimo de caracteres é 2')
        .max(14, 'O máximo de caracteres é 14')
        .required('Campo Obrigatório'),
    email: Yup.string()
        .email('Formato de e-mail inválido')
        .required('Campo Obrigatório'),
    telefone: Yup.string()  // Número de telefone
        .min(10, 'O mínimo de caracteres é 10')
        .max(11, 'O máximo de caracteres é 11')
        .required('Campo Obrigatório'),
    nascimento: Yup.date()  // Data de nascimento
        .required('Campo Obrigatório'),
});

export default PassageirosValidator;
