import logo from './images/Logo.svg';
import Filtro from './components/Filter/filter';
import Table from './components/Table/table';
import Aside  from './components/Aside/aside';
import Modal from './components/Modal/modal';
import './App.css';
import ModalEdit from './components/ModalEdit/modal-edit';
import { useState, useEffect } from 'react';


function App() {
  
  const [documentsArr, setDocumentsArr] = useState([]);
  const [idDocument, setIdDocument] = useState();
  const [modalEdit, setModalEdit] = useState('hidden');
  const [modal, setModal] = useState('hidden');
  const [arrFilters, setArrFilters] = useState([]);


  ////////////////////////
  async function listDocuments(){  
    try {
    const api = await fetch(`https://dindin-api-desafioback.herokuapp.com/transactions`, {
      method: 'GET'
    });
    const data = await api.json()
    setDocumentsArr(data)
    setArrFilters(data)
    } catch (error) {
      console.log(error)
    }
  }

////////////////////////////////
async function handleRegisterDocument(body, method, id) {
  
  if(method === "PUT" || method === "POST"){
    if(!body.value || !body.category || !body.date || !body.description || !method) return;
  }

  try {

    let url = '';
    
    if (method === "PUT"){
      url = `https://dindin-api-desafioback.herokuapp.com/transactions/${idDocument}`
    } else if (method === "POST") {
      url = `https://dindin-api-desafioback.herokuapp.com/transactions/`
    } else if (method === "DELETE") {
      url = `https://dindin-api-desafioback.herokuapp.com/transactions/${Number(id)}`
    } else {
      return
    }

    if(!(method === 'DELETE')){
      const response = await fetch(url,{
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
          });
        const data = await response.json();
        console.log(data)
    } else {
      await fetch(url, {
        method: method
      });
    }

    listDocuments()
    
  } catch (error) {
    console.log(error)
  }
}

////////////////////////////////////

  useEffect(() => {
    try {
      listDocuments()
    } catch (error) {
      console.log(error)
    }
  },[])

  ///////////////////////////////////
  function openModal(param, id){
    setIdDocument(id)
    if(param === 'add'){
      setModal('openModal')
    } else {
      setModalEdit('openModal')
    }
  }

  ///////////////////////////////////
  function closeModal(param){
    if(param === 'add'){
      setModal('hidden')
    } else {
      setModalEdit('hidden')
    }
  }

  ///////////////////////////////////
  
    let documents = documentsArr

  ///////////////////////////////////
  async function applyFilters(filter) {

    await setDocumentsArr(arrFilters)

    try {
      
      const api = await fetch(`https://dindin-api-desafioback.herokuapp.com/transactions`, {
      method: 'GET'
      });
      const data = await api.json()

      let newDocuments = []
      
      if(filter.daysFilter.length !== 0){
        
        filter.daysFilter.map(e => {
          return data.map(element => {            
            return (element.week_day).toLowerCase() === e.toLowerCase() && newDocuments.push(element);
          });
        })
        

      } else {
        newDocuments = arrFilters
      }

      if(filter.categoryFilter.length !== 0){
        const arr = []
        filter.categoryFilter.map(e => {
          return newDocuments.map(element => {            
            return (element.category).toLowerCase() === e.toLowerCase() && arr.push(element);
          });
        })

        newDocuments = arr
      }

      if(filter.minValue > 0){
        console.log('entrouemmin')
        const arr = []
          newDocuments.map(element => {            
            return element.value > filter.minValue && arr.push(element);
        })
        newDocuments = arr
        console.log(arr)
      }

      if(filter.maxValue > 0){
        const arr = []
          newDocuments.map(element => {            
            return element.value < filter.maxValue && arr.push(element);
        })
        newDocuments = arr
      }


      setDocumentsArr(newDocuments)

    } catch (error) {
      console.log(error)
    }
    
  }

  //////////////////////////////////


  // const [categories, setCategories] = useState([])

  const categories = [];

  documents.map(e => categories.indexOf(e.category)<0 && categories.push(e.category))
  

  
  //////////////////////////////////
  
  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado","Domingo"];

  let newArrDays = []

  let newArr = []
      



  function orderDocuments(type, order){

    
    if (type === "date" && order === "growing"){
      newArr = documents.sort(function(a,b) {
        // RETORNA EM DATA ORDEM CRESCENTE, MAIS ANTIGO 1º 
        return new Date(a.date) < new Date(b.date) ? -1 : new Date(a.date) > new Date(b.date) ? 1 : 0;
      })
      setDocumentsArr(newArr)
    } else if (type === "date" && order === "decreasing"){
      newArr = documents.sort(function(a,b) {
        // RETORNA EM DATA ORDEM DECRESCENTE, MAIS NOVO 1º 
        return new Date(a.date) > new Date(b.date) ? -1 : new Date(a.date) < new Date(b.date) ? 1 : 0;
      })
    }

    if (type === "day" && order === "growing"){
      // RETORNA VALOR EM ORDEM CRESCENTE
      days.map(e => {
        return documents.filter(element => element.week_day === e && newArrDays.push(element))
      })
      setDocumentsArr(newArrDays)
    } else if (type === "day" && order === "decreasing"){
      // RETORNA VALOR EM ORDEM DECRESCENTE
      days.reverse().map(e => {
        return documents.filter(element => element.week_day === e && newArrDays.push(element))
      })
      setDocumentsArr(newArrDays)
    }

    
    if(type === "value" && order === "growing"){
      newArr = documents.sort(function(a,b) {
        // RETORNA VALOR EM ORDEM CRESCENTE
        return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
      })
    }

    if (type === "value" && order === "decreasing"){
      newArr = documents.sort(function(a,b) {
        // RETORNA VALOR EM ORDEM DECRESCENTE
        return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
      })
    }


  }
    
  return (
    <div className={`App `} >
      <header className="container-header">
        <img src={logo} alt="" />
      </header>
      <main>
        <div>
          <Filtro listDocuments={listDocuments} categories={categories} applyFilters={applyFilters}/>
          <Table orderDocuments={orderDocuments} handleRegisterDocument={handleRegisterDocument} openModal={openModal} documents={documents}/>          
        </div>
          <Aside openModal={openModal} documents={documents}/>  
      </main>
      <Modal handleRegisterDocument={handleRegisterDocument} closeModal={closeModal} modal={modal}/>
      <ModalEdit handleRegisterDocument={handleRegisterDocument} closeModalEdit={closeModal} modalEdit={modalEdit} />
    </div>
  );
}

export default App;
