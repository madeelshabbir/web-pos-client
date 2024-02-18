
import { useRoutes } from 'react-router-dom';

import AuthProvider from '../store/providers/auth-provider';
import routes from '../routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <AuthProvider>
      {content}
    </AuthProvider>
  );
};
export default App;
