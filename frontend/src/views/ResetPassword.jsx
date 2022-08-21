import React from 'react';
import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Container, Heading, Stack, Text } from '@chakra-ui/layout';
import { useController, useForm } from 'react-hook-form';
import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import { useToast } from '@chakra-ui/toast';
import { Link as RouterLink } from 'react-router-dom';

import { EMAIL_REGEX } from '../utils/constants';

const ResetPassword = () => {
  const toast = useToast();

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();

  const { field: fieldEmail } = useController({
    control: control,
    defaultValue: '',
    name: 'email',
    rules: {
      pattern: {
        value: EMAIL_REGEX,
        message: 'Valid email is required',
      },
      required: { value: true, message: 'Valid email is required' },
    },
  });

  const sendResetEmailLink = React.useCallback(
    async ({ email }) => {
      try {
        await sendPasswordResetEmail(getAuth(), email, {
          url: 'http://localhost:3000/login',
        });

        toast({
          position: 'bottom-right',
          title: 'Succesfully sent password-reset link 🚀',
          description: 'Please check your inbox.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        resetField('email');
      } catch (error) {
        console.error(error);
        const errorMessage = error?.code?.split('/')?.[1]?.replaceAll('-', ' ');

        toast({
          position: 'bottom-right',
          title: errorMessage
            ? errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
            : 'Something went wrong... 😕',
          description: 'Please try again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [toast, resetField]
  );

  const handleEnterKeyPressDown = React.useCallback(
    e => {
      if ((e.code === 'Enter' || e.key === 'Enter') && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(sendResetEmailLink)();
      }
    },
    [handleSubmit, sendResetEmailLink]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleEnterKeyPressDown);
    return () => window.removeEventListener('keydown', handleEnterKeyPressDown);
  }, [handleEnterKeyPressDown]);

  return (
    <Container
      maxW="container.md"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        spacing={12}
        p={[4, 6]}
      >
        <Stack spacing={3}>
          <Heading lineHeight={1.1} fontSize={['2xl', '3xl']}>
            Reset your password?
          </Heading>
          <Text
            fontSize={['sm', 'md']}
            color={useColorModeValue('gray.800', 'gray.400')}
          >
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email" isRequired isInvalid={errors?.email}>
            <Input
              type="email"
              onChange={fieldEmail.onChange}
              value={fieldEmail.value}
              name={fieldEmail.name}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            onClick={handleSubmit(sendResetEmailLink)}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Request Reset
          </Button>
        </Stack>
        <Button
          isDisabled={isSubmitting}
          mt={12}
          as={RouterLink}
          to="/login"
          variant="outline"
          color={'blue.400'}
        >
          Back to Login
        </Button>
      </Stack>
    </Container>
  );
};

export default ResetPassword;
