
// app/SplashScreen.tsx
import { Route } from "@/constants/router";
import { getMobileToken, getPersonalDetails } from "@/lib/storage";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";


export default function SplashScreen() {
       const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
     Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const checkAuth = async () => {
      try {
        const token = await getMobileToken();
           const detail = await getPersonalDetails();
       setTimeout(() => {
         if (token) {
            if (detail == null) {
                router.replace(Route.PERSONAL_DETAILS);
             } else {
                router.replace(Route.HOSPITALS);
             }
           } else {
                router.replace(Route.REGISTER);
             }
          }, 2000);// Optional delay
        } catch (e) {
        console.error("Error checking token", e);
        router.replace(Route.REGISTER);
      }
    };

    checkAuth();
  }, []);




  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("assets/images/logo.png")}
        style={[styles.logo,  { opacity: fadeAnim } ]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Healthy Loops</Text>
      {/* <ActivityIndicator size="large" color="white" style={{ marginTop: 20 }} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
  },
});


