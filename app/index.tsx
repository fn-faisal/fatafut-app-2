import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Spinner } from '@/components/ui/spinner';
import { VStack } from '@/components/ui/vstack';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { StatusBar } from '@/components/ui/status-bar';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/home');
      } else {
        router.replace('/auth');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background-300">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <Box className="flex-1 justify-center items-center">
          <VStack className="items-center space-y-4">
            <Spinner size="large" />
            <Text className="text-foreground-500">Loading...</Text>
          </VStack>
        </Box>
      </SafeAreaView>
    );
  }

  // This should not render as we redirect above, but just in case
  return null;
}
