import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tweet from './Component/Tweet';
import Story_Add from './Component/Story_Add';
import User_Details from './Component/User_Details';
import Annotation from './Component/Annotation';
import Login from './Component/Login';
import Comments from './Component/Comments';
import Replies from './Component/Replies';


function App() {
  return (
    <Routes>
		  <Route path="/"  element={ <Login /> }/>
		  <Route path="/Tweet"  element={ <Tweet /> }/>
		  <Route path="/Story_Add"  element={ <Story_Add /> }/>
		  <Route path="/User_Details"  element={ <User_Details /> }/>
		  <Route path="/Annotation"  element={ <Annotation /> }/>
		  <Route path="/Comments"  element={ <Comments /> }/>
		  <Route path="/Replies"  element={ <Replies /> }/>
	</Routes>
	
  );
}

export default App;