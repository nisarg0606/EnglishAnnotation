import React from "react";
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

function Login() {
	
	
	const navigate = useNavigate();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	
	const [showPassword, setShowPassword] = useState(false);
	const CFaUserAlt = chakra(FaUserAlt);
	const CFaLock = chakra(FaLock);

	
	useEffect(()=>{
		if(localStorage.getItem('id')===1){
			navigate("/User_Details")
		}
	})
	
	
	async function loginUser(credentials) {
    
    
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
		'withCredentials': true
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
   
   const handleShowClick = () => setShowPassword(!showPassword);
   
	const handleLogin = async(e) =>{
		e.preventDefault();
		const response = await loginUser({
		  email,
		  password
		});
		localStorage.setItem("token",response.data.token)
		localStorage.setItem("role",response.data.user.role)
		localStorage.setItem("id",response.data.user._id)
		
		if (response.data.token) {
			
		  if (response.data.user.role === 1)
		  {
        console.log("Admin")
        navigate("/User_Details")  
		  console.log("Admin",response)}
		  else
		  {
        navigate("/Annotation")  
		   console.log("User",response)}
		} else {
			console.log("Failed",response)
		
	}}
	
  return (
    <>
	<Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      bgGradient='linear(blue.100, blue.500)'
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >

        <Heading color="blue.900">HASOC 2022</Heading>
        <Box minW={{ base: "50%", md: "468px" }} >
          <form onSubmit={handleLogin}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.400" />}
                  />
                  <Input type="email" placeholder="email address"
                  onChange={(e) => setEmail(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.400" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
	</>
  );
}


export default Login;
