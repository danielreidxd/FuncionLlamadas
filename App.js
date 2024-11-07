import React, { useState } from 'react';
import { View, Button, TextInput, Linking, Alert, StyleSheet, FlatList, Text, TouchableOpacity, Modal } from 'react-native';
import * as Contacts from 'expo-contacts';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const makeCall = () => {
    const cleanedNumber = phoneNumber.replace(/\s+/g, ''); // Elimina espacios en blanco

    // Valida si el número tiene 10 dígitos o comienza con +52 seguido de 10 dígitos
    const isValidNumber = /^(\+52)?\d{10}$/.test(cleanedNumber);

    if (isValidNumber) {
      Linking.openURL(`tel:${cleanedNumber}`);
    } else {
      Alert.alert("Número inválido", "Por favor ingresa un número de 10 dígitos o un número que comience con +52 seguido de 10 dígitos.");
    }
  };

  // Solicita permiso y obtiene los contactos del usuario
  const pickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      const contactsWithNumbers = data.filter(contact => contact.phoneNumbers && contact.phoneNumbers.length > 0);

      if (contactsWithNumbers.length > 0) {
        setContacts(contactsWithNumbers);
        setModalVisible(true); // Muestra el modal para seleccionar el contacto
      } else {
        Alert.alert("No hay contactos", "No se encontraron contactos con números de teléfono.");
      }
    } else {
      Alert.alert("Permiso denegado", "No tienes permisos para acceder a los contactos.");
    }
  };

  const selectContact = (contact) => {
    let originalNumber = contact.phoneNumbers[0].number;

    // Si el número comienza con +52, elimina el prefijo y deja solo los 10 dígitos
    if (originalNumber.startsWith("+52")) {
      originalNumber = originalNumber.replace("+52", "").trim();
    }

    setPhoneNumber(originalNumber); // Establece el número en el campo de entrada
    setModalVisible(false); // Cierra el modal al seleccionar un contacto
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>App de llamadas</Text>
      <TextInput
        placeholder="Ingresa el número"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={pickContact}>
        <Text style={styles.buttonText}>Seleccionar Contacto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCall} onPress={makeCall}>
        <Text style={styles.buttonText}>Llamar</Text>
      </TouchableOpacity>

      {/* Modal para mostrar la lista de contactos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecciona un contacto</Text>
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.contactItem} onPress={() => selectContact(item)}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonCall: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  contactName: {
    fontSize: 18,
    color: '#333',
  },
  contactNumber: {
    fontSize: 16,
    color: 'gray',
  },
});

export default App;
