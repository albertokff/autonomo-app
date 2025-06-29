import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const feelings = [
  { emoji: '😊', label: 'Feliz' },
  { emoji: '😐', label: 'Neutro' },
  { emoji: '😞', label: 'Triste' },
  { emoji: '😡', label: 'Irritado' },
];

const actions = [
  { label: 'Novo Serviço' },
  { label: 'Novo Cliente' },
  { label: 'Pendências' },
];

export default function HomeScreen() {
  const { logout, user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [sidebarVisible, slideAnim]);

  const closeSidebar = () => setSidebarVisible(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView style={styles.mainArea} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.greeting}>Olá, {user?.name || 'seja bem-vindo'}!</Text>

        {/* Cards do dashboard */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Agenda</Text>
            <Text style={styles.cardValue}>12</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Atendidos</Text>
            <Text style={styles.cardValue}>5</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Faturamento</Text>
            <Text style={styles.cardValue}>R$ 2.340,00</Text>
          </View>
        </View>

        {/* Sentimento */}
        <View style={styles.feelingsContainer}>
          <Text style={styles.feelingsTitle}>Como você está se sentindo?</Text>
          <View style={styles.emojisRow}>
            {feelings.map((feeling) => (
              <TouchableOpacity
                key={feeling.label}
                style={[
                  styles.emojiButton,
                  selectedFeeling?.label === feeling.label && styles.emojiSelected,
                ]}
                onPress={() => setSelectedFeeling(feeling)}
              >
                <Text style={styles.emoji}>{feeling.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ações */}
        <View style={styles.actionsContainer}>
          {actions.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionCard}
              onPress={() => {
                if (action.label === 'Novo Serviço') {
                  navigation.navigate('ServiceForm');
                } else {
                  alert(action.label);
                }
              }}
            >
              <Text style={styles.actionCardText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sidebar */}
      <Modal transparent visible={sidebarVisible} animationType="none" onRequestClose={closeSidebar}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={closeSidebar}>
          <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
            <Text style={styles.sidebarTitle}>Menu</Text>
            <TouchableOpacity style={styles.sidebarItem} onPress={closeSidebar}>
              <Text style={styles.sidebarText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={closeSidebar}>
              <Text style={styles.sidebarText}>Meus Serviços</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={closeSidebar}>
              <Text style={styles.sidebarText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sidebarItem, styles.logoutSidebar]}
              onPress={() => {
                closeSidebar();
                logout();
              }}
            >
              <Text style={[styles.sidebarText, { color: '#fff' }]}>Sair</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60,
    backgroundColor: '#2e7d32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  menuButton: { padding: 8, marginRight: 15 },
  menuText: { fontSize: 28, color: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#fff' },
  mainArea: { flex: 1 },
  greeting: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 25,
    color: '#2e7d32',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  cardTitle: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#388e3c' },
  cardValue: { fontSize: 18, fontWeight: '700', color: '#2e7d32' },
  feelingsContainer: { marginBottom: 20 },
  feelingsTitle: { fontSize: 20, fontWeight: '600', marginBottom: 15, color: '#2e7d32' },
  emojisRow: { flexDirection: 'row', justifyContent: 'space-between' },
  emojiButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 3,
  },
  emojiSelected: {
    backgroundColor: '#a5d6a7',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  emoji: { fontSize: 28 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  actionCard: {
    backgroundColor: '#81c784',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  actionCardText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 220,
    backgroundColor: '#a5d6a7',
    paddingTop: 40,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 10,
    elevation: 10,
  },
  sidebarTitle: { color: '#2e7d32', fontSize: 22, fontWeight: '700', marginBottom: 25 },
  sidebarItem: { paddingVertical: 15 },
  sidebarText: { color: '#2e7d32', fontSize: 18 },
  logoutSidebar: {
    marginTop: 40,
    backgroundColor: '#2e7d32',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
