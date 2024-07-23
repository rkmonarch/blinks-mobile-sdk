import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Skeleton = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [animatedValue]);

  const animatedStyle = {
    opacity: animatedValue,
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Animated.View style={[styles.animatedOverlay, animatedStyle]} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.title}>
            <Animated.View style={[styles.animatedOverlay, animatedStyle]} />
          </View>
          <View style={styles.description}>
            <Animated.View style={[styles.animatedOverlay, animatedStyle]} />
          </View>
          <View style={styles.halfButtonContainer}>
            <View style={styles.halfButton}>
              <Animated.View style={[styles.animatedOverlay, animatedStyle]} />
            </View>
            <View style={styles.halfButton}>
              <Animated.View style={[styles.animatedOverlay, animatedStyle]} />
            </View>
          </View>
          <View style={styles.input}>
            <Animated.View style={[styles.animatedOverlay, animatedStyle]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: '#F2F2F2',
    overflow: 'hidden',
    borderRadius: 8,
  },
  title: {
    height: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 2,
    marginBottom: 8,
    marginTop: 16,
    overflow: 'hidden',
    width: '30%',
  },
  description: {
    height: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 2,
    overflow: 'hidden',
    width: '68%',
    marginBottom: 16,
  },
  animatedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E9E9E9',
  },
  textContainer: {
    paddingVertical: 8,
  },
  halfButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfButton: {
    height: 40,
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
    width: '48%',
  },
  input: {
    height: 40,
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
});

export default Skeleton;
