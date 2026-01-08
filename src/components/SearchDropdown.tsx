import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props<T> = {
  data: T[];
  onSelect: (item: T) => void;
  selectedItem?: T | null;
  labelExtractor: (item: T) => string;
  borderColor?: string;
  placeholder?: string;
  searchPredicate?: (item: T, query: string) => boolean;
};

export default function DynamicSearchDropdown<T>({
  data,
  onSelect,
  selectedItem,
  labelExtractor,
  borderColor,
  placeholder = 'Select',
  searchPredicate,
}: Props<T>) {
  const [query, setQuery] = useState(selectedItem ? labelExtractor(selectedItem) : '');
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const cleanedData: T[] = useMemo(
  () =>
    (data ?? []).filter(
      (item): item is T => {
        if (!item) return false;
        const label = labelExtractor(item);
        return label != null && label.trim() !== '';
      }
    ),
  [data, labelExtractor]
);

  useEffect(() => {
    if (selectedItem) {
      setQuery(labelExtractor(selectedItem));
    }
  }, [selectedItem]);

  const handleSearch = (text: string) => {
    setQuery(text);

    const defaultPredicate = (item: T, query: string) =>
      labelExtractor(item).toLowerCase().includes(query.toLowerCase());

    const predicate = searchPredicate || defaultPredicate;

    const filtered = cleanedData.filter((item) => predicate(item, text));
    setFilteredData(filtered);
  };

  const handleSelect = (item: T) => {
    setQuery(labelExtractor(item));
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.inputButton, borderColor ? { borderColor } : {}]}
      >
        <Text style={query ? styles.inputText : styles.placeholderText}>
          {query || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={query}
              onChangeText={handleSearch}
              autoFocus
            />

            <FlatList
              data={filteredData.length > 0 ? filteredData : cleanedData}
              keyExtractor={(_, index) => index.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                  <Text>{labelExtractor(item)}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    maxHeight: '80%',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});
