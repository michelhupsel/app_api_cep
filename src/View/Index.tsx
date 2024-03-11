import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from "react-native";
import CepModel from "../Model/CepModel";
import { CepController } from "../Controller/CepController";


export function Home() {
    const [cep, setCep] = useState<string>('');
    const [ceps, setCeps] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handlerSearch = async () => {
        try {
            setLoading(true);
            await CepController.fetchCep(cep).then(() => {
                const newCeps = [...CepController.getCeps()];
                setCeps([...CepController.getCeps()])
                const filteredCeps = newCeps.filter(cep => cep !== undefined) as CepModel[];
                //solução aqui
                setCeps(filteredCeps);
            });
        } catch (error) {
            console.error('Error fetching data: ', error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 60,
            }}>
            <TextInput
                style={{
                    width: "80%",
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 5,

                }}

                placeholder="Digite o CEP"
                onChangeText={text => setCep(text)}
                value={cep}
            />
            <Button title="Buscar" onPress={handlerSearch} />
            {loading ? (
                <ActivityIndicator size='large' color='#0000ff' />
            ) : (

                <FlatList
                    data={ceps}
                    keyExtractor={item => item.cep}
                    renderItem={({ item }) => (
                        <View style={{ marginTop: 10 }}>
                            <Text>CEP: {item.cep}</Text>
                            <Text>Logradouro: {item.logradouro}</Text>
                            <Text>Bairro: {item.bairro}</Text>
                            <Text>Cidade: {item.localidade}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}