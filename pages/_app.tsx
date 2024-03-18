import React from 'react';
import Home from '../pages/index';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';


const queryClient = new QueryClient();


const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default App;
