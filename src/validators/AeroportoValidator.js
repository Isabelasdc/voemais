import * as Yup from 'yup';

const AeroportoValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(10, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    sigla: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(10, 'O máximo de caracteres é 5')
        .required('Campo Obrigatório'),
    uf: Yup.string()
        .min(3, 'O mínimo de caracteres é 2')
        .max(10, 'O máximo de caracteres é 2')
        .required('Campo Obrigatório'),
   
});


export default AeroportoValidator;
