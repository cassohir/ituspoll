import React, { useCallback, useState } from "react";
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { api } from "../services/api";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolCardProps[]>([]);
  const toast = useToast();
  async function fetchPools() {
    try {
      setIsLoading(true);
      const poolsResponse = await api.get("/pools");
      setPools(poolsResponse.data.pools);
    } catch (e) {
      console.log(e);
      return toast.show({
        title: "Não foi possível listar bolões",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus Bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate("FindPool")}
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          px={5}
          data={pools}
          keyExtractor={(item) => item.id}
          _contentContainerStyle={{ pb: 10 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyPoolList />}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate("Details", { id: item.id })}
            />
          )}
        />
      )}
    </VStack>
  );
}
