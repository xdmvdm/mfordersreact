import * as React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

export class ExampleComponent extends React.Component {
  _isMounted = false;
  static propTypes = {
    mydata: PropTypes.string,
    onClickOrder: PropTypes.func
  }

  static defaultProps = {
    mydata: "Rest data"
  }

  constructor(props) {
    super(props);

    this.state = {

      Orderdata: [],
      Orderdatam: []
    }

    this.getOrderData = this.getOrderData.bind(this);
  }


  getOrderData() {

    const apiUrl = 'http://localhost:8102/orders/alldata';

    fetch(apiUrl)
      .then((response) => response.json())
      .then(
        (response) => {
          var Orderdata = response;
          // console.log(Orderdata);
          if (this._isMounted) {


            this.setState({ Orderdata: response });
            let deger;
            deger = this.state.Orderdata[this.state.Orderdata.length - 1];
            this.setState({ Orderdatam: deger });
          }

        });

  }

  componentDidMount() {
    this._isMounted = true;
    this.getOrderData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { mydata, onClickOrder } = this.props;
    return (
      <div className="exampleComponent">
        <img src="/images/react.png" alt="React Logo" className="logo" />
        <p>The order  is <strong>{mydata}</strong> from  React component.</p>
        <button type="submit" className="btn btn-secondary" onClick={onClickOrder}>React Component</button>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>OrderId</th>
              <th>CartId</th>
              <th>ProductId</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>UserId</th>
            </tr>
          </thead>

          {


            <tbody>
              {
                this.state.Orderdata.map((item, key) => {
                  return <tr key={key}>

                    <td>{item.orderId}</td>
                    <td>{item.cartId}</td>

                    <td>{item.productId}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>

                    <td>{item.userId}</td>
                  </tr>
                })

              }

            </tbody>


          }

        </table>

        <br></br>
      </div>

    )

  }
}

