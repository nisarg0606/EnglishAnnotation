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

import { useLocation } from 'react-router-dom'


function Tweet() {
	
  const location = useLocation()

  const { data } = location.state

  console.log("AAAAAAA",data)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isOpen:isOpenTweet, onOpen:onOpenTweet, onClose:onCloseTweet } = useDisclosure()


  const initialRef = React.useRef()
  const finalRef = React.useRef()
 
   const details = {
     story:data
   }
   const [tweet, setTweet] = useState([]);


   const [token,setToken] = useState("");
   const [role_,setrole_] = useState("");


   useEffect(() => {

      const token_ = localStorage.getItem("token");
      const role__ = localStorage.getItem("role");
  
      console.log("Data",token_,role__)
  
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
          console.log(result)
		  setTweet(result.data)
        })
        .catch((e) => {console.log(e)})
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
	   <Box>
       <TableContainer padding={'20px'}>
        <Table >
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tweet</Th>
              <Th>Annotators</Th>                       
            </Tr>
          </Thead>
          <Tbody>
            {tweet.map((tweets) => (
              <Tr key={tweets.ID}>
                     <Td >
                            {tweets.tweet_id}
                      </Td>
                      <Td>
                            {tweets.tweet}
                      </Td>
                      <Td onClick={onOpen} style={{cursor:"pointer"}} >
							Assign
                      </Td>
                      <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>story</FormLabel>
                {/* <Input ref={initialRef} placeholder='name' onChange={(e) => setname(e.target.value)} /> */}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => {}}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
	  </Modal>
                </Tr>))}
              </Tbody>
            
        </Table>
      </TableContainer>
	  </Box>
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
                <FormLabel>story</FormLabel>
                {/* <Input ref={initialRef} placeholder='name' onChange={(e) => setname(e.target.value)} /> */}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => {}}>
                Submit
              </Button>
              <Button onClick={onCloseTweet}>Cancel</Button>
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
 
export default Tweet;
