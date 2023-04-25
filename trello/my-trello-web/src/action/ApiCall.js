import axios from 'axios'
import { API } from '../util/constant'
export const fetchData = async (id) =>{
    const request = await axios.get(`${API}/v1/boards/${id}`)
    return request.data
}
export const postDataColumn = async(data)=>{
  const request = await axios.post(`${API}/v1/columns`,data)
    return request.data
}

export const postDataCard = async(data)=>{
    const request = await axios.post(`${API}/v1/cards`,data)
      console.log(request.data)
      return request.data
  }
  export const updateDataColumn = async(id,data)=>{
    const request = await axios.put(`${API}/v1/columns/${id}`,data)
      return request.data
  }
  