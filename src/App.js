import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [name, setname] = useState();
  const [grade, setgrade] = useState();
  const [posts, setpost] = useState([])

  const senddata = (e) => {
    e.preventDefault();
   
    axios.post('http://127.0.0.1:8000/api/student/', {
     name,
     grade

    })
    .then((respons) => { fetchData() })
      .then((err) => { console.log(err) })
  }
     async function deletdata(id){
    await axios.delete(`http://127.0.0.1:8000/api/student/${id}/`,{
      "method": "DELETE",
      mode: "no-cors",

    }).then((respons)=>{fetchData()})
     .catch((err) => {console.log(err)})
  }


  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/api/student/', {
      "method": "GET",
      mode: "no-cors",
    })

      .then((response) => setpost(response.data))
      .catch((err) => console.log(err))


  }

  useEffect(() => {

    fetchData()


  }, [])

  return (

    <div>

      <div style={{ alignItems:'center' }}>
        <input type="text" onChange={(e) => setname(e.target.value)} ></input>
        <input type="text" onChange={(e) => setgrade(e.target.value)}></input>
        <button onClick={senddata}>post</button>

      </div>
      {posts.map((post, key) => {
        return <ul key={key}><li key={key}>
          <h1 key={key}> student={post.name}<br /> grade={post.grade}<button key={key} onClick={()=>deletdata(post.id)}>Delete</button></h1></li></ul>

      })}
    </div>

  );


}

export default App;
