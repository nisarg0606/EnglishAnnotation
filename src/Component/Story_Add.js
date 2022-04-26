import React, { useEffect,useState  } from 'react'; 
import Header from '../Section/Header';
import Footer from '../Section/Footer';

import {
  Stack,
  Center, 
  Button,
  Heading,
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure
} from '@chakra-ui/react';
import {Link} from 'react-router-dom'

function Story_Add(){
	

   const [story, setStory] = useState([]);
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [title, setTitle] = useState('');
   const initialRef = React.useRef()
   const finalRef = React.useRef()

   
  const [token,setToken] = useState("");
  const [role_,setrole_] = useState("");

	
  const handleSubmit = () => {
	//e.preventDefault();
	let details={title}
	fetch('http://localhost:3000/story/create',{
		method:'POST',
		headers: {
		'Authorization': `Bearer ${token}`,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(details)
	})
	  .then(data => {window.location.reload()})
	  .catch(data => {console.log(data)})

  }
  
  
	useEffect(() => {

    const token_ = localStorage.getItem("token");
    const role__ = localStorage.getItem("role");

    console.log("Data",token_,role__)

    setrole_(role__);
    setToken(token_)

		
		fetch("http://localhost:3000/story/list",
		{
		method: 'GET',
		headers: {
        'Authorization': `Bearer ${token_}`,
		'Content-Type': 'application/json'
		}})
      .then(res => res.json())
      .then(
        (result) => {
		  setStory(result.data)
        })
   },[])
   
   
	return(
		<>
	<Header/>
     <Stack>
       <br/>
       <Center>
       <Heading as='h4' size='md' color='teal' >Story </Heading>
       </Center>
       <br/>
	   <TableContainer padding={'20px'}>
        <Table >
          <Thead>
            <Tr>
              <Th>Story</Th>
			  <Th>Tweets</Th> 
            </Tr>
          </Thead>
          <Tbody>
            {story.map((story) => (
              <Tr key={story.ID}>
                     <Td >
						{story.title}
                      </Td>
					  <Td >
                            <Link to= "/Tweet"	state= {{data:story.title}}
							style={{ color: "#3182CE" }}>Tweets</Link>
                      </Td>
                     
                </Tr>))}
              </Tbody>
            
        </Table>
      </TableContainer>
      </Stack> 
		 <Center>    
      <Button onClick={onOpen} colorScheme='blue' padding={'20px'}>
            Add Story
      </Button>
      <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Story</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Story</FormLabel>
                <Input ref={initialRef} placeholder='Story Name' onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
      </Center>
      <div style={{position:"fixed",bottom:0,left:0,right:0}} >
        <Footer/>
      </div>
    </>
	)
	
}


export default Story_Add