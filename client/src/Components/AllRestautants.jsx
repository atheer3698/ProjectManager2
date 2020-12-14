import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from '@reach/router';
import moment from 'moment';

function addAvgRatingsToRestaurants(restaurants) {
    const arr = [];
    for(let restaurant of restaurants) {
        arr.push({...restaurant});
        continue;
      }
    return arr;
} 
const AllRestautants = props => {
    const [all, setAll] = useState([]);
    const [q] = useState("");
    useEffect( () => {
      getAll();
    }, []);
  
    function getAll() {
      axios.get("http://localhost:8000/api/projects")
        .then(res => {
          console.log(res);
          setAll(
                addAvgRatingsToRestaurants(res.data)
          );
        }).catch(err => console.error(err));
    }
    const remove = id => {
      axios.delete(`http://localhost:8000/api/projects/${id}`)
        .then(res => {
          console.log(res);
          getAll();
        }).catch(err => console.error(err));
    }
    const update = (restaurantid , status) => {
          axios.put('http://localhost:8000/api/projects/'+ restaurantid ,{ status})
            .then(res => console.log(res));
        }
    const sorted =()=>{
      let sorted = [...all]
      sorted=sorted.sort((a,b)=> new Date(b.yearEstablished) - new Date(a.yearEstablished) )
      setAll(sorted)
      }
      
  return (
  <div >
  <span onClick={ e => sorted()} > sort&#8609;</span>
  <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col"class="blue">Backlog </th>
      <th scope="col"class="yel">In Progress </th>
      <th scope="col"class="green">Completed </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> 
      {all.filter(r => r.name.toLowerCase().includes(q.toLowerCase())).length < 1 ? <p className="col-sm-12">No results</p> : ""}
      {all.filter(status => status.status === "Backlog").map((rest , index) => {
            return  <div  className="card mt-3">
                <p key={index}>
              <div class="boarder">
                    <p>Project Name: {rest.name}</p>
                    <p>Due Date: {moment(rest.yearEstablished).format('DD / MM / YYYY')} </p>
                    <p><button className="btn btn-outline-warning" onClick={(e)=>{update(rest._id,"InProgress")}}>starts project &#8608;</button></p>
                  </div></p>
            </div>
          })}
      </td>
      <td>
          {all.filter(status => status.status === "InProgress").map((rest , index) => {
            return <div className="card mt-3"><p key={index}>
            <div class="boarder">
            <p>Project Name: {rest.name}</p>
            <p>Due Date: {moment(rest.yearEstablished).format('DD / MM / YYYY')} </p>
            <p><button className="btn btn-outline-success" onClick={e=>update(rest._id,"Completed")}>Move to completed &#8608; </button></p>
            </div></p></div> })}
      </td>
      <td> 
      {all.filter(status => status.status === "Completed").map((rest , index) => {
            return <div className="card mt-3"><p key={index}>
            <div class="boarder">
            <p>Project Name: {rest.name}</p>
            <p>Due Date: {moment(rest.yearEstablished).format('DD / MM / YYYY')}    </p>   
            <p><button className="btn btn-outline-danger" onClick={e => remove(rest._id)}>&#x292C; Remove Project</button></p>  
            </div></p></div> })}
      </td>
    </tr>
    <td colspan="3">
    <Link to="/new" className="btn btn-outline-primary">Add New Project &#43;</Link>
    </td>
  </tbody>
  </table>
  </div>
    )
  }
export default AllRestautants;
