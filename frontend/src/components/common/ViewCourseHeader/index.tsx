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
  Tooltip,
} from '@chakra-ui/react';
import { BsCalendar } from 'react-icons/bs';
import { MdChevronRight, MdShoppingCart } from 'react-icons/md';
import React from 'react';
import { CourseRating } from '../CourseRating';
import { AuthorBox } from '../AuthorBox';

interface Props {
  title: string;
  description: string;
  photo: string;
  authorFirstName: string;
  authorLastName: string;
  authorPhotoFn: string;
  category: string;
  subcategory: string;
}

export const ViewCourseHeader: React.FC<Props> = ({
  title,
  description,
  photo,
  authorFirstName,
  authorLastName,
  authorPhotoFn,
  category,
  subcategory,
}) => (
  <Box pb="3">
    <Breadcrumb
      pt={{ md: '3', base: '1' }}
      spacing="8px"
      separator={<MdChevronRight color="gray.500" />}
    >
      <BreadcrumbItem>
        <Tooltip label="All courses">
          <BreadcrumbLink href="/dashboard">All</BreadcrumbLink>
        </Tooltip>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <Tooltip label="Category">
          <BreadcrumbLink href="#">{category}</BreadcrumbLink>
        </Tooltip>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <Tooltip label="Subcategory">
          <BreadcrumbLink href="#">{subcategory}</BreadcrumbLink>
        </Tooltip>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <Tooltip label="Course">
          <BreadcrumbLink>{title}</BreadcrumbLink>
        </Tooltip>
      </BreadcrumbItem>
    </Breadcrumb>
    <Image
      display={{ md: 'none', base: 'block' }}
      mt={{ md: '0', base: '10px' }}
      src="gibbresh.png"
      // fallbackSrc="https://via.placeholder.com/750x350"
      fallbackSrc={photo}
    />
    <Heading
      as="h1"
      size="xl"
      fontSize={{ md: '4xl', base: 'xl' }}
      mt={{ md: '30px', base: '15px' }}
    >
      {title}
    </Heading>
    <Text mt="3">{description}</Text>
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
    <AuthorBox
      firstName={authorFirstName}
      lastName={authorLastName}
      photoFn={authorPhotoFn}
    />
    <Text mt="1">
      <Icon w="3" h="3" as={BsCalendar} /> 06.02.2021 - data wydania
    </Text>
  </Box>
);
