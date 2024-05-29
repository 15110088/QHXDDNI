import React from "react";
import { View,Text,TextInput} from "react-native";
//Colors
import * as theme from "../../config/constants/theme";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const renderField = ({
  label,
  keyboardType,
  secureTextEntry,
  icon,
  showPass,
  passIcon,
  setShowPass,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View>
      <View>
        <TextInput
          placeholder={label}
          placeholderTextColor={theme.colors.gray}

          autoCapitalize='none'
          clearButtonMode={passIcon ? "never" : "always"}
          mode='flat'
          selectionColor={theme.colors.white}
          underlineColor={theme.colors.white}
          value={"nghiatt"}
          defaultValue={"nghiatt"}
          theme={{ colors: { primary: theme.colors.white,text:theme.colors.white }, }}
          left={
            <TextInput.Icon
              name={icon}
              size={24}
              color={theme.colors.white}
              style={{ paddingRight: 10 }}
            />
          }
          style={{
            fontSize: 14,
            backgroundColor: "transparent",
            marginVertical: 5,
            // paddingHorizontal: 5,
          }}
          onChangeText={onChange}
          keyboardType={keyboardType}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          {...restInput}
        />
        {passIcon ? (
          <MaterialCommunityIcons
            name={showPass ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.white}
            onPress={() => {
              setShowPass((prev) => !prev);
            }}
            style={{
              position: "absolute",
              top: "40%",
              right: 10,
              zIndex: 100,
            }}
          />
        ) : (
          <></>
        )}
      </View>
      {touched && error && (
        <Text
          style={{ color: "red", marginHorizontal: 15, marginTop: 5 }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default  renderField