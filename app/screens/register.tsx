import { register } from "@/api/apis";
import AlertBox from "@/components/AlertBox";
import ALERT_TYPE from "@/constants/alertType";
import { Route } from "@/constants/router";
import Theme from "@/constants/theme";
import { useDialog } from "@/context/DialogContext";
import { useGlobalData } from "@/context/GlobalDataContext";
import { resetSecureStorageWithLogs, savePhoneNo } from "@/lib/storage";
import { isValidNumber } from "@/lib/utils";
import { UserDetail } from "@/types/UserDetail";
import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function RegisterScreen() {
 const [userDetails, setUserDetails] = useState<UserDetail>({
  name: "",
  mobile:"",
  email:"",
  password:"",
  confirmPassword:"",
});

  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refNo, setRefNo] = useState<string | null>(null);
  const { setCurrentUserId, clearRegistrations } = useGlobalData();
  const { showErrorDialog, showDialog } = useDialog();
  
// function to make api call for register mobile no
  const handleRegister = async () => {
    console.log("-----------Registeration Start-----------")
    await resetSecureStorageWithLogs();
    if (!isValidNumber(userDetails?.mobile ?? "")) {                 //check is mobile no valid or not
      setError("Enter 10 digit number(ex:9592915584) without country code(ex:+91 9592915584)");
      return;
    }
    if (userDetails?.mobile.length < 10) {
      setError("Invalid phone number.");
      return;
    }

    if(userDetails.password !== userDetails.confirmPassword){
      setError("password mismatched");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    register(userDetails) //api call for register     
      .then((res) => {
        // setShowOtp(true);
        setIsSubmitting(false);
        savePhoneNo(userDetails.mobile);
        router.replace(Route.LOGIN);
        // setRefNo(res[phone]);
      })
      .catch((err) => {
        setError("Registration failed.");
        setIsSubmitting(false);
          console.error(err);
      })
      .finally(() => {
        console.log("-----------Registeration Done-----------");
      });

    };

      
// function to make api call for verify otp
  // const handleVerifyOtp = async () => {
  //   if (otp.length < 6) {
  //     setError("Invalid OTP.");
  //     return;
  //   }
  //   if (!refNo) {
  //     setError("Invalid Registration.");
  //     return;
  //   }
  //   // {"9592915584": "true", "uid": "wXztGG54DtIjMuZfjBUj1IA86rY="}
  //   setError(null);
  //   setIsSubmitting(true);

  //   verifyOtp(phone, refNo, otp)  //api call
  //     .then((res) => {
  //       if (res[phone] == "true") {
  //         // Valid OTP
  //         setError(null);
  //         saveMobileToken(res["uid"]);
  //         savePhoneNo(phone);
  //         setCurrentUserId(res["uid"]);    
  //         clearRegistrations();
  //         // handleDetails();
  //         router.replace(Route.LOGIN);
  //         console.log("UID: ", res["uid"]);
  //       } else {
  //         setError("Invalid OTP.");
  //       }
  //     })
  //     .catch((err) => {
  //       setError("OTP verification failed.");
  //       console.error(err);
  //     })
  //     .finally(() => {
  //       setIsSubmitting(false);
  //     });
  // };

  const handleChangeMobileNo = () => {   //method to change mobile number
        resetSecureStorageWithLogs();
        setCurrentUserId("");           
        clearRegistrations();        
        router.replace(Route.REGISTER)  //route to register page
      };


const handleChange = (key: string, value: any) => {
  setUserDetails(prev => ({ ...prev, [key]: value }));
};

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Register to continue</Text>

          <TextInput
            mode="outlined"
            label="Full Name"
            value={userDetails?.name}
            activeOutlineColor={Theme.colors.primary}
            onChangeText={(text) => handleChange("name", text)}
            autoCapitalize="none"
            disabled={showOtp}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Phone Number"
            value={userDetails?.mobile}
            activeOutlineColor={Theme.colors.primary}
            onChangeText={(text) => handleChange("mobile", text)}
            keyboardType="number-pad"
            autoCapitalize="none"
            disabled={showOtp}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Email"
            value={userDetails?.email}
            activeOutlineColor={Theme.colors.primary}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            disabled={showOtp}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Master Password"
            value={userDetails?.password}
            activeOutlineColor={Theme.colors.primary}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
            disabled={showOtp}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Confirm Master Password"
            value={userDetails?.confirmPassword}
            activeOutlineColor={Theme.colors.primary}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry
            disabled={showOtp}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
            disabled={isSubmitting}
            contentStyle={{ paddingVertical: 6 }}
          >
            Register
          </Button>

          <Button
            mode="contained"
            onPress={() => router.replace(Route.LOGIN)}
            style={styles.button}
            disabled={isSubmitting}
            contentStyle={{ paddingVertical: 6 }}
          >
            Login
          </Button>

          {error && <AlertBox type={ALERT_TYPE.ERROR} message={error} />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    justifyContent: "center",
    paddingHorizontal: Theme.spacing.lg,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // centers card when keyboard is closed
    padding: 16,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: Theme.borders.radius.xl,
    padding: Theme.spacing.lg,
    // backdropFilter: "blur(10px)",
    borderWidth: Theme.borders.width.thin,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  title: {
    fontSize: Theme.typography.heading,
    fontWeight: Theme.typography.fontWeight.bold,
    textAlign: "center",
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.small,
    color: Theme.colors.muted,
    textAlign: "center",
    marginBottom: Theme.spacing.xs,
  },
  input: {
    outlineColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borders.radius.xl,
    marginTop: Theme.spacing.xs,
  },

    logo: {
    width: 150,
    height: 150,
    // marginBottom: 20,
      alignSelf: 'center',
  },
});
