import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { NewPool } from "../screens/NewPool";
import { Pools } from "../screens/Pools";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import { FindPool } from "../screens/FindPool";
import { Details } from "../screens/Details";
const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  const sizeIcons = sizes[6];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
        },
      }}
    >
      <Screen
        name="NewPool"
        component={NewPool}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={sizeIcons} />
          ),
          tabBarLabel: "Novo bolão",
        }}
      />
      <Screen
        name="Pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={sizeIcons} />
          ),
          tabBarLabel: "Meus bolões",
        }}
      />
      <Screen
        name="FindPool"
        component={FindPool}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="Details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
