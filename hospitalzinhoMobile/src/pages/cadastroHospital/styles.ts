import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0056b3',
    alignSelf: 'flex-start',
  },
  header: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0b1220',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#475569',
  },
  card: {
    width: '100%',
    maxWidth: 1200,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  section: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#0056b3',
    alignSelf: 'flex-start',
  },
  formGroupSelector: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#495057',
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
  },
  fieldset: {
    marginTop: 8,
    marginBottom: 12,
  },
  legend: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#0056b3',
  },
  formGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  formGroup: {
    width: '48%',
    marginBottom: 12,
  },
  fullWidth: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    flex: 1,
    minWidth: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cfe0ff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 12,
    backgroundColor: '#f8fbff',
  },
  inputIcon: {
    marginRight: 8,
  },
  inputFocused: {
    borderColor: '#80bdff',
    backgroundColor: '#ffffff',
    borderWidth: 2,
  },
  addressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  smallButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#007bff',
    borderRadius: 6,
  },
  smallButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
