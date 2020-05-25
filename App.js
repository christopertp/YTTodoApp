/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import colors from './Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import tempData from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import Fire from './Fire';

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData,
    user: {},
    loading: true,
  };

  componentDidMount() {
    // firebase = new Fire((error, user) => {
    //   if (error) {
    //     return alert('Uh oh, something went wrong');
    //   }

    //   firebase.getLists(list => {
    //     this.setState({ lists, user }, () => [
    //       this.setState({ loading: false })
    //     ])
    //   })

    //   this.setState({ user })
    // });
  }

  // componentWillMount() {
  //   // firebase.detach()
  // }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] },
      ],
    });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}>
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>
        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo
            <Text style={{ fontWeight: '300', color: colors.blue }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}>
            <Icon name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
        <View
          style={{
            height: 275,
            paddingLeft: 32,
            // backgroundColor: '#252533',
          }}>
          <FlatList
            // style={{ backgroundColor: '#949' }}
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return this.renderList(item);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});
