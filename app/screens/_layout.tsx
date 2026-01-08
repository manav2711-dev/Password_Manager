
// import { Stack } from "expo-router";

// export default function ScreensLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: true,
//         headerTitle: "Healthy",
//         headerBackVisible: true, 
//         headerTitleAlign: 'center',
//       }}
//     />
//   );
// }


import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitle: "Passico",
        headerTitleAlign: "center",
         headerBackVisible: false,
          headerStyle: { backgroundColor: "#1976D2" }, 
            headerTitleStyle: { fontWeight: "bold", color:"white" },
        // 👇 Only show custom back if opened from a tab
        headerLeft: (props) => {
          const params = route.params as any;
          if (params?.fromTab) {
            return (
              <Pressable
             onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace(`/(tabs)/${params.fromTab}`as any);
          }
        }}
            //   onPress={() => router.back()}
              style={{ paddingLeft: 15 }}
              >
                <Ionicons name="arrow-back" size={24} />
              </Pressable>
            );
          }
          return null; // Let default back button handle it
        },
      })}
    />
  );
}
