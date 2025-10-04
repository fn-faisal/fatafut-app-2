import React, { useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { StatusBar } from '@/components/ui/status-bar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function AuthPage() {
  const { login, signup, socialLogin, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/home');
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    // For demo purposes, simulate login
    login('demo@example.com', 'password');
  };

  const handleSignup = () => {
    // For demo purposes, simulate signup
    signup('demo@example.com', 'password', 'Demo User');
  };

  const handleSocialLogin = (provider: 'google' | 'apple' | 'facebook') => {
    socialLogin(provider);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-300">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Box className="flex-1 justify-center items-center px-6">
      <VStack className="w-full max-w-sm space-y-6">
        {/* Header */}
        <VStack className="items-center space-y-2">
          <Text className="text-3xl font-bold text-foreground-0">
            Welcome to Fatafut
          </Text>
          <Text className="text-center text-foreground-500">
            Sign in to your account or create a new one
          </Text>
        </VStack>

        {/* Auth Buttons */}
        <VStack className="space-y-4">
          <Button
            size="lg"
            className="bg-primary-500"
            onPress={handleLogin}
          >
            <ButtonText>Login</ButtonText>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-primary-500"
            onPress={handleSignup}
          >
            <ButtonText className="text-primary-500">Sign Up</ButtonText>
          </Button>
        </VStack>

        {/* Divider */}
        <HStack className="items-center space-x-4">
          <Box className="flex-1 h-px bg-border-300" />
          <Text className="text-foreground-500">or</Text>
          <Box className="flex-1 h-px bg-border-300" />
        </HStack>

        {/* Social Login */}
        <VStack className="space-y-3">
          <Text className="text-center text-foreground-500 mb-2">
            Continue with
          </Text>
          
          <Button
            size="lg"
            variant="outline"
            className="border-border-300"
            onPress={() => handleSocialLogin('google')}
          >
            <ButtonText>Google</ButtonText>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-border-300"
            onPress={() => handleSocialLogin('apple')}
          >
            <ButtonText>Apple</ButtonText>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-border-300"
            onPress={() => handleSocialLogin('facebook')}
          >
            <ButtonText>Facebook</ButtonText>
          </Button>
        </VStack>

        {/* Demo Note */}
        <Box className="mt-8 p-4 bg-background-100 rounded-lg">
          <Text className="text-center text-sm text-foreground-500">
            Demo Mode: Click any button to simulate authentication
          </Text>
        </Box>
      </VStack>
      </Box>
    </SafeAreaView>
  );
}
