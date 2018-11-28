import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'roboto-fontface';
import 'animate.css/animate.css';
import 'react-dropdown/style.css';
import React, { Component } from 'react';
import { Route } from './components/Router';
import StartPage from './components/StartPage';
import RegistrationForm from './components/RegistrationForm';
import Collection from './components/Collection';
import Product from './components/Product';
import SignIn from './components/SignIn';
import './App.css';
import ShoppingCart from './components/ShoppingCart';

class App extends Component {
  constructor(props) {
    console.log('item: ' + window.localStorage.getItem('item'));
    console.log('count: ' + window.localStorage.getItem('count'));
    window.localStorage.clear();
    super(props);
    if (window.localStorage) {
      console.log('Local Storage is available');
    } else {
      window.alert('Local Storage is not available');
    }
    const count = Number(window.localStorage.getItem('count') || 0);
    const item = JSON.parse(window.localStorage.getItem('item') || 'null');
    const cart = JSON.parse(window.localStorage.getItem('cart') || '{}');
    // const size = Number(window.localStorage.getItem('size') || 40);
    this.setItem = this.setItem.bind(this);
    this.state = { item, count, cart };
  }

  setItem(item) {
    console.log(`app.setItem: ${item.model}`, item);
    this.setState({ item });
    window.localStorage.setItem('item', JSON.stringify(item));
  }

  addItemToCart(item, size) {
    console.log(`app.addItemToCart: added to cart`);
    const count = this.state.count + 1;
    this.setState({ count });
    this.updateCart(item, size);
    window.localStorage.setItem('count', count);
  }

  updateCart(item, size) {
    console.log('itemToCart size=', size);
    const cart = this.state.cart;
    // const minSize = 40;
    // const maxSize = 47;
    const itemStored = cart[item.id] || { item, count: 0, size: isNaN(size) ? 40 : size };
    // size: Math.round(Math.random() * (maxSize - minSize) + minSize)
    itemStored.count++;
    cart[item.id] = itemStored;
    this.setState({ cart });
    window.localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`app.updateCart: cart`, cart);
    // console.log(`app.updateCart: itemStored`, itemStored);
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/registration" component={RegistrationForm} count={this.state.count} />
        <Route
          exact
          path="/collection"
          component={Collection}
          callback={this.setItem.bind(this)}
          count={this.state.count}
        />
        <Route
          exact
          path="/product"
          component={Product}
          item={this.state.item}
          callback={this.addItemToCart.bind(this)}
          count={this.state.count}
        />
        <Route exact path="/cart" component={ShoppingCart} cart={this.state.cart} size={this.state.size} />
      </div>
    );
  }
}

export default App;

// App <- Route (callback) <- Collection (callback) <- ShoesData (callback) <- Shoes (callback)
// App -> Route (item) -> Product (item)

// App <- Route (callback) <- Product (callback)
// App -> Route (count) -> ? Product (count) ? -> Navigation (count) -> Counter (count)

// App -> Route (cart) -> ShoppingCart (cart)

// App <- Route (callback) <- Product (callback) <- DropList (callback)
// App -> Route (size) -> ShoppingCart (size)
