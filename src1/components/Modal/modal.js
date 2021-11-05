
import './modal.css'
import btnClose from '../../images/+.svg'
import { useState } from 'react/cjs/react.development';
import InputMask from 'react-input-mask';

function Modal(props) {
const {handleRegisterDocument, modal, closeModal} = props;

  const [btnDebit, setbtnDebit] = useState('inactive-button');
  const [btnCrebit, setbtnCrebit] = useState('');

  const [value, setValue] = useState(`R$ `)
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState()

  const week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];

  
  const body = {
    date: date.split("/").reverse().join('-')+'T03:00:00.000Z',
    week_day: week[new Date(date.split("/").reverse().join('/')).getDay()],
    description: description && description[0].toUpperCase()+description.substr(1).toLowerCase(),
    value: Number(value.substr(2).trim().replace(",", "").replace(".", "")),
    category: category && category[0].toUpperCase()+category.substr(1).toLowerCase(),
    type: btnCrebit === '' ? 'credit' : 'debit'
  };
  
  function handleBtnCredit() {
    setbtnDebit('inactive-button')
    setbtnCrebit('')
  }

  function handleBtnDedit() {
    setbtnCrebit('inactive-button')
    setbtnDebit('')
  }
  
  function  handleClearValues() {
    setValue(`R$ `)
    setCategory('')
    setDate('')
    setDescription('')
  }

  function handleClose() {
    closeModal('add');
    handleClearValues();    
  }
  function handleConfirm() {
    handleRegisterDocument(body,'POST');
    handleClearValues();
    handleClose();
  }


    return(
      <div class={`modal ${modal}`}>
        <div className="modal-container">

          <button onClick={()=>handleClose()} className="close-icon">
            <img src={btnClose} alt="Botão fechar" />
          </button>
          
          <h1>Adicionar Registro</h1>

          <div className="btns">
            <button onClick={handleBtnCredit} className={`credit-button ${btnCrebit}`}>
              Entrada
            </button>
            <button onClick={handleBtnDedit} className={`debit-button ${btnDebit}`}>
              Saida
            </button>
          </div>

          <label htmlFor="name-value">Valor</label>
          <input id="name-value" className="name-value" onChange={e => setValue(e.target.value)} type="text" value={value} />
          <p className="example">Ex: R$ 15,00</p>
          <label htmlFor="name-category">Categoria </label>
          <input id="name-category" className="name-category" onChange={e => setCategory(e.target.value)} type="text" value={category} />

          <label htmlFor="name-date">Data</label>
          
          <InputMask mask="99/99/9999" id="name-date" className="name-date" onChange={e => setDate(e.target.value)} value={date} type="text" />

          <label htmlFor="input-description">Descrição</label>
          <input id="input-description" className="input-description" onChange={e => setDescription(e.target.value)} value={description} type="text" />

          <p className={`warning`}>Preencha Todos os Campos</p>
          <button onClick={e => handleConfirm()} className="btn-insert">Confirmar</button>

        </div>
      </div>
    )
}

export default Modal;