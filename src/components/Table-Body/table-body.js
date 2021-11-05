import './table-body.css';
import iconEditar from '../../images/icons8-editar3.svg';
import iconLIxo from '../../images/icons8-lixo1.svg';
import { useState } from 'react/cjs/react.development';

function TableBody(props) {
    const {document, openModal, handleRegisterDocument} = props;
    
    const [hidden, setHidden] = useState('hidden')
    
function transformDate(date){
    try {
        return date.substr(0,10).split("-").reverse().join("/")
    } catch (error) {
        console.log(error)
    }
}

function handleDelete(param1, param2, param3){
    handleRegisterDocument(param1, param2, param3);
    setHidden('hidden')
}
function handleShowDelete() {
    setHidden('')
}

    return(
            <ul className="table-line" data-id={'index'} >
                <li className="line-items column-date" >{transformDate(document.date)}</li>
                <li className="line-items column-week-day" >{document.week_day}</li>
                <li className="line-items column-description" >{document.description}</li>
                <li className="line-items column-category" >{document.category}</li>
                <li className={`line-items column-value ${document.type === 'debit' ? 'orange' : 'purple'}`} >{String(((document.value)/100).toFixed(2)).replace('.', ',')}</li>
                <li className="line-items btn-edit-delete" >
                    <button onClick={()=>openModal('', document.id)}>
                        <img className="edit-icon" src={iconEditar} alt="editar icone" />
                    </button>
                    <button onClick={() => handleShowDelete()}>
                        <img className="delete-icon" src={iconLIxo} alt="deletar icone" />                            
                    </button>

                    <div className={`container-confirm-delete ${hidden}`}>
                        <p>Apagar item?</p>
                        <div>
                            <button onClick={()=>handleDelete('', 'DELETE', document.id)} className={`btn-actions-confirm-delete`}>
                                Sim
                            </button>
                            <button onClick={() => setHidden('hidden')} className={`btn-actions-cancel-delete`}>
                                Não
                            </button>
                        </div>
                    </div>

                </li>
            </ul>
            //     )
            // })
    )
}

export default TableBody