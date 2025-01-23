/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-19 10:16:35
 * @modify date 2024-11-19 10:16:35
 * @desc [description]
 */
import { DevToolsBubble } from "react-native-react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store";
import Routes from "./Routes";
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <DevToolsBubble />
      </QueryClientProvider>
    </Provider>
  );
}
