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

const { width } = Dimensions.get('window');

const feelings = [
  { emoji: '😊', label: 'Feliz', color: '#B7E4C7' },
  { emoji: '😐', label: 'Neutro', color: '#D9EEDD' },
  { emoji: '😞', label: 'Triste', color: '#C9E4C5' },
  { emoji: '😡', label: 'Irritado', color: '#A3C9A8' },
];

const optionCards = [
  { label: 'Novo Serviço', key: 'novo_servico' },
  { label: 'Novo Cliente', key: 'novo_cliente' },
  { label: 'Pendências', key: 'pendencias' },
];

export default function HomeScreen() {
  const { logout, user } = useContext(AuthContext);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  const backgroundColor = selectedFeeling ? selectedFeeling.color : '#FFFFFF';

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
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <ScrollView style={styles.mainArea} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.greeting}>Olá, {user?.name || 'seja bem-vindo'}!</Text>

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
            <Text style={styles.cardTitle}>Entradas</Text>
            <Text style={styles.cardValue}>R$ 2.340,00</Text>
          </View>
        </View>

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

        <View style={styles.optionCardsContainer}>
          {optionCards.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={styles.optionCard}
              onPress={() => alert(`Você clicou em "${opt.label}"`)}
            >
              <Text style={styles.optionCardText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        transparent
        visible={sidebarVisible}
        animationType="slide"
        onRequestClose={closeSidebar}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={closeSidebar}
        >
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
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#D9EEDD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 4,
  },
  menuButton: {
    padding: 8,
    marginRight: 15,
  },
  menuText: {
    fontSize: 28,
    color: '#2C6E49',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C6E49',
  },
  mainArea: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 25,
    color: '#2C6E49',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#A8D5BA',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    alignItems: 'center',
    shadowColor: '#8DC6A4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#2C6E49',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C6E49',
  },
  feelingsContainer: {
    marginBottom: 20,
  },
  feelingsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2C6E49',
  },
  emojisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emojiButton: {
    backgroundColor: '#D9EEDD',
    padding: 15,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  emojiSelected: {
    backgroundColor: '#2C6E49',
    elevation: 5,
  },
  emoji: {
    fontSize: 28,
    color: '#2C6E49',
  },
  optionCardsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionCard: {
    backgroundColor: '#D9EEDD',
    width: '30%',
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  optionCardText: {
    color: '#2C6E49',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(217, 238, 221, 0.95)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 220,
    backgroundColor: '#D9EEDD',
    paddingTop: 40,
    paddingHorizontal: 20,
    elevation: 20,
  },
  sidebarTitle: {
    color: '#2C6E49',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 30,
  },
  sidebarItem: {
    marginBottom: 25,
  },
  sidebarText: {
    color: '#2C6E49',
    fontSize: 18,
  },
  logoutSidebar: {
    marginTop: 'auto',
    backgroundColor: '#2C6E49',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});
