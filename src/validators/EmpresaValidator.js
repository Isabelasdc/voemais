import * as Yup from 'yup';

const EmpresaValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(10, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    logo: Yup.string()
    .min(3, 'O mínimo de caracteres é 2'),
    site: Yup.string().url('email precisa ser válido')
});


export default EmpresaValidator;
