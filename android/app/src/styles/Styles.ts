import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'blue',
  },
  sectionTitle: {
    padding: 20,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
  title: {
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  input:{
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,

  },
  button: {
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
  pokeImage: {
    margin : 10,
    width: 30,
    height: 30,
    paddingLeft: 10,
  },
  imageDetail: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  image: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  searchResults: {
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 2,
  },
  detailImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default styles;