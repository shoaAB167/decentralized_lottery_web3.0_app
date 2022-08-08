import React ,{Component} from 'react';
import lottery from '../lottery';
import web3 from '../web3';


class Lottery extends Component {

  constructor(props){
    super(props);
    this.state = {
      manager : '',
      participate_amount : '0.00001',
      message : '',
      total_amount : ''
      //it help to give what happening with smart contract
   }
  }
  //it take all the info and mounted to the view of react app
  async componentDidMount(){
    //get the public address of manager
    const manager = await lottery.methods.manager().call();
    //manager method call from lottery.js ABI
    //basically clicking manager button
    console.log(manager);
    this.setState({manager : manager});
    //web3 connect with lottery app and get the balance of smart contract
    //lottery.option.address is adress where contract is deployed (ABI code)
    const total_amount = await web3.eth.getBalance(lottery.options.address);
    this.setState({total_amount : total_amount});
  }
  render(){
    return(
    <div>
      <h1> Total lottery pool is {this.state.total_amount} </h1>
      <form>
        <input placeholder = "0.0001" />
        <button type = "submit">Participate</button>
      </form>
      <hr/> <br/> <hr/>
      <p> The manager of the lottery decentralized app is {this.state.manager} </p>
      <button>Pick Winner</button>
    </div>
    )
  }
}

export default Lottery;
