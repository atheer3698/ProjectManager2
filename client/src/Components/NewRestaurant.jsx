import React, { useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import { Link } from '@reach/router';

const NewRestaurant = props => {
  const [name, setName] = useState("");
  const [yearEstablished, setYear] = useState("");
  const [status, setstatus] = useState("");
  const [errors, setErrors] = useState({});

  const add = e => {
    e.preventDefault();
    const rest = {name, yearEstablished,status};
    axios.post("http://localhost:8000/api/projects/new", rest)
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
      }).catch(err => {
        console.error(err);
      });
  }
  return (
    <div className="row my-5">
        <Link to='/'>
          <u>Back to dashboard</u>
        </Link>
      <div className="col-sm-8 offset-sm-2">
        <div className="card">
          <div className="card-header bg-dark text-light">Plan a new Project</div>
          <div className="card-body">
            <form onSubmit={add}>
              <div className="form-group">
                <label>Project:</label>
                <input type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)} />
                <p className="text-danger">{errors.name ? errors.name.message: ''}</p>
              </div>
              <div className="form-group">
                <label>Due Date:</label>
                <input type="Date" className="form-control" name="yearEstablished" value={yearEstablished} onChange={e => setYear(e.target.value)}  />
                <p className="text-danger">{errors.yearEstablished ? errors.yearEstablished.message: ''}</p>
              </div>
              <button onClick ={(e) => setstatus('Backlog')} type="submit" value="Plan Project" className="btn btn-info btn-block" >Plan Project</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewRestaurant;