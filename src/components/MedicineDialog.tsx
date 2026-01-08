import { unitDetailMap } from '@/constants/UnitDetail';
import { Diagnosis } from '@/types/Diagnosis';
import React from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  diagnosis: Diagnosis | null;
  onClose: () => void;
};

const MedicineDialog = ({ visible, diagnosis, onClose }: Props) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dialogContainer}>
          <Text style={styles.header}>Medications 💊</Text>

          {diagnosis ? (
            <>
              <ScrollView style={styles.medicineList}>
                {Array.isArray(diagnosis.medicines) && diagnosis.medicines.length > 0 ? (
                  diagnosis.medicines.map((med: any, index: number) => (
                    <View key={index} style={styles.medicineItem}>
                      <Text style={styles.medicineText}>• {med.composition}</Text>
                      <Text style={styles.subText}>    Dosage: {med.dosage} ({unitDetailMap[med.dosageIn]?.symbol ?? ''})</Text>
                       {/* <Text style={styles.subText}>    Dosage In: {med.dosageIn}</Text> */}
                      <Text style={styles.subText}>    Repetation: {med. repetionDosage}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noData}>No medicines found.</Text>
                )}
              </ScrollView>
            </>
          ) : (
            <Text style={styles.noData}>No diagnosis selected.</Text>
          )}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default MedicineDialog;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  dialogContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metaText: {
    fontSize: 14,
    marginBottom: 4,
  },
  sectionTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  medicineList: {
    maxHeight: 300,
  },
  medicineItem: {
    marginBottom: 12,
  },
  medicineText: {
    fontSize: 15,
    fontWeight: '500',
  },
  subText: {
    fontSize: 13,
    color: '#555',
  },
  noData: {
    fontStyle: 'italic',
    color: '#888',
    marginVertical: 10,
  },
});
