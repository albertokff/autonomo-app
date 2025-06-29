import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function AgendamentoForm({ navigation }) {
  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  const handleSave = () => {
    if (!cliente.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do cliente.');
      return;
    }
    if (!servico.trim()) {
      Alert.alert('Erro', 'Por favor, informe o serviço.');
      return;
    }
    if (!data.trim()) {
      Alert.alert('Erro', 'Por favor, informe a data.');
      return;
    }
    if (!horario.trim()) {
      Alert.alert('Erro', 'Por favor, informe o horário.');
      return;
    }

    // Aqui você pode enviar os dados para API ou salvar localmente

    Alert.alert(
      'Sucesso',
      `Agendamento para ${cliente} no serviço ${servico} agendado para ${data} às ${horario}`
    );
    navigation.goBack(); // Voltar para a tela anterior
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Novo Agendamento</Text>

        <Text style={styles.label}>Cliente *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do cliente"
          value={cliente}
          onChangeText={setCliente}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Serviço *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do serviço"
          value={servico}
          onChangeText={setServico}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 50.00"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Data *</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={data}
          onChangeText={setData}
        />

        <Text style={styles.label}>Horário *</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={horario}
          onChangeText={setHorario}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Agendamento</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f5e9',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    color: '#2e7d32',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2e7d32',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    borderColor: '#81c784',
    borderWidth: 1,
    color: '#2e7d32',
  },
  button: {
    backgroundColor: '#2e7d32',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
