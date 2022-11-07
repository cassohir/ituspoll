import React, { useEffect, useState } from "react";
import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { Loading } from "../components/Loading";
import { api } from "../services/api";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Share } from "react-native";
import { Guesses } from "../components/Guesses";

interface RouteParams {
  id: string;
}

export function Details() {
  const [optionSelected, setOptionSelected] = useState<"g" | "r">("g");

  const route = useRoute();
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>(
    {} as PoolCardProps,
  );
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const { id } = route.params as RouteParams;
  async function handleCodeShare() {
    Share.share({
      message: `Entre no bolão através desse código!${poolDetails.code}`,
    });
  }

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);
      const responseDetails = await api.get(`/pools/${id}`);
      setPoolDetails(responseDetails.data.pool);
    } catch (e) {
      console.log(e);

      toast.show({
        title: "Não foi possível carregar os detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPoolDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        onShare={handleCodeShare}
        showBackButton
        showShareButton
      />
      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              onPress={() => setOptionSelected("g")}
              isSelected={optionSelected === "g"}
            />
            <Option
              title="Ranking do Grupo"
              onPress={() => setOptionSelected("r")}
              isSelected={optionSelected === "r"}
            />
          </HStack>
          <Guesses poolId={poolDetails.id} code={poolDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
