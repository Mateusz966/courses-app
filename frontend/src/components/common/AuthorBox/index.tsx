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
// import AvatarPlaceholder from '../../../assets/avatar-placeholder.jpg';

interface Props {
  firstName: string;
  lastName: string;
  photoFn: string;
}

export const AuthorBox: React.FC<Props> = ({
  firstName,
  lastName,
  photoFn,
}) => (
  <HStack mt={{ md: '6', base: '8' }} mb="6">
    <Image
      borderRadius="full"
      boxSize="70px"
      // src={AvatarPlaceholder}
      src={photoFn}
      alt="avatar placeholder"
    />

    <VStack alignItems="flex-start">
      <Grid
        gridTemplateRows="1fr"
        gridTemplateColumns="fit-content(6px) 1fr"
        gridColumnGap="3"
      >
        {/* Badge, że user jest przez nas zweryfikowany */}
        <GridItem>
          <Icon color="blue.600" mt="5px" w="6" h="6" as={MdVerifiedUser} />
        </GridItem>
        <GridItem>
          {/* Po kliknięciu prziekierowanie na podstronę autora i tam jego kursy, jakieś jego bio, może żeby mógł se podać linki do swoich sociali? */}
          <Link to="#" color="blue.600" fontSize="21px" fontWeight="600">
            {firstName} {lastName}
          </Link>
          <Text color="#555" fontSize="16px" mt="0">
            Autor kursu
          </Text>
        </GridItem>
      </Grid>
    </VStack>
  </HStack>
);
