import React from "react";
import AHeader from "../Section/AHeader";
import Footer from "../Section/Footer";
import {Table,
TableContainer,
Tbody,
Td,
Tr,
Thead,
Th,
Button,
Accordion,
AccordionItem,
AccordionButton,
AccordionPanel,
AccordionIcon} from "@chakra-ui/react";

function Replies(){
  return(
    <>
      <AHeader/>
      <Accordion allowToggle padding={"10px"}>
        <AccordionItem>
          <h2>
          <Table flex={'1'} >
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Status</Th>
                    <Th>Label</Th>                       
                  </Tr>
                </Thead>
            
              
              <Tbody>
              <Tr bgColor={'green.200'} >
              
                     <Td >
                            123
                      </Td>
                      <Td >
                            Manusmriti #No
                      </Td>
                      <Td padding={'10px'}>
                      <AccordionButton>
                      
                            Not
                      <AccordionIcon />
                      </AccordionButton>
                      </Td>                     
              
            
            </Tr>
              </Tbody>   
              </Table>
              
          </h2>
          <AccordionPanel>
          <Accordion allowToggle padding={"10px"}>
        <AccordionItem>
          <h2>
          <Table flex={'1'} >
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Status</Th>
                    <Th>Label</Th>                       
                  </Tr>
                </Thead>
            
              
              <Tbody>
              <Tr bgColor={'green.200'} >
              
                     <Td >
                            123
                      </Td>
                      <Td >
                            Manusmriti #No
                      </Td>
                      <Td padding={'10px'}>
                      <AccordionButton>
                      
                            Not
                      <AccordionIcon />
                      </AccordionButton>
                      </Td>                     
              
            
            </Tr>
              </Tbody>   
              </Table>
              
          </h2>
          <AccordionPanel>
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
                          <Tr >
                                <Td >
                                        123
                                  </Td>
                                  <Td >
                                        Manusmriti #No
                                  </Td>
                                  <Td padding={'10px'}>
                                        <Button bgColor={"red.200"}>Against</Button>
                                        <span> </span>
                                        <Button bgColor={"green.200"}>Support</Button> 
                                  </Td>
                                
                            </Tr>
                          </Tbody>
                        
                    </Table>
                  </TableContainer>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
        
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
        
      <div style={{position:"fixed",bottom:0,left:0,right:0}} >
        <Footer/>
      </div>    
    </>
  );
  }
  
export default Replies;