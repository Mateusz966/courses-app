import {
  Box,
  Accordion,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Heading,
  List,
  ListItem,
  ListIcon,
  Link,
  Text,
  HStack,
} from '@chakra-ui/react';
import { MdVideoLibrary } from 'react-icons/md';
import { FC } from 'react';

export const CourseSyllabus: FC = () => (
  <Box>
    <Heading as="h2" size="lg" mb="7">
      Program kursu
    </Heading>
    <Accordion allowMultiple>
      <AccordionItem>
        <Heading as="h3">
          <AccordionButton
            bg="gray.100"
            pt="3"
            pb="3"
            fontW="500"
            fontSize="18px"
            _expanded={{ bg: 'gray.500', color: 'white' }}
          >
            <Box flex="1" textAlign="left">
              Moduł pierwszy{' '}
              <Text fontSize="14px" color="teal.400" mt="3px">
                Sprawdź pierwszą lekcję za darmo!
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        {/* Możemy zrobić tak, że gościu robi sobie pierwszą lekcję open dla wszystkich? Albo wyższy level ale dużo zabawy z tym, że robi PODGLĄD / TRAILER czyli niby pierwsza lekcja ale to jest specjalne video które ma inną treść... choć równie dobrez to może być pod opisem kursu takie SPRAWDZ TRAILER. Do przemyślenia */}
        <AccordionPanel
          pb={5}
          borderLeft="1px solid #EEE"
          borderRight="1px solid #EEE"
        >
          <List spacing={3}>
            <ListItem>
              <Link
                to="#"
                display="flex"
                color="green.500"
                _hover={{ color: 'teal.400', textDecor: 'none' }}
              >
                <HStack w="100%" justifyContent="flex-end">
                  <ListIcon as={MdVideoLibrary} />
                  <Text mr="auto">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </Text>
                  <Text fontW="600" ml="auto">
                    Darmowa
                  </Text>
                  <Text color="gray.600">15 min.</Text>
                </HStack>
              </Link>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </Text>
                <Text color="gray.600">5 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">7 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Ferado, amigo illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">12 min.</Text>
              </HStack>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <Heading as="h3">
          <AccordionButton
            bg="gray.100"
            pt="3"
            pb="3"
            fontW="500"
            fontSize="18px"
            _expanded={{ bg: 'gray.500', color: 'white' }}
          >
            <Box flex="1" textAlign="left">
              Moduł drugi
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel
          pb={5}
          borderLeft="1px solid #EEE"
          borderRight="1px solid #EEE"
        >
          <List spacing={3}>
            <ListItem>
              <Link
                to="#"
                display="flex"
                color="green.500"
                _hover={{ color: 'teal.400', textDecor: 'none' }}
              >
                <HStack w="100%" justifyContent="flex-end">
                  <ListIcon as={MdVideoLibrary} />
                  <Text mr="auto">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </Text>
                  <Text fontW="600" ml="auto">
                    Darmowa
                  </Text>
                  <Text color="gray.600">9 min.</Text>
                </HStack>
              </Link>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </Text>
                <Text color="gray.600">5 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">7 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Ferado, amigo illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">12 min.</Text>
              </HStack>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <Heading as="h3">
          <AccordionButton
            bg="gray.100"
            pt="3"
            pb="3"
            fontW="500"
            fontSize="18px"
            _expanded={{ bg: 'gray.500', color: 'white' }}
          >
            <Box flex="1" textAlign="left">
              Moduł trzeci
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel
          pb={5}
          borderLeft="1px solid #EEE"
          borderRight="1px solid #EEE"
        >
          <List spacing={3}>
            <ListItem>
              <Link
                to="#"
                display="flex"
                color="green.500"
                _hover={{ color: 'teal.400', textDecor: 'none' }}
              >
                <HStack w="100%" justifyContent="flex-end">
                  <ListIcon as={MdVideoLibrary} />
                  <Text mr="auto">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </Text>
                  <Text fontW="600" ml="auto">
                    Darmowa
                  </Text>
                  <Text color="gray.600">5 min.</Text>
                </HStack>
              </Link>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </Text>
                <Text color="gray.600">5 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">7 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Ferado, amigo illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">12 min.</Text>
              </HStack>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <Heading as="h3">
          <AccordionButton
            bg="gray.100"
            pt="3"
            pb="3"
            fontW="500"
            fontSize="18px"
            _expanded={{ bg: 'gray.500', color: 'white' }}
          >
            <Box flex="1" textAlign="left">
              Moduł czwarty
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel
          pb={5}
          borderLeft="1px solid #EEE"
          borderRight="1px solid #EEE"
        >
          <List spacing={3}>
            <ListItem>
              <Link
                to="#"
                display="flex"
                color="green.500"
                _hover={{ color: 'teal.400', textDecor: 'none' }}
              >
                <HStack w="100%" justifyContent="flex-end">
                  <ListIcon as={MdVideoLibrary} />
                  <Text mr="auto">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </Text>
                  <Text fontW="600" ml="auto">
                    Darmowa
                  </Text>
                  <Text color="gray.600">10 min.</Text>
                </HStack>
              </Link>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </Text>
                <Text color="gray.600">5 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">7 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Ferado, amigo illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">12 min.</Text>
              </HStack>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <Heading as="h3">
          <AccordionButton
            bg="gray.100"
            pt="3"
            pb="3"
            fontW="500"
            fontSize="18px"
            _expanded={{ bg: 'gray.500', color: 'white' }}
          >
            <Box flex="1" textAlign="left">
              Moduł piąty
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel
          pb={5}
          borderLeft="1px solid #EEE"
          borderRight="1px solid #EEE"
        >
          <List spacing={3}>
            <ListItem>
              <Link
                to="#"
                display="flex"
                color="green.500"
                _hover={{ color: 'teal.400', textDecor: 'none' }}
              >
                <HStack w="100%" justifyContent="flex-end">
                  <ListIcon as={MdVideoLibrary} />
                  <Text mr="auto">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </Text>
                  <Text fontW="600" ml="auto">
                    Darmowa
                  </Text>
                  <Text color="gray.600">45 min.</Text>
                </HStack>
              </Link>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </Text>
                <Text color="gray.600">5 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">7 min.</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack w="100%" justifyContent="flex-end">
                <ListIcon as={MdVideoLibrary} color="gray.600" />
                <Text mr="auto">
                  Ferado, amigo illum quis sed voluptatum quae eum fugit earum
                </Text>
                <Text color="gray.600">12 min.</Text>
              </HStack>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Box>
);
