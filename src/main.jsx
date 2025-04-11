import { createRoot } from 'react-dom/client'
import App from './app/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Helmet>
        <title>Online Grocery Store</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Shop fresh groceries online with Online Grocery Store. Fast delivery, best prices, and quality produce." />
        <meta name="keywords" content="grocery, fresh food, delivery, fruits, vegetables, online store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <App />
    </BrowserRouter>
  </Provider >,
)
