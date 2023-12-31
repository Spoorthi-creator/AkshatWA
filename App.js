import React, { useState, useEffect, useContext } from "react";
import { Text, View, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {signOut} from "firebase/auth";
import ContextWrapper from "./context/ContextWrapper";
import Context from "./context/Context";
//import Profile from "./screens/Profile";
import Chats from "./screens/Chats";
import Photo from "./screens/Photo";
import { Ionicons } from "@expo/vector-icons";
import Contacts from "./screens/Contacts";
import Chat from './screens/Chat'
import ChatHeader from './components/ChatHeader'
import { MaterialIcons } from '@expo/vector-icons';
import Login from "./screens/Login";
import Register from "./screens/Register";
import LoadingScreen from "./screens/LoadingScreen";
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  "Key cancelled in the image picker result is deprecated and will be removed in SDK 48, use canceled instead",
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App({navigation}) {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   setLoading(false);
    //   if (user) {
    //     console.log(user);
    //     setCurrUser(user);
    //   }
    // });
    // return () => unsubscribe();
  }, []);

  // if (loading) {
  //   return <Text>Loading...</Text>;
  //}

  return (
    <NavigationContainer>
  
        <Stack.Navigator screenOptions={{
             headerStyle: {
               backgroundColor: '#064663',
               shadowOpacity: 0,
               elevation: 0,
             },
             headerTintColor: colors.white,
           }}>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
          <Stack.Screen name="Register" component={Register}  />
     
         
            {/* <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            /> */}
     
          <Stack.Screen
            name="Chats"
            options={{ headerShown:true,title: "Messages" ,headerRight: () => (
              <View style={{marginRight: 10}}>
                <MaterialIcons name="logout" size={24} color="white" onPress={()=>signOut(auth).then(() => {
      alert('Logged Out!!');
    
     }).catch((error) => {
     alert(error.message)
     })} />
               </View>
            ), }}
            component={Chats}
            
          />
          <Stack.Screen
            name="contacts"
            options={{ title: "Select Contacts" }}
            component={Contacts}
          />
          <Stack.Screen name="chat" component={Chat} options={{headerTitle: (props) => <ChatHeader {...props} />}}/>
        </Stack.Navigator>
    
    </NavigationContainer>
  );
}
function Home() {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Text></Text>
    // <Tab.Navigator
    //   screenOptions={({ route }) => {

    //     return {
    //       tabBarLabel: () => {
    //         if (route.name === "photo") {
    //           return <Ionicons name="camera" size={20} color={colors.white} />;
    //         } else {
    //           return (
    //             <Text style={{ color: colors.white }}>
    //               {route.name.toLocaleUpperCase()}
    //             </Text>
    //           );
    //         }
    //       },
    //       tabBarShowIcon: true,
    //       tabBarLabelStyle: {
    //         color: colors.white,
    //       },
    //       tabBarIndicatorStyle: {
    //         backgroundColor: colors.white,
    //       },
    //       tabBarStyle: {
    //         backgroundColor: colors.foreground,
    //       },
    //     };
    //   }}
    //   initialRouteName="Chats"
    // >
    //   {/* <Tab.Screen name="photo" component={Photo} /> */}
    //   <Tab.Screen name="Chats" component={Chats}   />
    // </Tab.Navigator>
  );
}

function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png")
  );
  if (!assets) {
    return <Text>Loading ..</Text>;
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

export default Main;















// import React, { useState, useEffect, useContext } from "react";
// import { Text, View, LogBox } from "react-native";
// import { useAssets } from "expo-asset";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { MaterialIcons } from '@expo/vector-icons';
// import ContextWrapper from "./context/ContextWrapper";
// import Context from "./context/Context";
// import Profile from "./screens/Profile";
// import Chats from "./screens/Chats";
// import Login from "./screens/Login";
// import Register from "./screens/Register";
// import Contacts from "./screens/Contacts";
// import Chat from './screens/Chat';
// import ChatHeader from './components/ChatHeader';
// import {signOut} from "firebase/auth";
// LogBox.ignoreLogs([
//   "Setting a timer",
//   "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
//   "Key cancelled in the image picker result is deprecated and will be removed in SDK 48, use canceled instead",
// ]);

// const Stack = createStackNavigator();
// const Tab = createMaterialTopTabNavigator();

// function App({navigation}) {
//   const [currUser, setCurrUser] = useState({loggedIn: false});
//   const [loading, setLoading] = useState(true);
//   const {
//     theme: { colors },
//   } = useContext(Context);



//   useEffect(() => {
    
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setLoading(false);
//       if (user) {
//         setCurrUser(user);
//        currUser.loggedIn=true;
     
//       }
      
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <NavigationContainer>
//       {!currUser.loggedIn  ? (
//         <Stack.Navigator screenOptions={{ }}>
//          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
//           <Stack.Screen name="Register" component={Register} options={{headerShown:true}} />
//         </Stack.Navigator>
//       ) :  (
//         <Stack.Navigator
//           screenOptions={{
//             headerStyle: {
//               backgroundColor: '#064663',
//               shadowOpacity: 0,
//               elevation: 0,
//             },
//             headerTintColor: colors.white,
//           }}
//         >
//            {!currUser.displayName && (
//             <Stack.Screen
//               name="Profile"
//               component={Profile}
//              options={{headerShown:false}}
//             />
//           )}  
         
//           <Stack.Screen
//             name="Chats"
//             options={{ title: "Messages" ,headerRight: () => (
//               <View style={{marginRight: 10}}>
//                <MaterialIcons name="logout" size={24} color="white" onPress={()=>signOut(auth).then(() => {
//      alert('Logged Out!!');
//       currUser.loggedIn=true;
//      navigation.replace("Login");
//     }).catch((error) => {
//     alert(error.message)
//     })} />
//               </View>
//            ), }}
//             component={Chats}
//           />
//           <Stack.Screen
//             name="contacts"
//             options={{ title: "Contacts" }}
//             component={Contacts}
//           /> 
//           <Stack.Screen name="chat" component={Chat} options={{headerTitle: (props) => <ChatHeader {...props} />}}/>
         
//         </Stack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// }
// function Home() {
//   const {
//     theme: { colors },
//   } = useContext(Context);
//   return (
//     <Text></Text>
//   );
// }

// function Main() {
//   const [assets] = useAssets(
//     require("./assets/icon-square.png"),
//     require("./assets/chatbg.png"),
//     require("./assets/user-icon.png"),
//     require("./assets/welcome-img.png")
//   );
//   if (!assets) {
//     return <Text>Loading ..</Text>;
//   }
//   return (
//     <ContextWrapper>
//       <App />
//     </ContextWrapper>
//   );
// }

// export default Main;
