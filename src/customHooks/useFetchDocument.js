import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFetchDocument = (collectionname,documentID) => {
    let [document,setDocument]=useState(null)
    let getDocument=async()=>{
        let docref=doc(db,collectionname,documentID)
        let docSnap=await getDoc(docref)
        if(docSnap.exists()){
            const obj={id:documentID,...docSnap.data()}
            setDocument(obj)
        }
    }
    useEffect(()=>{
        getDocument()
    },[])
  return (  
{document}
  )
}

export default useFetchDocument
