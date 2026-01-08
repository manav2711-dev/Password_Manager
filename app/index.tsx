// app/index.tsx
import { Route } from "@/constants/router";
import { getMobileToken } from "@/lib/storage";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import RegisterScreen from "./screens/register";
// Keep splash screen visible
SplashScreen.preventAutoHideAsync();


export default function Index() {
  const [mobileToken, setMobileToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const prepare = async () => {
      try {
        const token = await getMobileToken();
        console.log("token", token);
        setMobileToken(token);
      } catch {
        console.log("token got exception in Index.ts");
        setMobileToken(null);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    if (typeof mobileToken === "string") {
      router.replace(Route.PROFILE); //if token is present route to tournament page
    }
  }, [mobileToken]);


  if (mobileToken === undefined) {
    // Not Sure, Token is present or not in storage
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (mobileToken === null) {
    // user is not registered because there is no token store in storage
    return (<RegisterScreen />);
  }

  // if (typeof mobileToken == 'string') {
  //   router.replace(Route.PERSONAL_DETAILS);
  // }
}

// import SplashScreen from "@/components/SplashScreen";

// export default function Index() {
//   return <SplashScreen />;
// }
