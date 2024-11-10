import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';
import { Image,View, Text, TextInput, Button, FlatList } from 'react-native';

const db = SQLite.openDatabase('clientes.db');

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idade, setIdade] = useState('');
  const [credito, setCredito] = useState('');
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    criaTabela();
    listaClientes();
  }, []);

  const criaTabela = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, telefone TEXT, idade INT, credito REAL, ativo TEXT);'
      );
    });
  };

  const adicionaCliente = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO clientes (nome, telefone, idade, credito, ativo) VALUES (?, ?, ?, ?, ?)',
        [nome, telefone, idade, credito, 'Ativo'],
        () => {
          listaClientes();
          setNome('');
          setTelefone('');
          setIdade('');
          setCredito('');
        }
      );
    });
  };

  const listaClientes = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM clientes', [], (_, { rows }) => {
        setClientes(rows._array);
      });
    });
  };

  return (
    <View>
      <Text>Cadastro de Cliente</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput placeholder="Idade" value={idade} onChangeText={setIdade} />
      <TextInput placeholder="Crédito" value={credito} onChangeText={setCredito} />
      <Button title="Cadastrar" onPress={adicionaCliente} />

      <FlatList
        data={clientes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.telefone}</Text>
            <Text>{item.idade}</Text>
            <Text>{item.credito}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CadastroCliente; 
const db = SQLite.openDatabase('clientes.db');

export const criaTabela = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, telefone TEXT, idade INT, credito REAL, ativo TEXT);'
    );
  });
};

export const adicionaCliente = (nome, telefone, idade, credito, ativo) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO clientes (nome, telefone, idade, credito, ativo) VALUES (?, ?, ?, ?, ?)',
      [nome, telefone, idade, credito, ativo]
    );
  });
};

export const listaClientes = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM clientes', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idade, setIdade] = useState('');
  const [credito, setCredito] = useState('');
  const [ativo, setAtivo] = useState(true);
  
  const handleCadastro = () => {
    // Adicionar cliente ao banco de dados
  };

  return (
    <View>
      <Text>Cadastro de Cliente</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput placeholder="Idade" value={idade} onChangeText={setIdade} />
      <TextInput placeholder="Crédito" value={credito} onChangeText={setCredito} />
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

export default CadastroCliente;

