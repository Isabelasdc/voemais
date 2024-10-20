import * as Yup from 'yup';

const VooValidator = Yup.object().shape({
    internacional: Yup.string()  // Campo de seleção para Internacional ou Nacional
        .oneOf(['Sim', 'Não'], 'Seleção inválida')  // Define opções válidas
        .required('Campo Obrigatório'),
    
    identificador: Yup.string()  // Identificador do voo
        .min(3, 'O mínimo de caracteres é 3')
        .max(10, 'O máximo de caracteres é 10')
        .required('Campo Obrigatório'),
    
    checkin: Yup.date()  // Data de Check-in
        .required('Campo Obrigatório')
        .typeError('Formato de data inválido'),

    embarque: Yup.date()  // Data de Embarque
        .required('Campo Obrigatório')
        .typeError('Formato de data inválido'),
    
    origem: Yup.string()  // Origem do voo
        .required('Campo Obrigatório'),
    
    destino: Yup.string()  // Destino do voo
        .required('Campo Obrigatório'),
    
    empresa: Yup.string()  // Nome da empresa aérea
        .min(2, 'O mínimo de caracteres é 2')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    
    preco: Yup.number()  // Preço do voo
        .min(1, 'O preço deve ser maior que zero')
        .required('Campo Obrigatório'),
});

export default VooValidator;
