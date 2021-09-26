import {
  HStack,
  VStack,
  Image,
  Text,
  Grid,
  GridItem,
  Icon,
  Link,
} from '@chakra-ui/react';
import { MdVerifiedUser } from 'react-icons/md';
import React from 'react';
import { CourseAuthor } from '../../../app-types';
import { apiUrl } from '../../../config/apiUrl';

type Props = CourseAuthor;

export const AuthorBox: React.FC<Props> = ({ user }) => (
  <HStack mt={{ md: '6', base: '8' }} mb="6">
    <Image
      borderRadius="full"
      boxSize="70px"
      src={`${apiUrl}/user/avatar/${user.id}`}
      alt="avatar placeholder"
    />

    <VStack alignItems="flex-start">
      <Grid
        gridTemplateRows="1fr"
        gridTemplateColumns="fit-content(6px) 1fr"
        gridColumnGap="3"
      >
        <GridItem>
          <Icon color="blue.600" mt="5px" w="6" h="6" as={MdVerifiedUser} />
        </GridItem>
        <GridItem>
          <Link to="#" color="blue.600" fontSize="21px" fontWeight="600">
            {user.firstName} {user.lastName}
          </Link>
          <Text color="#555" fontSize="16px" mt="0">
            Autor kursu
          </Text>
        </GridItem>
      </Grid>
    </VStack>
  </HStack>
);
