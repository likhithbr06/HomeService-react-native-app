import { useState,useEffect } from "react"
//fn is a functionthat fetches something.
const useAppwrite=(fn)=>{
    const [data, setdata] = useState([])
    const [isLoading, setisLoading] = useState(false)

    const fetchData=async ()=>{
        setisLoading(true)
        try {
          const response = await fn()
          setdata(response)
        } catch (error) {
          Alert.alert('ERROR!',error.message)
        }
        finally{
          setisLoading(false)
        }
      }

    useEffect(()=>{
        fetchData()
    },[]) // this will be called for the first time only.

    const refetch=()=>fetchData() // this will be called evry time the user pulls refresh.

  return {data,isLoading,refetch}
}

export default useAppwrite