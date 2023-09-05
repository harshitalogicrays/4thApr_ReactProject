import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFetchCollection = (collectionname) => {
    let [data,setData]=useState([])
    let [isLoading,setIsLoading]=useState(false)
    let getCollection=()=>{
        setIsLoading(true)
        try{
        let docRef=collection(db,collectionname)
        const q= query(docRef,orderBy('createdAt','desc'))
        onSnapshot(q,(snapshot)=>{
            const allData=snapshot.docs.map(doc=>(
                {id:doc.id,...doc.data()}
            ))
            setData(allData)
            setIsLoading(false)
        })
    }
    catch(error){
        setIsLoading(false)
    }
    }
    useEffect(()=>{
        getCollection()
    },[])
  return (
    {data,isLoading}
  )
}

export default useFetchCollection
