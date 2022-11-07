import { Center, Text, Icon } from "native-base";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";

import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn, isUserLoading } = useAuth();
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        mt={12}
        title="ENTRAR COM GOOGLE"
        type="secondary"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: {
            color: "white",
          },
        }}
      />
      <Text color="white" textAlign="center" mt={5}>
        Não utilizamos nenhuma outra informação além {"\n"} do seu email para
        criação da conta.
      </Text>
    </Center>
  );
}
