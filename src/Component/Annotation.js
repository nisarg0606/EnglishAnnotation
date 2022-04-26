import React from "react";
import AHeader from "../Section/AHeader";
import Footer from "../Section/Footer";
import { useEffect,useState  } from 'react'; 
import {Table,
TableContainer,
Tbody,
Td,
Tr,
Thead,
Th,
Button} from "@chakra-ui/react";

function Annotation(){
	
  function handleLabel(Label){
		let details={Label}
	    fetch('http://localhost:3000/submit',{
		method:'POST',
		headers: {
		'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJhZWI5YjAxOGJjNDJmMDVlOGYyMTMiLCJyb2xlIjoiMiIsImlhdCI6MTY1MDk1NzkzMX0.ytvkwG4RGhzGrNBlDqkiQYkEl-tv975d2HFRbX47wF4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then(data => {window.location.reload()})
	  .catch(data => {console.log(data)})
  }
  
  
  const [label, setLabel] = useState();
   useEffect(() => {
		fetch("http://localhost:3000/users/assigned-tweets?thirdAnnotator=false",
		{
		method: 'GET',
		headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJhZWI5YjAxOGJjNDJmMDVlOGYyMTMiLCJyb2xlIjoiMiIsImlhdCI6MTY1MDk1NzkzMX0.ytvkwG4RGhzGrNBlDqkiQYkEl-tv975d2HFRbX47wF4',
        'Content-Type': 'application/json',
		}}
		)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          var temp = [];
          temp.push(result.data)
          console.log("Tempo array",temp)
		      setLabel(temp)
        })
   },[])
  return(
    <>
      <AHeader/>
      <TableContainer padding={'20px'}>
        <Table >
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Status</Th>
              <Th>Annotate</Th>                       
            </Tr>
          </Thead>
		  <Tbody>
            {label && label.map((labels) => (
              <Tr key={labels.ID}>
                     <Td >
                            {labels.tweets.tweet_id}
                      </Td>
                      <Td >
                            {labels.tweets.tweet}
                      </Td>
                      <Td padding={'10px'}>
							<Button bgColor={"red.200"} onClick={handleLabel("HOF")} >HOF</Button>
                            <span> </span>
                            <Button bgColor={"green.200"} onClick={handleLabel("NOT")}>Not</Button> 
                      </Td>
                     
                </Tr>))}
              </Tbody>            
        </Table>
      </TableContainer>
      <div style={{position:"fixed",bottom:0,left:0,right:0}} >
        <Footer/>
      </div>
    </>
  );
  }
  
export default Annotation;