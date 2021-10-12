import { Box, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { LoggedActions } from './LoggedActions';
import { NotLoggedActions } from './NotLoggedActions';
import { useRootStore } from '../../../stores/storeContext';

interface Props {
  justifyContentType?: string;
}

export const NavUserActions: FC<Props> = observer(({ justifyContentType }) => {
  const { userStore } = useRootStore();

  return (
    <Box>
      <HStack justifyContent={justifyContentType}>
        {userStore.user?.details ? (
          <LoggedActions justifyContentType={justifyContentType} />
        ) : (
          <NotLoggedActions justifyContentType={justifyContentType} />
        )}
      </HStack>
    </Box>
  );
});
