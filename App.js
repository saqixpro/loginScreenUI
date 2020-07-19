import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import { Input, Header, Button, Icon } from "./components";

const { height } = Dimensions.get("screen");

export default function App() {
  const [alignment, setAlignment] = useState(new Animated.Value(0));

  const toDocumentsPage = () => {
    Animated.timing(alignment, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const backToMainComponent = () => {
    Animated.timing(alignment, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const heightIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const opacityIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const documentPageOpacityIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const documentPageHeightIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  const mainContainerStyle = {
    height: heightIntropolate,
    opacity: opacityIntropolate,
  };

  const documentContainerStyle = {
    height: documentPageHeightIntropolate,
    opacity: documentPageOpacityIntropolate,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.mainContainer, mainContainerStyle]}>
        <View style={{ width: "100%" }}>
          <Header title="Sign Up" subTitle="Create Your Account Now" />
        </View>
        <View>
          <Input icon="md-person" placeholder="Username" />
          <Input icon="md-mail" placeholder="Email" />
          <Input icon="ios-lock" placeholder="Password" />
          <Input icon="ios-lock" placeholder="Confirm Password" />
        </View>
        <Button onPress={() => toDocumentsPage()} title="NEXT" />
      </Animated.View>
      <Animated.View style={[styles.mainContainer, documentContainerStyle]}>
        <Icon
          name="chevron-left"
          onPress={() => backToMainComponent()}
          size={30}
        />
        <View style={{ width: "100%" }}>
          <Header
            title="Personal Information"
            subTitle="Enter Your Personal Information"
          />
        </View>
        <View>
          <Input icon="md-person" placeholder="First Name" />
          <Input icon="md-person" placeholder="Last Name" />
          <Input icon="ios-phone-portrait" placeholder="Phone" />
          <Input icon="ios-home" placeholder="Address" />
        </View>
        <Button title="NEXT" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
