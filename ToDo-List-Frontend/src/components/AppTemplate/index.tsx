import {
  Box,
} from '@chakra-ui/react'

export function AppTemplate({ children }: any) {
  
  return (
    <Box minH="100vh">
      <Box ml={{ base: 0, md: 0 }}>
        {children}
      </Box>
    </Box>
  )
}