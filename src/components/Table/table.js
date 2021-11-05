import './table.css';
import TableBody from '../Table-Body/table-body';
import { useState } from 'react/cjs/react.development';
import up from '../../images/Polygon3.svg';
import down from '../../images/Polygon4.svg';

function Table(props) {
    const {orderDocuments, documents, openModal, handleRegisterDocument, hidden, handleShowItemDelete} = props;
    
    const [polygonDate, setPolygonDate] = useState(up)
    const [polygonWeekDay, setPolygonWeekDay] = useState(up)
    const [polygonValue, setPolygonValue] = useState(up)
    
  function handleOrderDocuments(type){

    if(type === 'date'){
        polygonDate===up ? setPolygonDate(down) : setPolygonDate(up);
        orderDocuments(type, polygonDate===up ? "decreasing" : "growing")
        setPolygonWeekDay(up)
        setPolygonValue(up)
    }
    
    if(type === 'day'){
        polygonWeekDay===up ? setPolygonWeekDay(down) : setPolygonWeekDay(up);
        orderDocuments(type, polygonWeekDay===up ? "decreasing" : "growing")
        // setPolygonDate(up)
        // setPolygonValue(up)
    }
    
    if(type === 'value'){
        polygonValue===up ? setPolygonValue(down) : setPolygonValue(up);
        orderDocuments(type, polygonValue===up ? "decreasing" : "growing")
        setPolygonDate(up)
        setPolygonWeekDay(up)
    }
    



    
  }


    return(
        <div className="table">
            <div className="table-head">
                <ul>
                    <li onClick={()=>handleOrderDocuments('date')} className="column-title column-date date" id="date">Data <img src={polygonDate} alt="Ordenar por Data" /></li>
                    <li onClick={()=>handleOrderDocuments('day')} className="column-week-day weekDay" id="week-day">Dia da Semana <img src={polygonWeekDay} alt="Ordenar por Dia da Semana" /></li>
                    <li className="column-description">Descrição</li>
                    <li className="column-category">Categoria</li>
                    <li onClick={()=>handleOrderDocuments('value')} className="column-value value" id="value">Valor <img src={polygonValue} alt="Ordenar por Valor" /></li>
                    <li></li>
                </ul>
            </div>
            
            <div className="table-body">
                {documents.map((element, index) => {
                    return(
                        <TableBody handleShowItemDelete={handleShowItemDelete} itemHidden={hidden} index={index} handleRegisterDocument={handleRegisterDocument} openModal={openModal} document={element}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Table;