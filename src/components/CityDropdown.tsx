import { City } from '@/types/City';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  cities: City[];
  onSelect: (city: City) => void;
    selectedCity?: City | null; 
    borderColor?:string
};

export default function CitySearchDropdown({ cities, onSelect,selectedCity,borderColor }: Props) {
  const [query, setQuery] = useState(selectedCity?.name || '');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
   const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
  if (selectedCity?.name) {
    setQuery(selectedCity.name);
  }
}, [selectedCity]);


  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = cities.filter(
      (city) =>
        city.name.toLowerCase().startsWith(text.toLowerCase()) && city.countryId === 99   //filter the city details on the basis of coutry id == 99 (india)
    );
    setFilteredCities(filtered);
  };

    const handleSelect = (city: City) => {
    setQuery(city.name);
    onSelect(city);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
  onPress={() => setModalVisible(true)}
  style={[
    styles.inputButton,
    borderColor ? { borderColor } : {},
  ]}
>
        <Text style={query ? styles.inputText : styles.placeholderText}>
          {query || 'Select City'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent   onRequestClose={() => setModalVisible(false)}>
  <View style={styles.modalBackdrop}>
    <View style={styles.modalContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search city"
        value={query}
        onChangeText={handleSearch}
        autoFocus
      />

      <FlatList
        data={filteredCities.length > 0 ? filteredCities : cities.filter(c => c.countryId === 99)}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        // style={{ maxHeight: 200 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
        <Text style={{ color: 'white' }}>Close</Text>
      </TouchableOpacity> */}
    </View>
  </View>
</Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  inputButton: {
    height: 48,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // dimmed background
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '85%',
    height:'35%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
});
