import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // CARREGAR TODOS OS PRODUTOS UMA VEZ
  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .get()
  //     .then((response) => {
  //       const data = response.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       }) as ProductProps[];

  //       setProducts(data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // CARREGAR EM REALTIME
  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      // .limit(3)
      // .where("quantity", ">=", 3)
      // .orderBy("quantity")
      // .startAt(3)
      // .startAfter(3)
      // .endAt(5)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    // FUNÇÃO DE LIMPEZA
    return () => subscribe();
  }, []);

  // BUSCAR POR UM ITEM ESPECIFICO
  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .doc("custom-id")
  //     .get()
  //     .then((response) => {
  //       const data = {
  //         id: response.id,
  //         ...response.data(),
  //       };
  //       console.log(data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
