
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const COLORS = {
  background: '#F4F6FA',
  card: '#FFFFFF',
  primary: '#4F46E5',
  text: '#172033',
  muted: '#667085',
  border: '#D0D5DD',
  error: '#DC2626',
};

const interests = ['Programming', 'AI / ML', 'Design', 'Cybersecurity'];

export default function HomeScreen() {
  // Text inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState('');
  const [search, setSearch] = useState('');

  // Selection controls
  const [gender, setGender] = useState('male');
  const [country, setCountry] = useState('Rwanda');
  const [education, setEducation] = useState('university');
  const [selectedInterests, setSelectedInterests] =
    useState<string[]>(['Programming']);

  // Boolean controls
  const [notifications, setNotifications] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  // Numeric controls
  const [experience, setExperience] = useState(2);
  const [rating, setRating] = useState(3);

  const [errors, setErrors] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const handleSubmit = () => {
    const validationErrors: string[] = [];

    if (!name.trim()) {
      validationErrors.push('Full name is required.');
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.push('Enter a valid email address.');
    }

    if (password.length < 8) {
      validationErrors.push('Password must contain at least 8 characters.');
    }

    if (!acceptTerms) {
      validationErrors.push('You must accept the terms.');
    }

    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      console.log('Form validation failed:', validationErrors);
      Alert.alert('Check your form', validationErrors.join('\n'));
      return;
    }

    const formData = {
      name,
      email,
      password,
      phone,
      age: age ? Number(age) : null,
      dateOfBirth,
      website,
      bio,
      search,
      gender,
      country,
      education,
      interests: selectedInterests,
      notifications,
      acceptTerms,
      newsletter,
      experienceYears: experience,
      rating,
    };

    // All submitted form values appear in the terminal.
    console.log('========== FORM SUBMITTED ==========');
    console.log(JSON.stringify(formData, null, 2));
    console.log('====================================');

    Alert.alert(
      'Success',
      'Form submitted! Check your Expo terminal for the data.'
    );
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setAge('');
    setDateOfBirth('');
    setWebsite('');
    setBio('');
    setSearch('');
    setGender('male');
    setCountry('Rwanda');
    setEducation('university');
    setSelectedInterests([]);
    setNotifications(false);
    setAcceptTerms(false);
    setNewsletter(false);
    setExperience(0);
    setRating(0);
    setErrors([]);
  };

  const Field = ({
    label,
    children,
    required = false,
  }: {
    label: string;
    children: React.ReactNode;
    required?: boolean;
  }) => (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required ? ' *' : ''}
      </Text>
      {children}
    </View>
  );

  const inputStyle = (multiline = false) => [
    styles.input,
    multiline && styles.multiline,
  ];

  const Choice = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      style={styles.choice}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.choiceText}>{label}</Text>
    </Pressable>
  );

  const CheckOption = ({
    label,
    checked,
    onPress,
  }: {
    label: string;
    checked: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      style={styles.choice}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.choiceText}>{label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Registration Form</Text>
          <Text style={styles.subtitle}>
            Explore React Native form elements.
            {'\n'}Fields marked * are required.
          </Text>

          {/* 1. Text inputs */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>1. Text Inputs</Text>

            <Field label="Full name" required>
              <TextInput
                style={inputStyle()}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoComplete="name"
              />
            </Field>

            <Field label="Email address" required>
              <TextInput
                style={inputStyle()}
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </Field>

            <Field label="Password" required>
              <TextInput
                style={inputStyle()}
                placeholder="At least 8 characters"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="new-password"
              />
            </Field>

            <Field label="Phone number">
              <TextInput
                style={inputStyle()}
                placeholder="+250 7XX XXX XXX"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </Field>

            <Field label="Age">
              <TextInput
                style={inputStyle()}
                placeholder="Enter your age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </Field>

            <Field label="Date of birth">
              <TextInput
                style={inputStyle()}
                placeholder="YYYY-MM-DD"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
            </Field>

            <Field label="Website URL">
              <TextInput
                style={inputStyle()}
                placeholder="https://example.com"
                value={website}
                onChangeText={setWebsite}
                keyboardType="url"
                autoCapitalize="none"
              />
            </Field>

            <Field label="Search">
              <TextInput
                style={inputStyle()}
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
                returnKeyType="search"
              />
            </Field>

            <Field label="About yourself">
              <TextInput
                style={inputStyle(true)}
                placeholder="Write a short bio..."
                value={bio}
                onChangeText={setBio}
                multiline
                textAlignVertical="top"
              />
            </Field>
          </View>

          {/* 2. Radio buttons */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>2. Radio Buttons</Text>
            <Text style={styles.helper}>
              Select one gender option.
            </Text>

            {['male', 'female', 'other', 'prefer not to say'].map(
              (option) => (
                <Choice
                  key={option}
                  label={option.charAt(0).toUpperCase() + option.slice(1)}
                  selected={gender === option}
                  onPress={() => setGender(option)}
                />
              )
            )}
          </View>

          {/* 3. Checkboxes */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>3. Checkboxes</Text>
            <Text style={styles.helper}>
              Choose as many interests as you like.
            </Text>

            {interests.map((interest) => (
              <CheckOption
                key={interest}
                label={interest}
                checked={selectedInterests.includes(interest)}
                onPress={() => toggleInterest(interest)}
              />
            ))}

            <View style={styles.divider} />

            <CheckOption
              label="I accept the terms and conditions"
              checked={acceptTerms}
              onPress={() => setAcceptTerms(!acceptTerms)}
            />
          </View>

          {/* 4. Dropdowns */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>4. Dropdown / Picker</Text>

            <Field label="Country">
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={country}
                  onValueChange={setCountry}
                >
                  <Picker.Item label="Rwanda" value="Rwanda" />
                  <Picker.Item label="Uganda" value="Uganda" />
                  <Picker.Item label="Kenya" value="Kenya" />
                  <Picker.Item label="Tanzania" value="Tanzania" />
                  <Picker.Item label="Nigeria" value="Nigeria" />
                  <Picker.Item label="United States" value="United States" />
                </Picker>
              </View>
            </Field>

            <Field label="Education level">
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={education}
                  onValueChange={setEducation}
                >
                  <Picker.Item label="High school" value="high-school" />
                  <Picker.Item label="University" value="university" />
                  <Picker.Item label="Bachelor's degree" value="bachelors" />
                  <Picker.Item label="Master's degree" value="masters" />
                  <Picker.Item label="PhD" value="phd" />
                </Picker>
              </View>
            </Field>
          </View>

          {/* 5. Switches */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>5. Switches / Toggles</Text>

            <View style={styles.switchRow}>
              <Text style={styles.choiceText}>Enable notifications</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ true: COLORS.primary }}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.choiceText}>Subscribe to newsletter</Text>
              <Switch
                value={newsletter}
                onValueChange={setNewsletter}
                trackColor={{ true: COLORS.primary }}
              />
            </View>
          </View>

          {/* 6. Slider */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>6. Slider</Text>

            <Field label={`Years of experience: ${experience}`}>
              <Slider
                minimumValue={0}
                maximumValue={20}
                step={1}
                value={experience}
                onValueChange={setExperience}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.border}
              />
              <View style={styles.rangeRow}>
                <Text style={styles.helper}>0 years</Text>
                <Text style={styles.helper}>20 years</Text>
              </View>
            </Field>

            <Field label={`Rating: ${rating} / 5`}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                step={1}
                value={rating}
                onValueChange={setRating}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.border}
              />
            </Field>
          </View>

          {/* 7. Validation errors */}
          {errors.length > 0 && (
            <View style={styles.errorBox}>
              {errors.map((error) => (
                <Text key={error} style={styles.errorText}>
                  • {error}
                </Text>
              ))}
            </View>
          )}

          {/* 8. Actions */}
          <Pressable
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Submit Form</Text>
          </Pressable>

          <Pressable
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetText}>Reset Form</Text>
          </Pressable>

          <Text style={styles.footer}>
            Your submitted data will be logged in the Expo terminal.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 23,
    marginBottom: 22,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 18,
  },
  field: {
    marginBottom: 17,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: '#FFFFFF',
  },
  multiline: {
    minHeight: 110,
    paddingTop: 12,
  },
  helper: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 8,
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  choiceText: {
    fontSize: 15,
    color: COLORS.text,
    flex: 1,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAECF0',
    marginVertical: 12,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    gap: 6,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 2,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resetButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#FFFFFF',
  },
  resetText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 18,
  },
});
