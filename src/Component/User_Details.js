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
  Select
} from '@chakra-ui/react';



function Users() {
	
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setrole] = useState('');
  const [password, setpassword] = useState('');

  const [token,setToken] = useState("");
  const [role_,setrole_] = useState("");
 

	
  const handleSubmit = () => {
    //e.preventDefault();
	let details={name,email,password,role}
	fetch('http://localhost:3000/admin/add-user',{
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
  
   const [users, setUsers] = useState([]);
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
		  setUsers(result.data)
        })
   },[])
  
   return (
    <>
     <Header/>
     <Stack>
       <br/>
       <Center>
       <Heading as='h4' size='md' color='teal' >Users List</Heading>
       </Center>
       <br/>
       <TableContainer padding={'20px'}>
        <Table >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>role</Th>        
              {/*<Th>Assigned</Th>
				<Th>Annotated</Th> */}              
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                     <Td >
                            {user.name}
                      </Td>
                      <Td >
                            {user.email}
                      </Td>
                      <Td>
				   {user.role === 1? <Text>Admin</Text>: <Text>User</Text> }
                      </Td>
					  {/*<Td>
                        {user.assignedTweets}
                     </Td>
                     <Td>
                       {user.annotatedTweets}
					  </Td>*/}
                </Tr>))}
              </Tbody>
            
        </Table>
      </TableContainer>
      </Stack> 
      <Center>    
      <Button onClick={onOpen} colorScheme='blue' padding={'20px'}>
            Add User
      </Button>
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
                <FormLabel>name</FormLabel>
                <Input ref={initialRef} placeholder='name' onChange={(e) => setname(e.target.value)} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
              </FormControl>

              <FormControl mt={4}>
              <FormLabel>role</FormLabel>
              <Select placeholder='role' onChange={(e) => setrole(e.target.value)}>
                <option value='2'>User</option>
                <option value='1'>Admin</option>
              </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>password</FormLabel>
                <Input placeholder='password' onChange={(e) => setpassword(e.target.value)}/>
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
	  <br/>
	  <br/>
      <div style={{position:"fixed",bottom:0,left:0,right:0}} >
        <Footer/>
      </div>
      </>
   )
}
 
export default Users;
