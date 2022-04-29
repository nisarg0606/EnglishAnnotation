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
Select,
VStack,
HStack,
Button} from "@chakra-ui/react";

function Annotation(){
	
  const [flag,setFlag]=useState(0);
	
  const handleLabel = async(main_tweet_id,tweet_id)=>{
	    setFlag(flag+1)
	    const token_ = localStorage.getItem("token");
		const role__ = localStorage.getItem("role");
	
		let details={main_tweet_id,tweet_id,label}
	    await fetch('http://localhost:3000/tweets/submit',{
		method:'POST',
		headers: {
		'Authorization': `Bearer ${token_}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
	if(flag===5){
		window.location.reload()
		setFlag(0)
	}
  }
  
  const [label, setLabel] = useState([]);
  const [tweet, setTweets] = useState([]);
   useEffect(() => {

	
    const token_ = localStorage.getItem("token");
    const role__ = localStorage.getItem("role");
	
	fetch("http://localhost:3000/users/assigned-tweets?thirdAnnotator=false",
		{
		method: 'GET',
		headers: {
        'Authorization': `Bearer ${token_}`,
		}}
		)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
		  setTweets(result.data.tweets)
        })
   },[])
  return(
    <>
      <AHeader/>
	  <VStack padding={'20px'}>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Status</Th>
              <Th>Annotate</Th>                       
            </Tr>
          </Thead>
		  <Tbody>
		  {tweet.map((tweets) => (
              <Tr key={tweets.tweets_id} >
                     <Td >
						{tweets.tweet_id}
                      </Td>
                      <Td >
                            {tweets.tweet}
                      </Td>
                      <Td padding={'10px'} >
							<form>
							<HStack>
							<Select  placeholder='label' onChange={(e) => setLabel(e.target.value)} size="sm" width="60px">
							  <option value="NOT">NOT</option>
							  <option value="CHOF">CHOF</option>
							</Select>
							
                            <span> </span>
							{/*tweets.tweet_id,tweets.tweet_id*/}
                            <Button bgColor={"green.200"} onClick={()=>{handleLabel(tweets.tweet_id,tweets.tweet_id)}}>Save</Button> 
							</HStack>
							</form>
							
					  </Td>
                     
		  </Tr>))}
		   </Tbody>            
        </Table>
      </VStack>
	  
      <div style={{position:"fixed",bottom:0,left:0,right:0}} >
        <Footer/>
      </div>
    </>
  );
  }
  
export default Annotation;