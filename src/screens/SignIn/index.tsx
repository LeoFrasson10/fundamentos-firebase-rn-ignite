import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // login anônimo
  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }

  function handleCreateUserAccount() {
    if (email.length === 0 || password.length === 0) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Conta criada com sucesso!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          return Alert.alert("E-mail já está em uso");
        }
        if (error.code === "auth/invalid-email") {
          return Alert.alert("E-mail inválido");
        }
        if (error.code === "auth/weak-password") {
          return Alert.alert("Senha deve ter ao menos 6 dígitos");
        }
      });
  }

  function handleSignInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        Alert.alert("Login realizado com sucesso!");
      })
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          return Alert.alert(
            "Usuário não encontrado",
            "E-mail ou senha incorretos"
          );
        }
      });
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("E-mail de recuperação enviado!");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          return Alert.alert("Usuário não encontrado");
        }
      });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
