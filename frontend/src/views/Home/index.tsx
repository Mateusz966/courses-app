import {
  Box,
  Grid,
  GridItem,
  Image,
  Container,
  Heading,
  HStack,
  VStack,
  Link,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FC } from 'react';
import {
  MdVerifiedUser,
  MdThumbUp,
  MdSupervisedUserCircle,
} from 'react-icons/md';
import { history } from '../../config/history';
import { TopNavBar } from '../../components/common/TopNavbar';
import { Button } from '../../components/common/Button';
import { CourseRating } from '../../components/common/CourseRating';
import MainHomePageImg from '../../assets/student-in-class-looking-at-course.jpg';
import CourseFirst from '../../assets/kurs-1.jpg';
import CourseSecond from '../../assets/kurs-2.jpg';
import CourseThird from '../../assets/kurs-3.jpg';
import CourseFourth from '../../assets/kurs-4.jpg';
import CourseAuthorsImg from '../../assets/young-woman-teaching-students-in-english-class-online.jpg';

const Home: FC = () => (
  <Box>
    <TopNavBar />
    <Container maxW="90vw">
      <Grid
        gridTemplateRows="1fr"
        gridTemplateColumns="1fr 1fr"
        gridColumnGap="3"
      >
        <GridItem>
          <Link to="#" color="blue.600" fontSize="21px" fontWeight="600" />
          <Heading fontSize="42px" mt="160px" mb="30px">
            Znajdź idealny kurs <Text color="#2c7a7b">dla siebie</Text>
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            accusamus ipsum sint. Autem est officia delectus eum? Aperiam
            distinctio vel minima cupiditate a repudiandae sint iusto omnis
            praesentium? Earum, dolorem!
          </Text>
          <Box w="360px" maxW="100%" mt="35px">
            <Grid
              templateColumns={{
                lg: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                base: '1',
              }}
              gap={3}
            >
              <Button
                mt0
                size="lg"
                type="button"
                onClick={() => history.push('/dashboard/course/list')}
              >
                Nasze kursy
              </Button>
              <Button
                mt0
                size="lg"
                type="button"
                onClick={() => history.push('/sign-up')}
                variant="outline"
              >
                Dla twórców
              </Button>
            </Grid>
          </Box>
        </GridItem>
        <GridItem p="30px">
          <Box position="relative">
            <Image src={MainHomePageImg} margin="auto" objectFit="cover" />
            <Box
              position="absolute"
              top="15px"
              right="15px"
              background="teal.600"
              w="100%"
              h="100%"
              zIndex="-1"
            />
          </Box>
        </GridItem>
      </Grid>
    </Container>
    <Container maxW="90vw" mt="70px" pb="130px">
      <Text textTransform="uppercase" color="#2c7a7b" fontWeight="medium">
        Sprawdź teraz
      </Text>
      <Heading as="h2">Polecane kursy</Heading>
      <Grid
        templateColumns={{
          lg: 'repeat(4, 1fr)',
          md: 'repeat(2, 1fr)',
          base: '1',
        }}
        gap={6}
      >
        <GridItem>
          <VStack alignItems="flex-start">
            <Box>
              <Image src={CourseFirst} margin="auto" p="30px" />
            </Box>
            <CourseRating />
            <Text color="#555" fontSize="16px" mt="0">
              <Icon
                color="blue.600"
                mt="-2px"
                mr="4px"
                w="4"
                h="4"
                as={MdVerifiedUser}
              />
              Artur Kowalski
            </Text>
            <Link to="#" color="teal.600" fontSize="21px" fontWeight="600">
              50 pomysłów na trening siłowy
            </Link>
            <Text color="red.500" fontSize="21px" mt="0" fontWeight="500">
              199,99 zł
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack alignItems="flex-start">
            <Box>
              <Image src={CourseSecond} margin="auto" p="30px" />
            </Box>
            <CourseRating />
            <Text color="#555" fontSize="16px" mt="0">
              Marian Woźniak
            </Text>
            <Link to="#" color="teal.600" fontSize="21px" fontWeight="600">
              Tworzenie aplikacji internetowych
            </Link>
            <Text color="red.500" fontSize="21px" mt="0" fontWeight="500">
              490,99 zł
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack alignItems="flex-start">
            <Box>
              <Image src={CourseThird} margin="auto" p="30px" />
            </Box>
            <CourseRating />
            <Text color="#555" fontSize="16px" mt="0">
              <Icon
                color="blue.600"
                mt="-2px"
                mr="4px"
                w="4"
                h="4"
                as={MdVerifiedUser}
              />
              Joanna Nowak
            </Text>
            <Link to="#" color="teal.600" fontSize="21px" fontWeight="600">
              Yoga dla każdego
            </Link>
            <Text color="red.500" fontSize="21px" mt="0" fontWeight="500">
              399,99 zł
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack alignItems="flex-start">
            <Box>
              <Image src={CourseFourth} margin="auto" p="30px" />
            </Box>
            <CourseRating />
            <Text color="#555" fontSize="16px" mt="0">
              Kasia Stachowiak
            </Text>
            <Link to="#" color="teal.600" fontSize="21px" fontWeight="600">
              Podstawy programowania w JavaScript
            </Link>
            <Text color="red.500" fontSize="21px" mt="0" fontWeight="500">
              199,99 zł
            </Text>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
    <Box background="teal.600" pt="80px" pb="80px" mb="100px" color="#fff">
      <Container maxW="90vw">
        <Text textTransform="uppercase" color="#eee" fontWeight="medium">
          Korzyści
        </Text>
        <Heading mb="35px">
          Kursy najwyższej jakości, które zmienią Twoje życie!
        </Heading>
        <Grid
          templateColumns={{
            lg: 'repeat(3, 1fr)',
            md: '1fr',
            base: '1fr',
          }}
          gap={6}
        >
          <GridItem textAlign="center" mt="25px">
            <Icon mb="15px" w="45px" h="45px" as={MdVerifiedUser} />
            <Text fontSize="21px" mt="0" mb="15px" fontWeight="500">
              Wysoka jakość kursów
            </Text>
            <Text>
              Tylko zweryfikowani autorzy, co gwarantuje wysoką jakość kursów i
              duże zadowolenie kursantów
            </Text>
          </GridItem>
          <GridItem textAlign="center" mt="25px">
            <Icon mb="15px" w="45px" h="45px" as={MdThumbUp} />
            <Text fontSize="21px" mt="0" mb="15px" fontWeight="500">
              Śledź swoje postępy na każdym urządzeniu
            </Text>
            <Text>
              Niezależnie od tego czy jedną z lekcji zrobisz na telefonie w
              trakcie podróży autobusem, wracając do domu na komputerze Twoje
              postępy będą zapisane!
            </Text>
          </GridItem>
          <GridItem textAlign="center" mt="25px">
            <Icon mb="15px" w="45px" h="45px" as={MdSupervisedUserCircle} />
            <Text fontSize="21px" mt="0" mb="15px" fontWeight="500">
              Ucz się od specjalistów z wieloletnim doświadczeniem
            </Text>
            <Text>
              Na naszej platformie znajdziesz najlepszych specjalistów, dzięki
              temu masz pewność, że wiedza, którą pozyskasz zmieni Twoje życie.
            </Text>
          </GridItem>
        </Grid>
      </Container>
    </Box>
    <Container maxW="90vw" pb="130px">
      <Text textTransform="uppercase" color="#2c7a7b" fontWeight="medium">
        odkrywanie
      </Text>
      <Heading as="h2">Najpopularniejsze kategorie</Heading>
      <Grid
        templateColumns={{
          lg: 'repeat(4, 1fr)',
          md: 'repeat(2, 1fr)',
          base: '1',
        }}
        gap={6}
      >
        <GridItem>
          <VStack alignItems="flex-start">
            <Box>
              <Image src={CourseFourth} margin="auto" p="30px" />
            </Box>
            <Link to="#" color="teal.600" fontSize="21px" fontWeight="600">
              Programowanie
            </Link>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack alignItems="flex-start">
            <Box>
              <Image src={CourseSecond} margin="auto" p="30px" />
            </Box>
            <Link to="#" color="teal.600" fontSize="21px" fontWeight="600">
              Projektowanie
            </Link>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack alignItems="flex-start">
            <Box>
              <Image src={CourseFirst} margin="auto" p="30px" />
            </Box>
            <Link to="#" color="teal.600" fontSize="21px" fontWeight="600">
              Sport
            </Link>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack alignItems="flex-start">
            <Box>
              <Image src={CourseThird} margin="auto" p="30px" />
            </Box>
            <Link to="#" color="teal.600" fontSize="21px" fontWeight="600">
              Zdrowie
            </Link>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
    <Container maxW="90vw" mb="250px">
      <Grid
        gridTemplateRows="1fr"
        templateColumns={{
          lg: '5fr 4fr',
          md: '1fr',
          base: '1fr',
        }}
        gridColumnGap="6"
      >
        <GridItem>
          <Heading fontSize="42px" mt="60px" mb="30px">
            Jesteś twórcą? Stworzenie kursu
            <Text color="#2c7a7b">Nigdy nie było tak proste!</Text>
          </Heading>
          <Text>
            Tworzenie kursu nigdy nie było tak proste! Nie musisz być
            informatykiem, łatwo przeprowadzimy Cię przez kolejne kroki
            dodawania kursu.
          </Text>
          <Box w="310px" maxW="100%" mt="35px">
            <HStack spacing={3}>
              <Button
                mt0
                size="lg"
                type="button"
                onClick={() => history.push('/sign-up')}
              >
                Zarejestruj
              </Button>
              <Button
                mt0
                size="lg"
                type="button"
                onClick={() => history.push('/sign-in')}
                variant="outline"
              >
                Zaloguj
              </Button>
            </HStack>
          </Box>
          <Grid
            position="relative"
            mt="70px"
            pt="5"
            pb="1"
            pr="9"
            templateColumns={{
              lg: 'repeat(3, 1fr)',
              md: 'repeat(3, 1fr)',
              base: '1',
            }}
            gap={4}
          >
            <Box
              position="absolute"
              top="15px"
              right="15px"
              background="#eee"
              w="190%"
              h="100%"
              left="-50%"
              zIndex="-1"
            />
            <GridItem textAlign="center" mt="25px">
              <Icon
                color="teal.600"
                mb="15px"
                w="45px"
                h="45px"
                as={MdThumbUp}
              />
              <Text
                color="teal.600"
                fontSize="21px"
                mt="0"
                mb="15px"
                fontWeight="500"
              >
                Prosty w obsłudze panel
              </Text>
            </GridItem>
            <GridItem textAlign="center" mt="25px">
              <Icon
                color="teal.600"
                mb="15px"
                w="45px"
                h="45px"
                as={MdSupervisedUserCircle}
              />
              <Text
                color="teal.600"
                fontSize="21px"
                mt="0"
                mb="15px"
                fontWeight="500"
              >
                Szybkie dodawanie kursu
              </Text>
            </GridItem>
            <GridItem textAlign="center" mt="25px">
              <Icon
                color="teal.600"
                mb="15px"
                w="45px"
                h="45px"
                as={MdVerifiedUser}
              />
              <Text
                color="teal.600"
                fontSize="21px"
                mt="0"
                mb="15px"
                fontWeight="500"
              >
                Wysoka jakość kursów
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem p="30px">
          <Box position="relative">
            <Image src={CourseAuthorsImg} margin="auto" objectFit="cover" />
            <Box
              position="absolute"
              top="15px"
              right="15px"
              background="teal.600"
              w="100%"
              h="100%"
              zIndex="-1"
            />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  </Box>
);

export default Home;
