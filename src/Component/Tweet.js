import React, { useEffect,useState  } from 'react';
import Footer from '../Section/Footer';
import Header from'../Section/Header';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Stack,
  VStack,
  Center, 
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  useDisclosure,
  Select,
  Box
} from '@chakra-ui/react';
import { useLocation,useNavigate } from 'react-router-dom'


function Tweet() {
  
  
  const navigate = useNavigate();	
  const location = useLocation();

  const { data } = location.state

	
  const [Sname,setSname]=useState(data)
  const [file,setFile]=useState("")
  

 // const { isOpen, onOpen, onClose } = useDisclosure()

  const { isOpen:isOpenTweet, onOpen:onOpenTweet, onClose:onCloseTweet } = useDisclosure()


  const initialRef = React.useRef()
  const finalRef = React.useRef()
 
   const details = {
     story:data
   }
   const [tweet, setTweet] = useState([]);
   
   const [Annotater1, setAnnotator1] = useState([]);
   const [Annotater2, setAnnotator2] = useState([]);

   const [token,setToken] = useState("");
   const [role_,setrole_] = useState("");
   const [status,setStatus]=useState(false);	

   const[OpenModal,setOpenModal]=useState("");
   
   
   const onClose=()=>{
	   setOpenModal("");
   }
   
	const FileSubmit = async() => {
    //e.preventDefault();
	const formData= new FormData();
	
	for (let i=0;i<file.length;i++){
		formData.append('files',file[i],file[i].name)
	}
	
	formData.append('story',Sname)
	await fetch('http://localhost:3000/tweets/add',{
		method:'POST',
		headers: {
		'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
	
	window.location.reload()
	{/*.then(data => {window.location.reload()})
	.catch(data => {console.log(data)})
	*/}
  }
  
  function onChange(event){
	  //setFile(this.files[0])
	  setFile(event.target.files)
	  
  }

   const assigned = async (id_) => {
		  let details={"name":Annotater1,"tweet_id":id_,"thirdAnnotator": false}
		  let details2={"name":Annotater2,"tweet_id":id_,"thirdAnnotator": false}
		  const token_ = localStorage.getItem("token");
		  const role__ = localStorage.getItem("role");
			
			await fetch("http://3.87.187.229:5000/tweets/assign",
			{
			method: 'POST',
			headers: {
			'Authorization':  `Bearer ${token_}`,
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(details)}
		 )
		 await fetch("http://3.87.187.229:5000/tweets/assign",
			{
			method: 'POST',
			headers: {
			'Authorization':  `Bearer ${token_}`,
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(details2)}
		 )
		
		window.location.reload()
		
   }
	
	
   useEffect(() => {

      const token_ = localStorage.getItem("token");
      const role__ = localStorage.getItem("role");
  
      
  
      setrole_(role__);
      setToken(token_)

		fetch("http://localhost:3000/tweets/list",
		{
		method: 'POST',
		headers: {
        'Authorization':  `Bearer ${token_}`,
        'Content-Type': 'application/json',
		},
        body: JSON.stringify(details)}
		)
      .then(res => res.json())
      .then(
        (result) => {
          
		  setTweet(Object.freeze(result.data))
        })
        .catch((e) => {console.log(e)})
   },[])
  
   const [Annotaters, setAnnotaters] = useState([]);
   useEffect(() => {

    const token_ = localStorage.getItem("token");
    const role__ = localStorage.getItem("role");

    

    setrole_(role__);
    setToken(token_)

		fetch("http://localhost:3000/users/list",
		{
		method: 'GET',
		headers: {
        'Authorization': `Bearer ${token_}`,
        'Content-Type': 'application/json',
		}}
		)
      .then(res => res.json())
      .then(
        (result) => {
		  setAnnotaters(result.data)
        })
   },[])
  
   return (
    <>
     <Header/>
     <Stack>
       <br/>
       <Center>
       <Heading as='h4' size='md' color='teal' >{data} Tweet</Heading>
       </Center>
       <br/>
       <VStack padding={'20px'}>
        <Table >
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tweet</Th>
              <Th>Annotators</Th>                       
            </Tr>
          </Thead>
          <Tbody>
            {tweet.map((tweets) => {
				const tweetid=tweets.tweet_id;
				
				return (
              <Tr key={tweets.tweet_id}>
                     <Td >
                            {tweets.tweet_id}
                      </Td>
                      <Td>
                            {tweets.tweet}
                      </Td>
                      <Td  >
						  {tweets.assignedTo.length !== 0 ? <Text>{tweets.assignedTo}</Text>: <Button colorScheme='blue' padding={'20px'} onClick={()=>{setOpenModal(tweets.tweet_id)}} style={{cursor:"pointer"}}>Assign</Button>}
                      </Td>
                      <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={OpenModal===tweets.tweet_id}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Annotators</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
				
				<Select  placeholder='Annotator 1' onChange={(e) => setAnnotator1(e.target.value)}>
			  {Annotaters.map((annotator)=>(
			  <option key={annotator.ID} value={annotator.name}>{annotator.name}</option>
				))}
				</Select>
				<br/>
				<Select  placeholder='Annotator 2' onChange={(e) => setAnnotator2(e.target.value)}>
			  {Annotaters.map((annotator)=>(
			  <option key={annotator.ID} value={annotator.name}>{annotator.name}</option>
				))}
			</Select>
				
              
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>{assigned(tweetid)}}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
	  </Modal>
			</Tr>)})}
              </Tbody>
            
        </Table>
      </VStack>
	  </Stack> 
      <Center>    
      <Button onClick={onOpenTweet} colorScheme='blue' padding={'20px'}>
            Add Tweet
      </Button>
      <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpenTweet}
          onClose={onCloseTweet}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Tweet</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>{data} story</FormLabel>
                {/* <Input ref={initialRef} placeholder='name' onChange={(e) => setname(e.target.value)} /> */}
              </FormControl>
			  <form>
			  <input type="file" placeholder="file" accept=".json" onChange={onChange} multiple/>
			  </form>
			</ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={FileSubmit}>
                Submit
              </Button>
              <Button onClick={onCloseTweet}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
	  </Modal>
            
      </Center>
	  <br/>
	  <br/>
      <div style={{position:"fixed",bottom:0,left:0,right:0}} >
        <Footer/>
      </div>
    </>
   )
}
 
export default Tweet;
