import {
    Box,
    Flex,
    Avatar,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
    Image
  } from '@chakra-ui/react';
  import {FaHome} from 'react-icons/fa';
  import HASOC_2022 from '../Images/HASOC_2022.png';
  import { useNavigate } from "react-router-dom"
  
  export default function Header() {
  
	const navigate = useNavigate();
	const logout = () => {
		localStorage.clear();
		navigate("/")
	}
	
    return (
      <>
        <Box px={4} bgColor={"blue.400"}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            
            <HStack spacing={8} alignItems={'center'}>
              <HStack
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                    <Image
                        height={'50px'}
                        src={HASOC_2022}/>
                    <Link
                  p={2}
                  href={'/User_Details'}
                  fontSize={'sm'}
                  fontWeight={500}
                  _hover={{ bg: 'blue.100' }}>Users</Link>
					<Link
                  p={2}
                  href={'/Story_Add'}
                  fontSize={'sm'}
                  fontWeight={500}
                  _hover={{ bg: 'blue.100' }}>Story</Link>
                    
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://bit.ly/broken-link'
                    }
                  />
                </MenuButton>
                <MenuList>

                    <MenuItem onClick={logout}>Logout</MenuItem>
  
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
  
        </Box>
      </>
    );
  }