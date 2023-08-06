import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default MapScreen = ({ route }) => {
  const {
    coordinates: { latitude, longitude },
    name,
    location,
  } = route.params;

  return (
    <MapView
      style={styles.map}
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.005,
      }}
    >
      <Marker
        title={name}
        coordinate={{ latitude, longitude }}
        description={location}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
