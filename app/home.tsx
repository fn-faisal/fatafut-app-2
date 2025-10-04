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

export default function HomePage() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background-300">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <Box className="flex-1 justify-center items-center">
          <Text className="text-foreground-500">Loading...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-background-300">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Box className="flex-1 bg-background-300">
      {/* Header */}
      <Box className="bg-background-0 px-6 py-4 border-b border-border-300">
        <HStack className="justify-between items-center">
          <VStack>
            <Text className="text-xl font-semibold text-foreground-0">
              Welcome back!
            </Text>
            <Text className="text-foreground-500">
              {user?.name || user?.email}
            </Text>
          </VStack>
          <Button
            size="sm"
            variant="outline"
            className="border-border-300"
            onPress={logout}
          >
            <ButtonText>Logout</ButtonText>
          </Button>
        </HStack>
      </Box>

      {/* Main Content */}
      <Box className="flex-1 justify-center items-center px-6">
        <VStack className="items-center space-y-6">
          <Box className="w-24 h-24 bg-primary-500 rounded-full items-center justify-center">
            <Text className="text-3xl font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </Box>
          
          <VStack className="items-center space-y-2">
            <Text className="text-2xl font-bold text-foreground-0">
              Home Page
            </Text>
            <Text className="text-center text-foreground-500 max-w-sm">
              You are successfully authenticated! This is your home page where you can access all the app features.
            </Text>
          </VStack>

          {/* Quick Actions */}
          <VStack className="w-full max-w-sm space-y-3 mt-8">
            <Button
              size="lg"
              className="bg-primary-500"
              onPress={() => {
                // TODO: Navigate to main app features
                console.log('Navigate to main features');
              }}
            >
              <ButtonText>Explore App</ButtonText>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary-500"
              onPress={() => {
                // TODO: Navigate to profile
                console.log('Navigate to profile');
              }}
            >
              <ButtonText className="text-primary-500">View Profile</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </Box>
      </Box>
    </SafeAreaView>
  );
}
