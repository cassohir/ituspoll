import React, { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

// OBLVY8

export function FindPool() {
  const toast = useToast();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation();
  async function handleJoinPool() {
    try {
      setIsLoading(true);
      if (!code.trim()) {
        toast.show({
          title: "Informe o código do Bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }
      console.log(code);
      await api.post("/pools/join", { code });
      navigate("Pools");
      toast.show({
        title: "Você entrou no bolão com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (e) {
      console.log(code);
      console.log(e.response.data);
      setIsLoading(false);
      if (e.response?.data?.message === "Pool not Found") {
        return toast.show({
          title: "Não foi possível entrar no bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }
      if (e.response?.data?.message === "Already joined") {
        return toast.show({
          title: "Você já está nesse bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }
      toast.show({
        title: "Não foi possível entrar no bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por Código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          textAlign="center"
          mb={8}
        >
          Encontrar um bolão através de {"\n"} seu código único.
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button title="BUSCAR BOLÃO" onPress={handleJoinPool} />
      </VStack>
    </VStack>
  );
}
