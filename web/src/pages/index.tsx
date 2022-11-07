import Image from "next/image";
import iconCheck from "../assets/check.svg";
import appPreviewImg from "../assets/celulares.png";
import LogoImg from "../assets/logo.svg";
import avatarImg from "../assets/avatares.png";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";
import { GetStaticProps } from "next";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");
  async function createPool(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });
      const { code } = response.data;

      await navigator.clipboard.writeText(code);
      setPoolTitle("");
      alert(
        `Bolão criado com sucesso, o código foi copiado para a área de transferência! Seu código é: ${code}`,
      );
    } catch (error) {
      console.log(error);
      alert("Falha o criar o bolão, tente novamente!");
    }
  }
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center ">
      <main>
        <Image src={LogoImg} alt="NLW copa" quality={100} />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2 ">
          <Image src={avatarImg} alt="" quality={100} />
          <strong className="text-gray-100 text-xl">
            <span className="text-itus-500">+{props.userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-gray-100 text-sm"
            type="text"
            required
            placeholder="Qual o nome do Bolão?"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar Bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600  flex items-center justify-between  text-gray-100 ">
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="NLW copa" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600"></div>
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="NLW copa" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação movel"
        quality={100}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api("pools/count"),
      api("guesses/count"),
      api("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
    revalidate: 60 * 60 * 12, // 12 hours
  };
};
