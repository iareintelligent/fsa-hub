import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Text, Button, Icon, Left, Right, Body} from 'native-base';
import { withNavigation } from 'react-navigation';
import NavButton from "../components/NavButton";
import { fullStackApprenticeship, findingWork, cityByCity } from "../directories";

class SubcategoriesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            schema: []
        }
    }

    // we want to pass the subcategory through Props as Schema in Nav

    async componentDidMount() {
        const schema = this.props.navigation.getParam('schema', 'None')
        this.determineSchema(schema)
    }

    determineSchema(schema) {
        switch (schema) {
            case 'fullStackApprenticeship':
                this.setState({ schema: fullStackApprenticeship })
                break;
            case 'findingWork':
                this.setState({ schema: findingWork })
                break;
            case 'cityByCity':
                this.setState({ schema: cityByCity })
        }
    }

    renderSubcategories() {
        return(
          <List>
          {this.state.schema.map((list, i) => (
            <ListItem key={i}>
              <Left>
                  <Text>{list.name}</Text>
              </Left>
              <Right>
                <NavButton title="Go" schema={list.type} navigation={this.props.navigation} route="Content" onPress={() => this.props.navigation.navigate('Content')}
                    >
                  <Text>=></Text>
                </NavButton>
              </Right>
            </ListItem>
          )
          )}
          </List>
        )
      }

    render(){
        return (
        <Container>
            <Content>
                { this.renderSubcategories()}
            </Content>
        </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SubcategoriesScreen;