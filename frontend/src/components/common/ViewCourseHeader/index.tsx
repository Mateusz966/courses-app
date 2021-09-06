import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
  Icon,
  HStack,
  Image,
  Button,
} from '@chakra-ui/react';
import { BsCalendar } from 'react-icons/bs';
import { MdChevronRight, MdShoppingCart } from 'react-icons/md';
import { FC } from 'react';
import { CourseRating } from '../CourseRating';
import { AuthorBox } from '../AuthorBox';

export const ViewCourseHeader: FC = () => (
  <Box pb="3">
    <Breadcrumb
      pt={{ md: '3', base: '1' }}
      spacing="8px"
      separator={<MdChevronRight color="gray.500" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Kategoria</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="#">Podkategoria</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Kurs</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Image
      display={{ md: 'none', base: 'block' }}
      mt={{ md: '0', base: '10px' }}
      src="gibbresh.png"
      fallbackSrc="https://via.placeholder.com/750x350"
    />
    <Heading
      as="h1"
      size="xl"
      fontSize={{ md: '4xl', base: 'xl' }}
      mt={{ md: '30px', base: '15px' }}
    >
      Pieniądze to nie wszystko czyli monetyzacja dla każdego
    </Heading>
    <Text mt="3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non dui eu
      ipsum varius facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Vestibulum et tellus odio.
    </Text>
    <CourseRating />
    <Box d={{ md: 'none', base: 'block' }}>
      <HStack>
        <Text color="#e40707" fontSize="32px" fontWeight="600">
          459 zł
        </Text>
        <Text color="gray.400" textDecoration="line-through" fontSize="xl">
          1500 zł
        </Text>
      </HStack>
      <Button
        mt="3"
        leftIcon={<Icon w="5" h="5" as={MdShoppingCart} />}
        colorScheme="teal"
        variant="solid"
        size="lg"
        w="100%"
      >
        Dodaj do koszyka
      </Button>
    </Box>
    <AuthorBox />
    <Text mt="1">
      <Icon w="3" h="3" as={BsCalendar} /> 06.02.2021 - data wydania
    </Text>
  </Box>
);
