import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootNavigator from "./src/navigation/Navigator";
import { AuthProvider } from "./context/useAuth";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./hooks/store/store";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#000",
  },
};

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <StoreProvider store={store}>
          <NavigationContainer theme={MyTheme}>
            <RootNavigator />
          </NavigationContainer>
        </StoreProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
