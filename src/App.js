import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tweet from './Component/Tweet';
import Story_Add from './Component/Story_Add';
import User_Details from './Component/User_Details';
import Annotation from './Component/Annotation';
import Login from './Component/Login';
import Comments from './Component/Comments';
import Replies from './Component/Replies';
import { useNavigate } from "react-router-dom"

function App() {
  
  const navigate = useNavigate();
	
  return (
    <Routes>
		  <Route path="/"  element={ <Login /> }/>
		  
		  <Route path="/Tweet" element={(localStorage.getItem("role") === "1")? <Tweet /> : <Login/>}/>
		  <Route path="/Story_Add" element={(localStorage.getItem("role") === "1")? <Story_Add /> : <Login/>}/>
		  <Route path="/User_Details"  element={ (localStorage.getItem("role") === "1")? <User_Details /> : <Login/> }/> 
		  
		 
		  <Route path="/Annotation"  element={(localStorage.getItem("role") === "2")? <Annotation /> : <Login/>}/>
		  <Route path="/Comments"  element={(localStorage.getItem("role") === "2")? <Comments /> : <Login/>}/>
		  <Route path="/Replies"  element={(localStorage.getItem("role") === "2")? <Replies /> : <Login/>}/>
	</Routes>
	
  );
}

export default App;
{/*
<Route path="/Annotation"  element={ <Protected_User Cmp1={ <Annotation />  }/>} />
		  <Route path="/Comments"  element={ <Protected_User Cmp1={ <Comments />  }/>}/>
		  <Route path="/Replies"  element={ <Protected_User Cmp1={ <Replies />}/>}/>
		  
*/}