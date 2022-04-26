import {
    Box,
    Link
  } from '@chakra-ui/react';
  import { useEffect,useState  } from 'react';
  
  
  export default function Footer() {

    const[year,setYear] = useState();

    useEffect(() => {
      const temp = new Date();
      const tyear = temp.getFullYear();
      console.log()
      setYear(tyear)
    },[])

    return (
      <Box
        bg={'blue.50'}
        color={'gray.700'}>
            <Box
            borderTopWidth={1}
            borderStyle={'solid'}
            textAlign={'center'}>
                <Link
                  p={2}
                  href={'https://hasocfire.github.io/hasoc/2022/index.html'}
                  fontSize={'sm'}
                  fontWeight={500}
                  isExternal>
                      © {year} Copyright: Team HASOC
                </Link>
            </Box>
      </Box>
    );
  }